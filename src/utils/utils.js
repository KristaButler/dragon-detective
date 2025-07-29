export const COLOR_MAP = [];

//TODO: Move this to backend or setup file?
export const SPECIES = [
   {
      id: 'dragon',
      title: 'Dragons',
      plural: 'dragons',
      bg: 'bg-violet-900',
      bgLight: 'bg-violet-300',
      icon: '/images/symbols/dragon.png',
   },
   {
      id: 'wyvern',
      title: 'Wyverns',
      plural: 'wyverns',
      bg: 'bg-purple-900',
      bgLight: 'bg-purple-300',
      icon: '/images/symbols/wyvern.png',
   },
   {
      id: 'hydra',
      title: 'Hydras',
      plural: 'hydra',
      bg: 'bg-fuchsia-900',
      bgLight: 'bg-fuchsia-300',
      icon: '/images/symbols/hydra.png',
   },
];
export const EGG_COLORS = [
   {
      id: 'blue',
      plural: 'blues',
      title: 'Blue',
      bg: 'bg-indigo-900',
      icon: '/images/symbols/blue.png',
   },
   {
      id: 'green',
      plural: 'greens',
      title: 'Green',
      bg: 'bg-emerald-900',
      icon: '/images/symbols/green.png',
   },
   {
      id: 'red',
      plural: 'reds',
      title: 'Red',
      bg: 'bg-red-900',
      icon: '/images/symbols/red.png',
   },
   {
      id: 'yellow',
      plural: 'yellows',
      title: 'Yellow',
      bg: 'bg-yellow-700',
      icon: '/images/symbols/yellow.png',
   },
];
export const COUNTS = [
   null, // Empty so index = count
   {
      id: 'solitaire',
      title: 'Solitaire',
      plural: 'solitaires',
      bg: 'bg-zinc-600',
      icon: '/images/symbols/dragon-solitaire.png',
   },
   {
      id: 'pair',
      title: 'Pair',
      plural: 'pairs',
      bg: 'bg-zinc-600',
      icon: '/images/symbols/dragon-pair.png',
   },
   {
      id: 'cluster',
      title: 'Cluster',
      plural: 'clusters',
      bg: 'bg-zinc-600',
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
