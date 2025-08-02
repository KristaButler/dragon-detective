import Card from '../../controls/cards/Card';
import './QueryCards.css';

export default function QueryCards({ cards, enabled }) {
   const spacer = <div className='spacer'>&nbsp;</div>;

   return (
      <div className='query-cards'>
         {cards.length < 4 && spacer}
         {cards.map((card) => (
            <Card
               key={`query-${card.id}`}
               id={card.id}
               backgroundColor={enabled ? 'card-enabled' : 'background-default'}
               draggable={enabled}
               card={card}
               textOnly
            />
         ))}
      </div>
   );
}
