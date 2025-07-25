//TODO: Move this to backend or setup file?
export const SPECIES = [
   {
      id: 'dragon',
      title: 'Dragons',
      color: 'violet',
      icon: '/images/symbols/dragon.png',
   },
   {
      id: 'wyvern',
      title: 'Wyverns',
      color: 'purple',
      icon: '/images/symbols/wyvern.png',
   },
   {
      id: 'hydra',
      title: 'Hydras',
      color: 'fuchsia',
      icon: '/images/symbols/hydra.png',
   },
];
export const COLORS = [
   {
      id: 'blue',
      title: 'Blue',
      color: 'indigo',
      icon: '/images/symbols/blue.png',
   },
   {
      id: 'green',
      title: 'Green',
      color: 'emerald',
      icon: '/images/symbols/green.png',
   },
   {
      id: 'red',
      title: 'Red',
      color: 'red',
      icon: '/images/symbols/red.png',
   },
   {
      id: 'yellow',
      title: 'Yellow',
      color: 'yellow',
      icon: '/images/symbols/yellow.png',
   },
];
export const COUNTS = [
   null, // Empty so index = count
   { id: 'solitaire', title: 'Solitaire' },
   { id: 'pair', title: 'Pair' },
   { id: 'cluster', title: 'Cluster' },
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
