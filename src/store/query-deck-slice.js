import { createSlice } from '@reduxjs/toolkit';
import { shuffle } from '../util/util';
import { HAND_SIZE, QUERY_POOL } from '../data/query-pool';

const INITIAL_STATE = {
   drawPile: [QUERY_POOL],
   discardPile: [],
   playerHands: [], // This will hold player hands, keyed by playerId
};

const queryDeckSlice = createSlice({
   name: 'queryDeck',
   initialState: INITIAL_STATE,
   reducers: {
      reset(state) {
         state = INITIAL_STATE; // Reset draw pile to initial state
         state.drawPile = shuffle(state.drawPile); // Re-shuffle the draw pile
      },
      shuffleDiscardPile(state) {
         // Shuffle the discard pile and move it back to the draw pile
         state.drawPile = [...state.drawPile, ...state.discardPile];
         state.discardPile = [];
         state.drawPile = shuffle(state.drawPile);
      },
      setPlayerHands(state, action) {
         const playerHands = action.payload;
         state.playerHands = playerHands;
      },
      setDrawPile(state, action) {
         const drawPile = action.payload;
         state.drawPile = drawPile;
      },
      draw(state, action) {
         const playerId = action.payload;
         const playerHand = state.playerHands.find(
            (hand) => hand.playerId === playerId
         ); // Get the player's hand or initialize it

         if (state.drawPileCount < 1) {
            this.shuffleDiscardPile(state);
         }

         const queryCard = state.drawPile.pop(); // Draw the top card from the draw pile
         playerHand.cards.push(queryCard); // Add the drawn card to the player's hand
      },
      discard(state, action) {
         const { playerId, discardId } = action.payload; //Get the playerId and discarded card
         const discardedCard = QUERY_POOL.find((card) => card.id === discardId); // Find the discarded card in the QUERY_POOL
         const playerHand = state.playerHands.find(
            (hand) => hand.playerId === playerId
         );

         state.discardPile.push(discardedCard); // Add the query card to the discard pile

         if (playerHand) {
            // Remove the discarded card from the player's hand
            playerHand.cards = playerHand.cards.filter(
               (card) => card.id !== discardId
            );
         }
      },
      discardHand(state, action) {
         const playerId = action.payload;
         const playersHand = state.playerHands.find(
            (hand) => hand.playerId === playerId
         );

         // Add all cards in the player's hand to the discard pile
         state.discardPile.push(...playersHand);
         playersHand.cards = []; // Clear the player's hand

         // Draw new cards to fill the hand
         for (let i = 0; i < HAND_SIZE; i++) {
            if (state.drawPile.length > 0) {
               playersHand.cards.push(state.drawPile.pop());
            }
         }
      },
   },
});

export const queryDeckActions = queryDeckSlice.actions;

export default queryDeckSlice;
