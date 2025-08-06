import { QUERY_POOL } from '../data/query-pool';
import { HAND_SIZE } from '../utils/game-utils';
import { findMatches, buildMessage } from '../utils/turn-utils';
import { getById, shuffle } from '../utils/utils';

const createTurnSlice = (set) => ({
   message: '',
   turnType: null,
   turnParams: {},
   turnActions: {
      setMessage: (newMessage) =>
         set(() => {
            return { message: newMessage };
         }),
      setTurnParams: (params) =>
         set(() => {
            return {
               turnParams: { ...params },
            };
         }),
      playCard: (opponentId, query) =>
         set((state) => {
            //Note: Query must contain free choice elements applied already
            const opponent = getById(state.players, opponentId);
            const opponentsEggs = opponent.eggs;

            //Find Matches
            const matches = findMatches(opponentsEggs, query);
            const newMessage = buildMessage(opponent, query, matches);

            //Discard Card
            const newPlayers = [...state.players];
            const newPlayer = getById(newPlayers, 'player');

            newPlayer.hand = newPlayer.hand.filter(
               (card) => card.id !== query.id
            );

            const card = getById(QUERY_POOL, query.id);
            const newDiscardPile = [...state.discardPile, card];

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
            return {
               winner: state.solution === eggId ? 'player' : 'opponent',
               turnParams: { guess: eggId },
            };
         }),
      discardHand: () =>
         set((state) => {
            const newPlayers = [...state.players];
            const newPlayer = getById(newPlayers, 'player');
            let newDiscardPile = [...state.discardPile];
            let newDrawPile = [...state.drawPile];

            //Discard all cards
            newPlayer.hand.forEach((card) => newDiscardPile.push(card));
            newPlayer.hand = [];

            //Shuffle query cards if needed
            if (newDrawPile.length < HAND_SIZE) {
               newDrawPile = [...newDrawPile, ...newDiscardPile];
               newDrawPile = shuffle(newDrawPile);
               newDiscardPile = [];
            }

            //Draw 4 more cards
            while (newPlayer.hand.length < HAND_SIZE) {
               newPlayer.hand.push(newDrawPile.pop());
            }

            return {
               turnType: 'DISCARD_HAND',
               players: newPlayers,
               discardPile: newDiscardPile,
               drawPile: newDrawPile,
            };
         }),
   },
});

export default createTurnSlice;
