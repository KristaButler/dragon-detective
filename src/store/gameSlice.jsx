import { QUERY_POOL } from '../data/query-pool';
import { getById, shuffle } from '../utils/utils';

const createGameSlice = (set, store) => ({
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
   winner: null,
   solution: null,
   globalEggs: [],
   drawPile: [],
   discardPile: [],
   notes: [],
   turnCount: 0,
   gameActions: {
      nextPlayer: () =>
         set((state) => {
            const currentPlayerIndex = state.players.findIndex(
               (player) => player.id === state.currentPlayer
            );

            let nextPlayerIndex = currentPlayerIndex + 1;

            //If we've reached the end of the list, move back to the beginning
            if (nextPlayerIndex >= state.players.length) {
               nextPlayerIndex = 0;
            }

            let newTurnCount = state.turnCount;
            if (state.currentPlayer === 'player') {
               newTurnCount++;
            }

            //Also reset turn state
            return {
               currentPlayer: state.players[nextPlayerIndex].id,
               message: '',
               turnType: null,
               turnParams: {},
               turnCount: newTurnCount,
            };
         }),
      addNote: (note) =>
         set((state) => {
            const newNotes = [note, ...state.notes];
            return { notes: newNotes };
         }),
      draw: (playerId) =>
         set((state) => {
            const newPlayers = [...state.players];
            const newPlayer = getById(newPlayers, playerId);
            let newDrawPile = [...state.drawPile];
            let newDiscardPile = [...state.discardPile];

            if (newPlayer.hand.length < 4) {
               if (newDrawPile < 1) {
                  //Shuffle query cards if needed
                  newDrawPile = [...newDrawPile, ...newDiscardPile];
                  newDrawPile = shuffle(newDrawPile);
                  newDiscardPile = [];
               }

               newPlayer.hand.push(newDrawPile.pop());
            }

            return {
               players: newPlayers,
               drawPile: newDrawPile,
               discardPile: newDiscardPile,
            };
         }),
   },
});

export default createGameSlice;
