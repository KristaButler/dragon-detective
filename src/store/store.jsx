import { create } from 'zustand';
import createSettingsSlice from './settingsSlice';
import createGameSlice from './gameSlice';
import createTurnSlice from './turnSlice';
import createCluesheetSlice from './cluesheetSlice';
import createAISlice from './aiSlice';
import { generateNewGame } from '../utils/game-utils';

const useBoundStore = create((set) => ({
   ...createSettingsSlice(set),
   ...createGameSlice(set),
   ...createCluesheetSlice(set),
   ...createTurnSlice(set),
   ...createAISlice(set),
   resetGame: () =>
      set(() => {
         return {
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
      }),
   startNewGame: () =>
      set((state) => {
         let newGame = { ...state };

         //If we don't have a solution or a winner, generate a new game
         if (!state.solution && !state.winner) {
            newGame = generateNewGame(
               state.numberOfPlayers,
               state.autoMarkPlayerEggs
            );
         }

         return {
            ...newGame,
         };
      }),
}));

export default useBoundStore;
