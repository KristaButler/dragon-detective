const createGameSlice = (set, store) => ({
   game: {
      players: [
         {
            id: 'player',
            name: 'You',
            avatar: null,
            eggs: [],
            hand: [],
            clues: [],
         },
      ],
      currentPlayer: '',
      winner: '',
      solution: '',
      globalEggs: [],
      drawPile: [],
      discardPile: [],
      notes: [],
      nextPlayer: () =>
         set((state) => {
            const currentPlayerIndex = state.players.findIndex(
               (player) => player.id === state.currentPlayer
            );

            let nextPlayerIndex = currentPlayerIndex + 1;

            //If we've reached the end of the list, move back to the beginning
            if (nextPlayerIndex >= state.players.length) {
               nextPlayerIndex = 0;
            }

            return {
               game: {
                  ...game,
                  currentPlayer: state.players[nextPlayerIndex].id,
               },
            };
         }),
   },
});

export default createGameSlice;
