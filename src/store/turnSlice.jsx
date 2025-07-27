import { findMatches, buildMessage } from '../utils/turn-utils';

const createTurnSlice = (set, store) => ({
   message: '',
   turnType: null,
   turnParams: {},
   turnActions: {
      setMessage: (newMessage) =>
         set((state) => {
            return { message: newMessage };
         }),
      setTurnParams: (params) =>
         set(() => {
            return {
               turnParams: { ...params },
            };
         }),
      playCard: (opponentId, query, cardId) =>
         set((state) => {
            //Note: Query must contain free choice elements applied already
            const opponent = state.players.find(
               (player) => player.id === opponentId
            );
            const opponentsEggs = opponent.eggs;

            //Find Matches
            const matches = findMatches(opponentsEggs, query);
            const newMessage = buildMessage(opponent, query, matches);

            //Discard Card
            const newPlayers = [...state.players];
            const newPlayer = newPlayers.find(
               (player) => (player.id = 'player')
            );

            newPlayer.hand = newPlayer.hand.filter(
               (card) => card.id !== cardId
            );

            const newDiscardPile = [...state.discardPile, cardId];

            let returnState = {
               turnType: 'PLAY_CARD',
               turnParams: { opponentId, query, matches },
               players: newPlayers,
               discardPile: newDiscardPile,
               notes: [...state.notes, newMessage],
            };

            if (query.type === 'quantity' || matches.length < 1) {
               returnState.message = newMessage;
            }

            return { ...returnState };
         }),
      makeGuess: (eggId) =>
         set((state) => {
            if (state.solution === eggId) {
               state.winner = 'player';
            } else {
               state.winner = 'opponent';
            }
         }),
      discardHand: () =>
         set((state) => {
            const newPlayers = [...state.players];
            const newPlayer = newPlayers.find(
               (player) => (player.id = 'player')
            );
            const newDiscardPile = [...state.discardPile];

            //Discard all cards
            newDiscardPile.push(newPlayer.hand);

            //Draw for more cards
            newPlayer.hand = state.drawPile.slice(0, 4);

            return {
               turnType: 'DISCARD_HAND',
               players: newPlayers,
               discardPile: newDiscardPile,
            };
         }),
   },
});

export default createTurnSlice;
