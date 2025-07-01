import { OPPONENTS } from '../data/player-pool';

// Source: Google Chrome Search Labs AI
function generateUniqueRandomNumbers(count, min, max) {
   const uniqueNumbers = new Set();
   while (uniqueNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNumber);
   }
   return Array.from(uniqueNumbers);
}

export function selectOpponents(opponentCount) {
   const uniqueIndexes = generateUniqueRandomNumbers(
      opponentCount,
      0,
      OPPONENTS.length - 1
   );

   const opponents = [];
   // Add each opponent to the list
   for (const index of uniqueIndexes) {
      const opponent = OPPONENTS[index]; // Get the opponent by index
      opponents.push(opponent);
   }

   return opponents;
}
