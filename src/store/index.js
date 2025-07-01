import { configureStore } from '@reduxjs/toolkit';

import playersSlice from './players-slice';
import queryDeckSlice from './query-deck-slice';
import eggsSlice from './eggs-slice';
import clueSheetsSlice from './clue-sheets-slice';
import turnsSlice from './turns-slice';

const store = configureStore({
   reducer: {
      players: playersSlice.reducer,
      queryDeck: queryDeckSlice.reducer,
      eggs: eggsSlice.reducer,
      clueSheets: clueSheetsSlice.reducer,
      turns: turnsSlice.reducer,
   },
});

export default store;
