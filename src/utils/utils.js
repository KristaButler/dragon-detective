export const COLOR_MAP = [];

//TODO: Move this to backend or setup file?
export const SPECIES = [
   {
      id: 'dragon',
      title: 'Dragons',
      plural: 'dragons',
      icon: '/images/symbols/dragon.png',
   },
   {
      id: 'wyvern',
      title: 'Wyverns',
      plural: 'wyverns',
      icon: '/images/symbols/wyvern.png',
   },
   {
      id: 'hydra',
      title: 'Hydras',
      plural: 'hydra',
      icon: '/images/symbols/hydra.png',
   },
];
export const EGG_COLORS = [
   {
      id: 'blue',
      plural: 'blues',
      title: 'Blue',
      icon: '/images/symbols/blue.png',
   },
   {
      id: 'green',
      plural: 'greens',
      title: 'Green',
      icon: '/images/symbols/green.png',
   },
   {
      id: 'red',
      plural: 'reds',
      title: 'Red',
      icon: '/images/symbols/red.png',
   },
   {
      id: 'yellow',
      plural: 'yellows',
      title: 'Yellow',
      icon: '/images/symbols/yellow.png',
   },
];
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

export function getById(list, id) {
   return list.find((item) => item.id === id);
}
