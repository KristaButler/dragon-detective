import { EGG_COLORS, SPECIES, COUNTS } from './utils';

function getQueryMessage(query, isPlural) {
   const color = EGG_COLORS.find((c) => c.id === query.color);
   const species = SPECIES.find((s) => s.id === query.species);
   const count = COUNTS.find((c) => c.id === query.count);

   let queryMessage = '';

   //If color is the only parameter, make it plural (if applicable), otherwise add the singular.
   if (color && !species && !count) {
      queryMessage += isPlural ? color.plural : color.id;
   } else if (color) {
      queryMessage += color.id;
   }

   //If species is the last parameter, make it plural (if applicable), otherwise add the singular.
   if (species && !count) {
      queryMessage += ' ' + (isPlural ? species.plural : species.id);
   } else {
      queryMessage += ' ' + species.id;
   }

   //Count will always be last, so it is alway pluarl (if applicable);
   if (count) {
      queryMessage += ' ' + (isPlural ? count.plural : count.id);
   }

   if (queryMessage.length < 1) {
      //Return a default string in case anything goes wrong above
      queryMessage = ' matching eggs';
   }

   return queryMessage + '';
}

export function buildMessage(opponent, query, matches, isPlayer = true) {
   let queryMessage = getQueryMessage(query, matches.length !== 1);
   let message = opponent.name || 'Player';

   if (isPlayer && query.type === 'show' && matches.length > 0) {
      //[Player Name] has the [Egg], ... and the [Egg].
      message += ' has';
      message += matches.map((match, index) => {
         const isLast = index === matches.length - 1;

         return `${isLast ? ', and' : ''} the ${match.name} ${
            !isLast ? ',' : '.'
         }`;
      });
   } else if (matches.length > 0) {
      //Query is quantity, or the message is for an opponents turn, and we have matches
      //[Player Name] has [#] [color/species/count][s].
      message = ` has ${matches.length} ${queryMessage}.`;
   } else {
      //Query is quantity, or the message is for an opponents turn, but we don't have matches
      //[Player Name] doesn't have any [color/species/count]s.
      message += ` doesn't have any ${queryMessage}.`;
   }

   return message;
}

export function findMatches(eggs, query) {
   return eggs.filter(
      (card) =>
         card.color === query.color &&
         card.species === query.species &&
         card.count === query.count
   );
}
