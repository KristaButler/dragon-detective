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

export function getColorBackground(color) {
   let bgColor = '';

   if (color === 'blue') {
      bgColor = 'bg-indigo';
   } else if (color === 'green') {
      bgColor = 'bg-emerald';
   } else {
      bgColor = `bg-${color}`;
   }

   return bgColor;
}
