import { useState } from 'react';
import { COUNTS, EGG_COLORS } from '../../../utils/utils';
import Card from './Card';

export default function CardStack({
   cards,
   right,
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
                  let imgClasses = '';

                  if (index > 0) {
                     imgClasses = classes;
                  }

                  if (right) {
                     imgClasses = `${imgClasses} relative z-${index}`;
                  }

                  return (
                     <Card
                        key={card.id}
                        className={imgClasses}
                        backgroundColor={backgroundColor}
                        card={card}
                     />
                  );
               })}
         </div>
      </div>
   );
}
