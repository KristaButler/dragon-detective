import { create } from 'zustand';
import createSettingsSlice from './settingsSlice';
import createGameSlice from './gameSlice';
import createTurnSlice from './turnSlice';
import createCluesheetSlice from './cluesheetSlice';
import createAISlice from './aiSlice';
import { generateNewGame } from '../utils/game-utils';

const useBoundStore = create((set, get, store) => ({
   ...createSettingsSlice(set, store),
   ...createGameSlice(set, store),
   ...createCluesheetSlice(set, store),
   ...createTurnSlice(set, store),
   ...createAISlice(set, store),
   startNewGame: () =>
      set((state) => {
         const newGame = generateNewGame(
            state.numberOfPlayers,
            state.autoMarkPlayerEggs
         );

         return {
            ...newGame,
         };
      }),
}));

export default useBoundStore;
