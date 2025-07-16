import { createSlice } from '@reduxjs/toolkit';
import { eggsActions } from './eggs-slice';

const INITIAL_STATE = {
   clueSheets: [],
};

const clueSheetsSlice = createSlice({
   name: 'clueSheets',
   initialState: INITIAL_STATE,
   reducers: {
      reset(state) {
         state.clueSheets = INITIAL_STATE; // Reset the sheet to the initial state
      },
      initialize(state, action) {
         const players = action.payload;

         //Only initialize if sheets are empty
         if (state.clueSheets.length < 1) {
            players.forEach((playerId) => {
               state.clueSheets.push({ playerId, clues: [] });
            });
         }
      },
      setEggOwner(state, action) {
         const { playerId, ownerId, eggId } = action.payload; // Destructure the payload to get playerId, ownerId, and eggId
         //Look up the players clueSheet
         let playerClueSheet = state.clueSheets.find(
            (clueSheet) => clueSheet.playerId === playerId
         );

         //If clue sheet not found, then generate it and re look it up.
         if (!playerClueSheet) {
            state.clueSheets.push({ playerId, clues: [] });
            playerClueSheet = state.clueSheets.find(
               (clueSheet) => clueSheet.playerId === playerId
            );
         }

         //Look up the clue for the egg
         const clue = playerClueSheet.clues.find(
            (clue) => clue.eggId === eggId
         );

         if (!clue) {
            //If clue not found, add it
            playerClueSheet.clues.push({ eggId, ownerId });
         } else {
            //Update clue owner
            clue.ownerId = ownerId;
         }
      },
   },
   extraReducers: (builder) => {
      builder.addCase(eggsActions.setExcessEggs, (state, action) => {
         const excessEggs = action.payload;

         //Set owner to "excess" for each excess egg
         excessEggs.forEach((egg) => {
            state.clueSheets.forEach((clueSheet) => {
               const clue = clueSheet.clues.find(
                  (clue) => clue.eggId === egg.id
               );
               if (!clue) {
                  //If clue not found, add it
                  clueSheet.clues.push({
                     eggId: egg.id,
                     ownerId: 'excess',
                  });
               } else {
                  //Update clue owner
                  clue.ownerId = 'excess';
               }
            });
         });
      });

      builder.addCase(eggsActions.setPlayerEggs, (state, action) => {
         const playersEggs = action.payload;

         Object.keys(playersEggs).forEach((playerId) => {
            const eggs = playersEggs[playerId];
            const playerClueSheet = state.clueSheets.find(
               (clueSheet) => clueSheet.playerId === playerId
            );

            if (eggs && playerClueSheet) {
               eggs.forEach((egg) => {
                  playerClueSheet.clues.push({
                     eggId: egg.id,
                     ownerId: playerId,
                  });
               });
            }
         });
      });
   },
});

export const clueSheetsActions = clueSheetsSlice.actions;

export default clueSheetsSlice;
