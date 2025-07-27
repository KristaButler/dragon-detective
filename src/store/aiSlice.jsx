const createAISlice = (set, store) => ({
   ai: {},
   updateAI: (key, value) =>
      set((state) => {
         const newAI = { ...ai };
         newAI[key] = value;

         return { ai: newAI };
      }),
});

export default createAISlice;
