import { EGG_COLORS, SPECIES, COUNTS, getById } from './utils';

function getQueryMessage(query, isPlural) {
   const color = query.color ? getById(EGG_COLORS, query.color) : undefined;
   const species = query.species ? getById(SPECIES, query.species) : undefined;
   const count = query.count ? COUNTS[query.count] : undefined;

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
   } else if (species) {
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

   return queryMessage;
}

export function buildMessage(
   opponent,
   query,
   matches,
   playerName = '',
   isPlayer = true
) {
   let queryMessage = getQueryMessage(query, matches.length !== 1);
   let message = opponent.name || 'Player';

   if (isPlayer && query.type === 'show' && matches.length > 0) {
      //[Player Name] has the [Egg], ... and the [Egg].
      message += ' has';
      message += matches.reduce((value, match, index) => {
         const last = index === matches.length - 1;

         return `${value}${last && matches.length > 1 ? ', and' : ''}${
            !last && index > 0 ? ',' : ''
         } the ${match.name}${last ? '.' : ''}`;
      }, '');
   } else if (!isPlayer && opponent.id === 'player') {
      message = `${playerName} asked about your ${queryMessage}.`;
   } else if (matches.length > 0) {
      //Query is quantity, or the message is for an opponents turn, and we have matches
      //[Player Name] has [#] [color/species/count][s].

      message += ` has ${matches.length} ${queryMessage}.`;
   } else {
      //Query is quantity, or the message is for an opponents turn, but we don't have matches
      //[Player Name] doesn't have any [color/species/count]s.
      message += ` doesn't have any ${queryMessage}.`;
   }

   return message;
}

export function isMatch(egg, query) {
   //Note: Query must contain free choice elements applied already
   if (query.color && query.color !== egg.color) {
      return false;
   }

   if (query.species && query.species !== egg.species) {
      return false;
   }

   if (query.count && query.count !== egg.count) {
      return false;
   }

   return true;
}

export function findMatches(eggs, query) {
   return eggs.filter((egg) => isMatch(egg, query));
}
