import {
   COUNT_LABELS,
   FREE_CHOICE_OPTIONS,
   HAND_SIZE,
   QUERY_POOL,
} from '../data/query-pool';
import store from '../store';
import { queryDeckActions } from '../store/query-deck-slice';
import { getMatchingClues } from './clue-sheets-util';
import { getRandomNumber, shuffle } from './util';

export function dealCards(playerIds) {
   const drawPile = shuffle(QUERY_POOL);

   // Initialize hands for each player
   const playerHands = [];

   playerIds.forEach((playerId) => {
      const cards = [];

      // Draw HAND_SIZE cards for each player
      for (let i = 0; i < HAND_SIZE; i++) {
         cards.push(drawPile.pop());
      }

      playerHands.push({ playerId, cards });
   });

   store.dispatch(queryDeckActions.setDrawPile(drawPile));
   store.dispatch(queryDeckActions.setPlayerHands(playerHands));
}

function getQueryCardParams(queryCard) {
   let paramsStr = '';

   if (queryCard.color) {
      paramsStr += queryCard.color;

      if (queryCard.type === 'quantity') {
         paramsStr += 's';
      }
   }

   if (queryCard.count) {
      paramsStr += ' ' + COUNT_LABELS[queryCard.count] + 's';
   }

   if (queryCard.species) {
      paramsStr += ' ' + queryCard.species + 's';
   }

   return paramsStr.trim();
}

export function getQuestion(queryCard) {
   let question = 'this question?';
   const paramsStr = getQueryCardParams(queryCard);

   if (queryCard.type === 'show') {
      question = `to show you thier ${paramsStr}`;

      if (queryCard.freeChoice) {
         question = `${question} {select free choice below}`;
      }
   }

   if (queryCard.type === 'quantity') {
      question = `how many ${paramsStr} they have`;
   }

   return question;
}

function isMatch(egg, query, choice = { type: null, value: null }) {
   if (query.color && query.color !== egg.color) {
      return false;
   }

   if (query.species && query.species !== egg.species) {
      return false;
   }

   if (query.count && query.count !== egg.count) {
      return false;
   }

   if (query.freeChoice && choice && choice.type && choice.value) {
      if (choice.type === 'color' && choice.value !== egg.color) {
         return false;
      }

      if (choice.type === 'species' && choice.value !== egg.species) {
         return false;
      }

      if (choice.type === 'count' && choice.value !== egg.count) {
         return false;
      }
   }

   return true;
}

export function getMatches(
   eggs,
   queryCard,
   choice = { type: null, value: null }
) {
   const matches = eggs.filter((egg) => isMatch(egg, queryCard, choice));

   if (queryCard.type === 'quantity') {
      return matches.length; //Only return count if queryCard is a quantity type
   }

   return matches;
}

export function filterQueryChoices(queryCard) {
   if (queryCard.color) {
      return FREE_CHOICE_OPTIONS.filter((option) => option.type !== 'color');
   }

   if (queryCard.species) {
      return FREE_CHOICE_OPTIONS.filter((option) => option.type !== 'species');
   }

   if (queryCard.count) {
      return FREE_CHOICE_OPTIONS.filter((option) => option.type !== 'count');
   }
}

export function getCardLabel(queryCard, choice = { type: null, value: null }) {
   let cardLabel = '';
   //TODO: Fix this
   if (
      queryCard.type === 'choice' &&
      (choice === null || choice.value === null)
   ) {
      choice.type = 'count';
      choice.value = '{Free Choice}';
   }

   if (queryCard.color) {
      cardLabel += queryCard.color + ' ';
   } else if (choice && choice.type === 'color') {
      cardLabel += choice.value + ' ';
   }

   if (queryCard.species) {
      cardLabel += queryCard.species + ' ';
   } else if (choice && choice.type === 'species') {
      cardLabel += choice.value + ' ';
   }

   if (queryCard.count) {
      cardLabel += COUNT_LABELS[queryCard.count] + ' ';
   } else if (choice && choice.type === 'count') {
      cardLabel += COUNT_LABELS[choice.value] + ' ';
   }

   return cardLabel.trim();
}

function getBestFreeChoice(clues, queryCard) {
   if (!queryCard.freeChoice) {
      return [0, null];
   }

   const choices = filterQueryChoices(queryCard);
   let currentBestChoice = null;
   let currentBestWeight = 0;

   choices.forEach((choice) => {
      const query = { ...queryCard }; //make a temp copy of the query card

      if (choice.type === 'color') {
         query.color = choice.value;
         query.weight = query.weight['color']; //Weight will be an array if free choice is true
      }

      if (choice.type === 'species') {
         query.species = choice.value;
         query.weight = query.weight['species']; //Weight will be an array if free choice is true
      }

      if (choice.type === 'count') {
         query.count = choice.value;
         query.weight = query.weight['count']; //Weight will be an array if free choice is true
      }

      let weight = getAdjustedCardWeight(clues, query).length;

      if (weight > currentBestWeight) {
         currentBestWeight = weight;
         currentBestChoice = choice;
      }
   });

   if (!currentBestChoice) {
      // If no choice was found, default to the first choice
      currentBestChoice = choices[0];
      currentBestWeight = getAdjustedCardWeight(clues, queryCard).length;
   }

   return [currentBestWeight, currentBestChoice];
}

function getAdjustedCardWeight(clues, queryCard) {
   let weight = queryCard.weight[0] || 0;
   let alreadyFound = getMatchingClues(clues, queryCard).length;

   if (queryCard.type === 'show') {
      alreadyFound *= 10;
   }

   weight = weight - alreadyFound;

   return weight;
}

function getLeastCluesPlayer(clues, players) {
   let lowestCount = 100;
   let owner = null;

   players.forEach((player) => {
      let cluesFound = clues.filter((clue) => clue.ownerId === owner);

      if (cluesFound.length < lowestCount) {
         lowestCount = cluesFound.length;
         owner = player.id;
      }
   });

   if (!owner) {
   }

   return owner;
}

export function getBestPlay(clues, queryCards, opponents) {
   let bestPlay = null;
   let choice = null;
   let currentBestWeight = 0;

   //calculate the weight for each query card
   queryCards.forEach((queryCard) => {
      if (queryCard.freeChoice) {
         //For free choice cards we also need to find the best choice
         const [weight, bestChoice] = getBestFreeChoice(clues, queryCard);

         //Every time we find a higher weight card, save it
         if (weight > currentBestWeight) {
            currentBestWeight = weight;
            bestPlay = queryCard;
            choice = bestChoice;
            console.log('Setting choice to best choice: ', choice);
         }
      } else {
         //Every time we find a higher weight card, save it
         let weight = getAdjustedCardWeight(clues, queryCard);

         if (weight > currentBestWeight) {
            currentBestWeight = weight;
            bestPlay = queryCard;
         }
      }
   });

   //Just in case we don't find a highest weight card, default to the first query card
   if (!bestPlay) {
      bestPlay = queryCards[0];
   }

   //TODO: Improve the logic here
   const randomIndex = getRandomNumber(0, opponents.length - 1); // Randomly select a player to ask
   const playerId = opponents[randomIndex].id;

   return [bestPlay, choice, playerId];
}
