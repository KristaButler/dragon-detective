import { findMatches, buildMessage } from '../utils/turn-utils';

const createTurnSlice = (set, store) => ({
   turn: {
      message: '',
      type: '',
      params: {},
      setMessage: (newMessage) =>
         set((state) => {
            return { turn: { ...state.turn, message: newMessage } };
         }),
      playCard: (opponentId, query) =>
         set((state) => {
            //Note: Query must contain free choice elements applied already
            const opponent = state.players.find(
               (player) => player.id === opponentId
            );
            const opponentsEggs = opponent.eggs;

            //Find Matches
            const matches = findMatches(opponentsEggs, query);
            const newMessage = buildMessage(opponent, query, matches);

            return {
               turn: {
                  ...state.turn,
                  type: 'PLAY_CARD',
                  params: { opponentId, query, matches },
                  message: newMessage,
               },
            };
         }),
      makeGuess: (eggId) => set((state) => {}),
      discardHand: () =>
         set((state) => {
            const newPlayer = {
               ...state.players.find((player) => (player.id = 'player')),
            };
            const newPlayers = state.players.filter(
               (player) => player.id === 'player'
            );
            const newDiscardPile = [...state.discardPile];

            //Discard all cards
            newDiscardPile.push(newPlayer.hand);

            //Draw for more cards
            newPlayer.hand = newDiscardPile.slice(-4, 4);

            newPlayers.push(newPlayer);

            return {
               game: {
                  ...game,
                  players: newPlayers,
                  discardPile: newDiscardPile,
               },
            };
         }),
      resetTurn: () =>
         set((state) => {
            return { message: '', type: '', params: {} };
         }),
   },
});

export default createTurnSlice;
