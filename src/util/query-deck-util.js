import {
   COUNT_LABELS,
   FREE_CHOICE_OPTIONS,
   HAND_SIZE,
   QUERY_POOL,
} from '../data/query-pool';
import store from '../store';
import { queryDeckActions } from '../store/query-deck-slice';
import { shuffle } from './util';

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

export function getCardLabel(queryCard) {
   let cardLabel = '';

   if (queryCard.color) {
      cardLabel += queryCard.color + ' ';
   }

   if (queryCard.species) {
      cardLabel += queryCard.species + ' ';
   }

   if (queryCard.count) {
      cardLabel += COUNT_LABELS[queryCard.count] + ' ';
   }

   return cardLabel.trim();
}
