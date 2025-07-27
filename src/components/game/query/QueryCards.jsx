import Card from '../../controls/cards/Card';

export default function QueryCards({ cards, enabled }) {
   const backgroundColor = enabled ? 'bg-zinc-900' : 'bg-zinc-700';
   const spacer = <div className='w-20'>&nbsp;</div>;

   return (
      <div className='flex gap-2'>
         {cards.length < 4 && spacer}
         {cards.map((card) => (
            <Card
               key={`query-${card.id}`}
               id={card.id}
               backgroundColor={backgroundColor}
               draggable={enabled}
               card={card}
               textOnly
            />
         ))}
      </div>
   );
}
