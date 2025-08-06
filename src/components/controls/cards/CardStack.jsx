import { useState } from 'react';
import Card from './Card';
import './CardStack.css';

export default function CardStack({
   cards,
   right,
   backgroundColor,
   className,
   expand = false,
   disabled = false,
   ...props
}) {
   const [expanded, setExpanded] = useState(expand);

   function toggleExpanded() {
      setExpanded((prevExpanded) => !prevExpanded);
   }

   const listClasses = `cardstack ${expanded ? 'expanded' : 'stacked'} ${
      right ? 'right' : 'left'
   } ${className ? className : ''}`;

   return (
      <div className='cardstack-container'>
         <div
            className={listClasses}
            onClick={disabled ? undefined : toggleExpanded}
            {...props}
         >
            {expanded && <div className='placeholder'>&nbsp;</div>}
            {cards &&
               cards.map((card) => {
                  return (
                     <Card
                        key={card.id}
                        backgroundColor={backgroundColor}
                        card={card}
                     />
                  );
               })}
         </div>
      </div>
   );
}
