import { createSlice } from '@reduxjs/toolkit';
//TODO
const turnsSlice = createSlice({
   name: 'turns',
   initialState: {
      history: [],
   },
   reducers: {
      reset(state) {
         state.currentPlayer = 'player';
      },
      recordTurn(state, action) {
         history.push(action.payload);
      },
   },
});

export const turnsActions = turnsSlice.actions;

export default turnsSlice;
