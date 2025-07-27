import { useDraggable } from '@dnd-kit/core';
import { COUNTS, EGG_COLORS } from '../../../utils/utils';

function getCardImage(card) {
   let cardImage = null;

   if (card && card.species && card.count) {
      cardImage = `/images/symbols/${card.species}-${
         COUNTS[card.count].id
      }.png`;
   }

   return cardImage;
}

export default function Card({
   id,
   className,
   draggable = false,
   card,
   backgroundColor,
   textOnly,
}) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
   });

   const classes = `flex flex-col justify-center w-20 h-27 p-4 rounded-xl border-4 border-zinc-300 shadow-md shadow-zinc-900 ${
      className ? className : ''
   }`;
   const enabledListeners = draggable ? listeners : undefined;
   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   const cardImage = getCardImage(card);

   let cardBackground = backgroundColor ? backgroundColor : 'bg-zinc-900';

   if (!backgroundColor && card.color) {
      const colorSettings = EGG_COLORS.find((color) => color.id === card.color);

      cardBackground = colorSettings.bg;
   }

   return (
      <div
         className={`${classes} ${cardBackground}`}
         ref={setNodeRef}
         style={style}
         {...enabledListeners}
         {...attributes}
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
         <p className='text-zinc-300 text-center text-xs'>{card.name}</p>
      </div>
   );
}
