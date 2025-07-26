import Card from '../controls/cards/Card';

export default function QueryCards({ cards, isCurrentPlayer }) {
   const classes = isCurrentPlayer ? 'bg-zinc-900' : 'bg-zinc-700';

   return (
      <div className='flex gap-2'>
         {cards.map((card) => (
            <Card
               key={`query-${card.id}`}
               id={card.id}
               className={classes}
               draggable={isCurrentPlayer}
            >
               <p className='text-zinc-300 text-center text-xs'>{card.name}</p>
            </Card>
         ))}
      </div>
   );
}
