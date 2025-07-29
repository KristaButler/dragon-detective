import { OPPONENTS } from '../data/player-pool';
import { EGG_POOL } from '../data/egg-pool';
import { QUERY_POOL } from '../data/query-pool';
import {
   generateUniqueRandomNumbers,
   getRandomNumber,
   shuffle,
   getById,
} from '../utils/utils';

export const HAND_SIZE = 4;

function selectOpponents(numberOfPlayers, currentPlayers) {
   const newPlayers = [...currentPlayers];

   const uniqueIndexes = generateUniqueRandomNumbers(
      numberOfPlayers - 1,
      0,
      OPPONENTS.length - 1
   );

   // Add each opponent to the game
   for (const index of uniqueIndexes) {
      const newPlayer = {
         ...OPPONENTS[index],
         hand: [],
         eggs: [],
      };
      newPlayers.push(newPlayer);
   }

   return newPlayers;
}

function distributeEggs(players, eggs) {
   let playerIndex = 0;
   const playersCount = players.length;

   while (eggs.length >= playersCount) {
      const egg = eggs.pop();
      const player = players[playerIndex];
      player.eggs.push(egg);
      playerIndex++;

      //If we've reached then end, circle back to the first player
      if (playerIndex >= playersCount) {
         playerIndex = 0;
      }
   }
}

function dealQueryCards(players) {
   const deck = shuffle(QUERY_POOL);

   for (let i = 0; i < HAND_SIZE; i++) {
      for (let j = 0; j < players.length; j++) {
         const card = deck.pop();

         players[j].hand.push(card);
      }
   }

   return deck;
}

function markClues(playerId, eggs, globalEggs, markPlayerEggs = true) {
   const clues = [];

   if (markPlayerEggs) {
      eggs.forEach((egg) => {
         clues.push({ id: egg.id, owner: playerId, not: [] });
      });
   }

   globalEggs.forEach((egg) =>
      clues.push({ id: egg.id, owner: 'global', not: [] })
   );

   return clues;
}

function initializeAI(players, globalEggs, solution) {
   const ai = [];
   players.forEach((player) => {
      if (player.id !== 'player') {
         const clues = markClues(player.id, player.eggs, globalEggs);
         ai.push({ id: player.id, clues });
      }
   });

   return ai;
}

export function generateNewGame(numberOfPlayers, autoMarkPlayerEggs) {
   const state = {
      players: [
         {
            id: 'player',
            name: 'You',
            avatar: null,
            eggs: [],
            hand: [],
         },
      ],
      currentPlayer: '',
      winner: '',
      solution: '',
      globalEggs: [],
      drawPile: [],
      discardPile: [],
      notes: [],
      selectedClue: null,
      cluesheet: [],
      message: '',
      turnType: null,
      turnParams: {},
      ai: [],
   };

   //Select Opponents
   const players = selectOpponents(numberOfPlayers, state.players);

   //Pick who goes first
   const randomPlayer = getRandomNumber(0, players.length - 1);
   //game.currentPlayer = players[randomPlayer].id;
   state.currentPlayer = 'player'; //TODO: For testing only

   //Select Solution
   let eggs = shuffle(EGG_POOL);

   const randomEgg = Math.floor(Math.random() * eggs.length);
   state.solution = eggs[randomEgg].id;

   //Deal the eggs out to players
   eggs = eggs.filter((egg) => egg.id !== state.solution); //Remove solution from available eggs
   distributeEggs(players, eggs);
   state.globalEggs = [...eggs];

   //Deal the query cards
   state.drawPile = dealQueryCards(players);

   state.players = [...players];

   //Initialize Cluesheet
   const player = getById(state.players, 'player');
   state.cluesheet = markClues(
      'player',
      player.eggs,
      state.globalEggs,
      autoMarkPlayerEggs
   );

   //Initialize AI Clues
   state.ai = initializeAI(state.players, state.globalEggs, state.solution);

   return state;
}
