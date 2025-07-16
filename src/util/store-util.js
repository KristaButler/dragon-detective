import { chooseSolution, distributeEggs } from './eggs-util';
import { selectOpponents } from './players-util';
import { getRandomNumber } from './util';
import store from '../store';
import queryDeckSlice from '../store/query-deck-slice';
import playersSlice from '../store/players-slice';
import eggsSlice from '../store/eggs-slice';
import clueSheetsSlice from '../store/clue-sheets-slice';
import { dealCards } from './query-deck-util';
import turnsSlice from '../store/turns-slice';

export function resetGame() {
   // Reset all slices to their initial state
   playersSlice.actions.reset();
   queryDeckSlice.actions.reset();
   eggsSlice.actions.reset();
   clueSheetsSlice.actions.reset();
   turnsSlice.actions.reset();
}

export function startGame(opponentCount) {
   const state = store.getState();
   resetGame(); // Reset the game state before starting a new game

   opponentCount = Math.min(Math.max(opponentCount, 2), 6); //Ensure opponent count is between 2 and 6

   const opponents = selectOpponents(opponentCount);
   const opponentIds = opponents.map((player) => player.id);
   const playerIds = ['player', ...opponentIds];

   store.dispatch(playersSlice.actions.addOpponents(opponents)); // Set the opponents from the selected opponents

   const randomIndex = getRandomNumber(0, playerIds.length - 1); // Randomly select the first player
   const firstPlayerId = playerIds[randomIndex];
   //const firstPlayerId = 'player'; //TODO: For testing only
   store.dispatch(playersSlice.actions.setCurrentPlayer(firstPlayerId)); // Set the first player in the turns slice

   const solution = chooseSolution(); // Randomly select a solution
   store.dispatch(eggsSlice.actions.setSolution(solution)); // Randomly select a solution

   store.dispatch(clueSheetsSlice.actions.initialize(playerIds));

   //Distribute eggs to players
   const { playersEggs, excessEggs } = distributeEggs(playerIds, solution);

   store.dispatch(eggsSlice.actions.setPlayerEggs(playersEggs));
   store.dispatch(eggsSlice.actions.setExcessEggs(excessEggs));

   //Deal cards to players
   dealCards(playerIds);
}
