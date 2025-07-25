import { useState } from 'react';
import { COUNTS, COLORS } from '../../utils/utils';
import Card from './Card';

function getCardImage(card) {
   let cardImage = null;

   if (card.species && card.count) {
      cardImage = `/images/symbols/${card.species}-${
         COUNTS[card.count].id
      }.png`;
   }

   return cardImage;
}

export default function CardStack({
   cards,
   right,
   textOnly,
   backgroundColor,
   className,
   expand,
   ...props
}) {
   const [expanded, setExpanded] = useState(expand);
   let classes = right ? '-mr-18' : '-ml-18';

   if (expanded) {
      classes = right ? '-mr-2' : '-ml-2';
   }

   function toggleExpanded() {
      setExpanded((prevExpanded) => !prevExpanded);
   }

   let listClasses = `flex ${className ? className : undefined}`;

   if (expanded) {
      listClasses = `${listClasses} absolute ${
         right ? 'right-0' : 'left-0'
      } z-100`;
   }

   if (right) {
      listClasses = `${listClasses} flex-row-reverse`;
   }

   return (
      <div className='relative w-32'>
         <div
            className={listClasses}
            onClick={toggleExpanded}
            {...props}
         >
            {cards &&
               cards.map((card, index) => {
                  const cardImage = getCardImage(card);
                  let cardBackground = backgroundColor
                     ? backgroundColor
                     : 'bg-zinc-900';

                  if (!backgroundColor && card.color) {
                     const colorSettings = COLORS.find(
                        (color) => color.id === card.color
                     );

                     cardBackground = `bg-${colorSettings.color}-900`;
                  }

                  let imgClasses = cardBackground;

                  if (index > 0) {
                     imgClasses = `${imgClasses} ${classes}`;
                  }

                  if (right) {
                     imgClasses = `${imgClasses} relative z-${index}`;
                  }

                  return (
                     <Card
                        key={card.id}
                        className={imgClasses}
                     >
                        {cardImage && !textOnly && (
                           <div className='h-8 w-auto'>
                              <img
                                 src={cardImage}
                                 alt={card.name}
                                 className='w-full h-full object-contain object-center pb-2'
                              />
                           </div>
                        )}
                        <p className='text-zinc-300 text-center text-xs'>
                           {card.name}
                        </p>
                     </Card>
                  );
               })}
         </div>
      </div>
   );
}
