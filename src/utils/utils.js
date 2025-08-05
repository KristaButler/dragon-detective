//TODO: Find a better solution for these, or move to a constants file.
export const SPECIES = [
   {
      id: 'dragon',
      title: 'Dragons',
      plural: 'dragons',
      icon: '/images/symbols/dragon.png',
      order: 1,
   },
   {
      id: 'wyvern',
      title: 'Wyverns',
      plural: 'wyverns',
      icon: '/images/symbols/wyvern.png',
      order: 2,
   },
   {
      id: 'hydra',
      title: 'Hydras',
      plural: 'hydra',
      icon: '/images/symbols/hydra.png',
      order: 3,
   },
];

//TODO: Find a better solution for these, or move to a constants file.
export const EGG_COLORS = [
   {
      id: 'blue',
      plural: 'blues',
      title: 'Blue',
      icon: '/images/symbols/blue.png',
      order: 1,
   },
   {
      id: 'green',
      plural: 'greens',
      title: 'Green',
      icon: '/images/symbols/green.png',
      order: 2,
   },
   {
      id: 'red',
      plural: 'reds',
      title: 'Red',
      icon: '/images/symbols/red.png',
      order: 3,
   },
   {
      id: 'yellow',
      plural: 'yellows',
      title: 'Yellow',
      icon: '/images/symbols/yellow.png',
      order: 4,
   },
];

//TODO: Find a better solution for these, or move to a constants file.
export const COUNTS = [
   null, // Empty so index = count
   {
      id: 'solitaire',
      title: 'Solitaire',
      plural: 'solitaires',
      icon: '/images/symbols/dragon-solitaire.png',
   },
   {
      id: 'pair',
      title: 'Pair',
      plural: 'pairs',
      icon: '/images/symbols/dragon-pair.png',
   },
   {
      id: 'cluster',
      title: 'Cluster',
      plural: 'clusters',
      icon: '/images/symbols/dragon-cluster.png',
   },
];

// Source: Google Chrome Search Labs AI
export function generateUniqueRandomNumbers(count, min, max) {
   const uniqueNumbers = new Set();
   while (uniqueNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNumber);
   }
   return Array.from(uniqueNumbers);
}

export function getRandomNumber(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(deck) {
   let shuffledDeck = [...deck];

   for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
   }

   return shuffledDeck;
}

export function eggSorter(a, b) {
   const speciesA = getById(SPECIES, a.species);
   const speciesB = getById(SPECIES, b.species);

   if (a.species === b.species) {
      if (a.color === b.color) {
         return a.count - b.count; // Sort by count if species and color are the same
      } else {
         const colorA = getById(EGG_COLORS, a.color);
         const colorB = getById(EGG_COLORS, b.color);

         return colorA.order - colorB.order; // Sort by color order if species is the same
      }
   }

   return speciesA.order - speciesB.order; //Sort by species order
}

export function getById(list, id) {
   return list.find((item) => item.id === id);
}
