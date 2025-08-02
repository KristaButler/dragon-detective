import { useDraggable } from '@dnd-kit/core';
import { COUNTS } from '../../../utils/utils';
import './Card.css';

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

   const enabledListeners = draggable ? listeners : undefined;
   const style = transform
      ? {
           transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

   const cardImage = getCardImage(card);

   let cardBackground = backgroundColor
      ? backgroundColor
      : 'default-background';

   if (!backgroundColor && card.color) {
      cardBackground = `background-${card.color}`;
   }

   return (
      <div
         className={`card ${className ? className : ''} ${cardBackground}`}
         ref={setNodeRef}
         style={style}
         {...enabledListeners}
         {...attributes}
      >
         {cardImage && !textOnly && (
            <div className='card-img-container'>
               <img
                  src={cardImage}
                  alt={card.name}
               />
            </div>
         )}
         <p className='card-name'>{card.name}</p>
      </div>
   );
}
