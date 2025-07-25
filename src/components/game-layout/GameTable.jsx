import useBoundStore from '../../store/store';
import CardStack from '../cards/CardStack';
import QueryDeck from '../game/QueryDeck';

export default function GameTable() {
   const globalEggs = useBoundStore((state) => state.game.globalEggs);
   const message = useBoundStore((state) => state.turn.message);

   return (
      <div className='flex justify-between'>
         <CardStack
            cards={globalEggs}
            title='Click to expand/collapse. Extra eggs, all players can see them.'
         />
         {message && (
            <p className='self-center bg-orange-900 p-4 rounded-lg shadow-sm'>
               {message}
            </p>
         )}
         <QueryDeck />
      </div>
   );
}
