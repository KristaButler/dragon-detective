const createTurnSlice = (set, store) => ({
   turn: {
      message: '',
      setMessage: (newMessage) =>
         set((state) => {
            return { turn: { ...state.turn, message: newMessage } };
         }),
   },
});

export default createTurnSlice;
