import { EGG_POOL } from '../data/egg-pool';
import { shuffle } from './util';

export function chooseSolution() {
   const randomIndex = Math.floor(Math.random() * EGG_POOL.length);
   return EGG_POOL[randomIndex];
}

export function distributeEggs(playerIds, solution) {
   let availableEggs = EGG_POOL.filter((egg) => egg.id !== solution.id); //remove the solution from the pool

   availableEggs = shuffle(availableEggs); // Shuffle the eggs to randomize distribution

   const playersEggs = [];
   const excessEggs = [];
   const eggsPerPlayer = Math.floor(availableEggs.length / playerIds.length); //Calculate how many eggs each player should get

   playerIds.forEach((playerId) => {
      for (let i = 0; i < eggsPerPlayer; i++) {
         const egg = availableEggs.pop(); // Get the next egg from the available eggs

         if (!playersEggs[playerId]) {
            playersEggs[playerId] = [];
         }

         playersEggs[playerId].push(egg); // Assign the egg to the player
      }
   });

   excessEggs.push(...availableEggs); // Any remaining eggs go to excessEggs

   return { playersEggs, excessEggs };
}
