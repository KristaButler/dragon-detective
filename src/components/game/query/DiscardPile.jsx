import { QUERY_POOL } from '../../../data/query-pool';
import useBoundStore from '../../../store/store';
import Card from '../../controls/cards/Card';

export default function DiscardPile() {
   const discardPile = useBoundStore((state) => state.discardPile);
   const topCardId = discardPile[discardPile.length - 1];
   const topCard = QUERY_POOL.find((query) => query.id === topCardId);

   let content = (
      <div className='flex items-center w-20 h-27 p-4 rounded-xl text-center text-xs border-dashed border-4 border-zinc-300 bg-zinc-700'>
         Discard Pile
      </div>
   );

   if (topCard) {
      content = (
         <Card
            key={`discard-${topCard.id}`}
            id={topCard.id}
            backgroundColor='bg-zinc-700'
            card={topCard}
            textOnly
         />
      );
   }

   return content;
}
