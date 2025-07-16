import { createSlice } from '@reduxjs/toolkit';

const INTIAL_STATE = {
   cardPlayed: null,
   isGuessing: false,
   guess: null,
   matches: null,
   history: [],
   gameOver: false,
   winner: null,
};

const turnsSlice = createSlice({
   name: 'turns',
   initialState: INTIAL_STATE,
   reducers: {
      reset(state) {
         state = INTIAL_STATE;
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
            type: 'playCard',
            queryCard: queryCardId,
            opponent: opponentId,
            matches: matches ? matches : state.matches,
         };

         state.history.push(turn);

         // Reset cardPlayed and matches after recording the turn
         state.cardPlayed = null;
         state.matches = null;
      },
      recordGuess(state, action) {
         const { playerId, guess, result } = action.payload;
         const turn = {
            playerId,
            type: 'guess',
            guess,
            result,
         };

         state.history.push(turn);

         // Reset guess and matches after recording the guess
         state.guess = null;
         state.matches = null;
      },
      recordDiscardHand(state, action) {
         const playerId = action.payload;
         state.history.push({ playerId, type: 'discardHand' });
      },
      playCard(state, action) {
         if (action.payload === null) {
            state.cardPlayed = null;
            return;
         }

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
      setIsGuessing(state, action) {
         state.isGuessing = action.payload;
      },
      setGuess(state, action) {
         state.guess = action.payload;
      },
      endGame(state, action) {
         const winner = action.payload;
         state.winner = winner;
         state.gameOver = true;
      },
   },
});

export const turnsActions = turnsSlice.actions;

export default turnsSlice;
