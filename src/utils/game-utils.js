import { OPPONENTS } from '../data/player-pool';
import { EGG_POOL } from '../data/egg-pool';
import { QUERY_POOL } from '../data/query-pool';
import {
   generateUniqueRandomNumbers,
   getRandomNumber,
   shuffle,
} from '../utils/utils';

const HAND_SIZE = 4;

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
         clues: [],
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
   let playerIndex = 0;

   for (let i = 0; i < HAND_SIZE; i++) {
      for (let j = 0; j < players.length; j++) {
         const card = deck.pop();

         players[j].hand.push(card);
      }
   }

   return deck;
}

function markPlayerEggs(player) {
   player.eggs.forEach((egg) =>
      player.clues.push({ eggId: egg.id, owner: player.id })
   );

   return player;
}

function markGlobalEggs(player, globalEggs) {
   globalEggs.forEach((egg) =>
      player.clues.push({ eggId: egg.id, owner: 'global' })
   );

   return player;
}

function initClues(
   players,
   globalEggs,
   autoMarkPlayerEggs,
   autoMarkGlobalEggs
) {
   players = players.map((player) => {
      if (player.id === 'player') {
         if (autoMarkPlayerEggs) {
            player = markPlayerEggs(player);
         }

         if (autoMarkGlobalEggs) {
            player = markGlobalEggs(player, globalEggs);
         }
      } else {
         player = markPlayerEggs(player);
         player = markGlobalEggs(player, globalEggs);
      }

      return player;
   });
}

export function generateNewGame(
   initialState,
   numberOfPlayers,
   autoMarkPlayerEggs,
   autoMarkGlobalEggs
) {
   const game = { ...initialState };

   //Note: These not cleared by game initial state for some reason
   game.players[0].eggs = [];
   game.players[0].hand = [];
   game.players[0].clues = [];

   //Select Opponents
   const players = selectOpponents(numberOfPlayers, game.players);

   //Pick who goes first
   const randomPlayer = getRandomNumber(0, players.length - 1);
   //   game.currentPlayer = players[randomPlayer].id; //TODO: For testing only
   game.currentPlayer = 'player'; //TODO: For testing only

   //Select Solution
   let eggs = shuffle(EGG_POOL);

   const randomEgg = Math.floor(Math.random() * eggs.length);
   game.solution = eggs[randomEgg].id;

   //Deal the eggs out to players
   eggs = eggs.filter((egg) => egg.id !== game.solution); //Remove solution from available eggs
   distributeEggs(players, eggs);
   game.globalEggs = [...eggs];

   //Deal the query cards
   game.drawPile = dealQueryCards(players);

   //Initialize the clues sheets
   initClues(players, eggs, autoMarkPlayerEggs, autoMarkGlobalEggs);

   game.players = [...players];

   return game;
}
