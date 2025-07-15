import { createSlice } from '@reduxjs/toolkit';
import Opponent from '../components/Opponent';
//TODO
const turnsSlice = createSlice({
   name: 'turns',
   initialState: {
      cardPlayed: null,
      matches: null,
      history: [],
   },
   reducers: {
      reset(state) {
         state.currentPlayer = 'player';
      },
      recordTurn(state, action) {
         const { playerId, cardPlayed, matches } = action.payload;
         const queryCardId = cardPlayed
            ? cardPlayed.queryCard.id
            : state.cardPlayed.queryCard.id;
         const opponentId = cardPlayed
            ? cardPlayed.opponent.id
            : state.cardPlayed.opponent.id;

         const turn = {
            playerId,
            queryCard: queryCardId,
            opponent: opponentId,
            matches: matches ? matches : state.matches,
         };

         state.history.push(turn);

         // Reset cardPlayed and matches after recording the turn
         state.cardPlayed = null;
         state.matches = null;
      },
      playCard(state, action) {
         const { queryCard, opponent, choice } = action.payload;
         state.cardPlayed = {
            queryCard,
            opponent,
            choice,
         };
      },
      setMatches(state, action) {
         const { matches } = action.payload;
         state.matches = matches;
      },
   },
});

export const turnsActions = turnsSlice.actions;

export default turnsSlice;
