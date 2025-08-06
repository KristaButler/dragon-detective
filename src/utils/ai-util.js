import { QUERY_POOL } from '../data/query-pool';
import { getById, shuffle } from '../utils/utils';
import { findMatches } from './turn-utils';

const FREE_CHOICE_OPTIONS = [
   { type: 'color', value: 'blue' },
   { type: 'color', value: 'green' },
   { type: 'color', value: 'red' },
   { type: 'color', value: 'yellow' },
   { type: 'species', value: 'dragon' },
   { type: 'species', value: 'wyvern' },
   { type: 'species', value: 'hydra' },
   { type: 'count', value: 1 },
   { type: 'count', value: 2 },
   { type: 'count', value: 3 },
];

function filterQueryChoices(queryCard) {
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

      let weight = getAdjustedCardWeight(clues, query);

      if (weight > currentBestWeight || currentBestChoice === null) {
         currentBestWeight = weight;
         currentBestChoice = query;
      }
   });

   return [currentBestWeight, currentBestChoice];
}

function getAdjustedCardWeight(clues, queryCard) {
   let weight = queryCard.weight;
   let alreadyFound = findMatches(clues, queryCard).length;

   if (queryCard.type === 'show') {
      alreadyFound *= 10;
   }

   weight = weight - alreadyFound;

   return weight;
}

export function getBestPlay(clues, queryCards) {
   let bestPlay = null;
   let currentBestWeight = 0;

   //calculate the weight for each query card
   queryCards.forEach((queryCard) => {
      if (queryCard.freeChoice) {
         //For free choice cards we also need to find the best choice
         const [weight, bestChoice] = getBestFreeChoice(clues, queryCard);

         //Every time we find a higher weight card, save it
         if (weight > currentBestWeight || bestPlay === null) {
            currentBestWeight = weight;
            bestPlay = bestChoice;
         }
      } else {
         //Every time we find a higher weight card, save it
         let weight = getAdjustedCardWeight(clues, queryCard);

         if (weight > currentBestWeight || bestPlay === null) {
            currentBestWeight = weight;
            bestPlay = queryCard;
         }
      }
   });

   return bestPlay;
}

export function getPlayerToAsk(opponents, clues, query) {
   let lowestCount = 100;
   let owner = null;
   const checkClues = findMatches(clues, query);
   const shuffledOpponents = shuffle(opponents); //Avoids asking the player over and over

   shuffledOpponents.forEach((player) => {
      let cluesFound = checkClues.filter((clue) => clue.ownerId === owner);

      if (cluesFound.length < lowestCount || owner === null) {
         lowestCount = cluesFound.length;
         owner = player.id;
      }
   });

   return owner;
}

export function discardAndDraw(state, playerId, cardId) {
   const newPlayers = [...state.players];
   const newPlayer = getById(newPlayers, playerId);
   const card = getById(QUERY_POOL, cardId);
   let newDiscardPile = [...state.discardPile];
   let newDrawPile = [...state.drawPile];

   newPlayer.hand = newPlayer.hand.filter((c) => c.id !== cardId);
   newDiscardPile.push(card);

   if (newPlayer.hand.length < 4) {
      if (newDrawPile < 1) {
         newDrawPile = [...newDrawPile, ...newDiscardPile];
         newDrawPile = shuffle(newDrawPile);
         newDiscardPile = [];
      }

      newPlayer.hand.push(newDrawPile.pop());
   }

   return {
      players: newPlayers,
      discardPile: newDiscardPile,
      drawPile: newDrawPile,
   };
}
