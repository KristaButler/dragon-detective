import { EGG_POOL } from '../data/egg-pool';

const INDEXES = {
   blue: 0,
   green: 1,
   red: 2,
   yellow: 3,
   dragon: 0,
   wyvern: 1,
   hydra: 2,
};

export function extractClues(clues, eccessEggs) {
   const owners = [
      [
         //Blue
         [[], [], []], //Dragons (Solitaire, Pair, Cluster)
         [[], [], []], //Wyvern (Solitaire, Pair, Cluster)
         [[], [], []], //Hydra (Solitaire, Pair, Cluster)
      ],
      [
         //Green
         [[], [], []], //Dragons (Solitaire, Pair, Cluster)
         [[], [], []], //Wyvern (Solitaire, Pair, Cluster)
         [[], [], []], //Hydra (Solitaire, Pair, Cluster)
      ],
      [
         //Red
         [[], [], []], //Dragons (Solitaire, Pair, Cluster)
         [[], [], []], //Wyvern (Solitaire, Pair, Cluster)
         [[], [], []], //Hydra (Solitaire, Pair, Cluster)
      ],
      [
         //Yellow
         [[], [], []], //Dragons (Solitaire, Pair, Cluster)
         [[], [], []], //Wyvern (Solitaire, Pair, Cluster)
         [[], [], []], //Hydra (Solitaire, Pair, Cluster)
      ],
   ];

   clues.map((clue) => {
      const egg = EGG_POOL.find((egg) => egg.id === clue.eggId);

      const color = INDEXES[egg.color];
      const species = INDEXES[egg.species];
      const count = egg.count - 1;

      owners[color][species][count] = clue.ownerId;
   });

   return owners;
}
