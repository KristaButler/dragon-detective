import { create } from 'zustand';
import createSettingsSlice from './settingsSlice';
import createGameSlice from './gameSlice';
import { generateNewGame } from '../utils/game-utils';
import createTurnSlice from './turnSlice';

const useBoundStore = create((set, get, store) => ({
   ...createSettingsSlice(set, store),
   ...createGameSlice(set, store),
   ...createTurnSlice(set, store),
   startNewGame: () =>
      set((state) => {
         const newGame = generateNewGame(
            store.getInitialState().game,
            state.settings.numberOfPlayers,
            state.settings.autoMarkPlayerEggs,
            state.settings.autoMarkGlobalEggs
         );

         return { ...state, game: { ...newGame } };
      }),
}));

export default useBoundStore;
