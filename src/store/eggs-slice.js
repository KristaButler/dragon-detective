import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
   solution: null,
   excessEggs: [],
   playerEggs: {},
};

const eggsSlice = createSlice({
   name: 'eggs',
   initialState: INITIAL_STATE,
   reducers: {
      reset(state) {
         state = INITIAL_STATE;
      },
      setSolution(state, action) {
         state.solution = action.payload; // Set the solution egg
      },
      setExcessEggs(state, action) {
         state.excessEggs = action.payload; // Set excess eggs
      },
      setPlayerEggs(state, action) {
         state.playerEggs = action.payload;
      },
   },
});

export const eggsActions = eggsSlice.actions;

export default eggsSlice;
