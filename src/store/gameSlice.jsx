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

            return {
               currentPlayer: state.players[nextPlayerIndex].id,
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
      discard: (cardId) =>
         set((state) => {
            const newPlayers = [...state.players];
            const newPlayer = newPlayers.find(
               (player) => (player.id = 'player')
            );

            newPlayer.hand = newPlayer.hand.map((card) => card.id !== cardId);
            newPlayers.push(newPlayer);

            const newDiscardPile = [...state.discardPile, cardId];

            return {
               players: newPlayers,
               discardPile: newDiscardPile,
            };
         }),
   },
});

export default createGameSlice;
