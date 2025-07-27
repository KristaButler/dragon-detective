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
            let newClue = state.cluesheet.find((clue) => clue.id === eggId);
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
            let newClue = state.cluesheet.find((clue) => clue.id === eggId);
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
            const newClue = newClueSheet.find((clue) => clue.id === eggId);

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
   },
});

export default createCluesheetSlice;
