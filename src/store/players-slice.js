import { createSlice } from '@reduxjs/toolkit';
import { PLAYER } from '../data/player-pool';

const playersSlice = createSlice({
   name: 'players',
   initialState: {
      players: [PLAYER], // Initialize with the player
      currentPlayer: 'player',
   },
   reducers: {
      reset(state) {
         state.players = [PLAYER]; // Reset players to initial state with only the player
      },
      addOpponents(state, action) {
         const opponents = action.payload; // Get opponents from action payload
         state.players = [PLAYER, ...opponents]; // Reset players to initial state with only the player
      },
      setCurrentPlayer(state, action) {
         state.currentPlayer = action.payload; //set current player id to the one provided, or player if not found
      },
      nextPlayer(state) {
         const currentPlayerIndex = state.players.findIndex(
            (player) => player.id === state.currentPlayer
         );

         let nextPlayerIndex = currentPlayerIndex + 1;

         //If we've reached the end of the list, move back to the beginning
         if (nextPlayerIndex >= state.players.length) {
            nextPlayerIndex = 0;
         }

         state.currentPlayer = state.players[nextPlayerIndex].id;
      },
   },
});

export const playersActions = playersSlice.actions;

export default playersSlice;
