function initClue(clue, eggId) {
   if (!clue) {
      clue = { id: eggId, owner: null, not: [] };
   }

   if (!clue.not) {
      clue.not = [];
   }

   return clue;
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
            const newClueSheet = [...state.cluesheet];
            let newClue = newClueSheet.find((clue) => clue.id === eggId);
            initClue(newClue, eggId); //If clue not find, create a new one, and double check we have clue.not

            if (newClue.owner === ownerId) {
               newClue.owner = null;
            } else {
               newClue.owner = ownerId;

               //Also remove from not owner list
               removeNotOwner(newClue, ownerId);
            }

            return {
               cluesheet: newClueSheet,
            };
         }),
      toggleClueNotOwner: (opponentId, eggId) =>
         set((state) => {
            const newClueSheet = [...state.cluesheet];
            let newClue = newClueSheet.find((clue) => clue.id === eggId);
            initClue(newClue, eggId); //If clue not find, create a new one, and double check we have clue.not

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
               cluesheet: newClueSheet,
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
