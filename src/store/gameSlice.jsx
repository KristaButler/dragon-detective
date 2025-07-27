const createGameSlice = (set, store) => ({
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
   gameActions: {
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

            //Also reset turn state
            return {
               currentPlayer: state.players[nextPlayerIndex].id,
               message: '',
               turnType: null,
               turnParams: {},
            };
         }),
      addNote: (note) =>
         set((state) => {
            const newNotes = [...state.notes, note];
            return { notes: newNotes };
         }),
      draw: () =>
         set((state) => {
            const newPlayers = [...state.players];
            const newPlayer = newPlayers.find(
               (player) => (player.id = 'player')
            );
            const newDrawPile = [...state.drawPile];

            if (newPlayer.hand.length < 4) {
               newPlayer.hand.push(newDrawPile.pop());
            }

            return {
               players: newPlayers,
               drawPile: newDrawPile,
            };
         }),
   },
});

export default createGameSlice;
