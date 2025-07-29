import { getById } from '../utils/utils';

function cloneOrInitClue(clue, eggId) {
   if (!clue) {
      clue = { id: eggId, owner: null, not: [] };
   }

   if (!clue.not) {
      clue.not = [];
   }

   return { ...clue };
}

function removeNotOwner(clue, opponentId) {
   if (clue.not) {
      clue.not = clue.not.filter((opponent) => opponent !== opponentId);
   }
}

const createCluesheetSlice = (set, store) => ({
   selectedClue: null,
   cluesheet: [],
   cluesheetActions: {
      toggleClueOwner: (ownerId, eggId) =>
         set((state) => {
            const newClueSheet = [
               ...state.cluesheet.filter((clue) => clue.id !== eggId),
            ];
            let newClue = getById(state.cluesheet, eggId);
            newClue = cloneOrInitClue(newClue, eggId);

            if (newClue.owner === ownerId) {
               newClue.owner = null;
            } else {
               newClue.owner = ownerId;

               //Also remove from not owner list
               removeNotOwner(newClue, ownerId);
            }

            return {
               cluesheet: [...newClueSheet, newClue],
            };
         }),
      toggleClueNotOwner: (opponentId, eggId) =>
         set((state) => {
            const newClueSheet = [
               ...state.cluesheet.filter((clue) => clue.id !== eggId),
            ];
            let newClue = getById(state.cluesheet, eggId);
            newClue = cloneOrInitClue(newClue, eggId);

            if (newClue.not.indexOf(opponentId) !== -1) {
               removeNotOwner(newClue, opponentId);
            } else {
               newClue.not.push(opponentId);

               //Also clear owner
               if (newClue.owner === opponentId) {
                  newClue.owner = null;
               }
            }

            return {
               cluesheet: [...newClueSheet, newClue],
            };
         }),
      clearClue: (eggId) =>
         set((state) => {
            const newClueSheet = [...state.cluesheet];
            const newClue = getById(newClueSheet, eggId);

            newClue.owner = null;
            newClue.not = [];

            return {
               cluesheet: newClueSheet,
            };
         }),
      setSelectedClue: (clueId) =>
         set((state) => {
            return { selectedClue: clueId };
         }),
      markClues: (clues, ownerId) =>
         set((state) => {
            const newClueSheet = [...state.cluesheet];

            clues.forEach((clue) => {
               let newClue = newClueSheet.find((egg) => egg.id === clue.id);

               if (!newClue) {
                  newClue = { id: clue.id, owner: ownerId, not: [] };
                  newClueSheet.push(newClue);
               } else {
                  newClue.owner = ownerId;
               }
            });

            return {
               cluesheet: newClueSheet,
            };
         }),
   },
});

export default createCluesheetSlice;
