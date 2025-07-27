import { OPPONENTS } from '../../../data/player-pool';
import useBoundStore from '../../../store/store';
import Button from '../../controls/Button';
import CardStack from '../../controls/cards/CardStack';
import Matches from '../../game/Matches';
import DiscardPile from '../../game/query/DiscardPile';

export default function GameTable() {
   const globalEggs = useBoundStore((state) => state.globalEggs);
   const message = useBoundStore((state) => state.message);
   const turnParams = useBoundStore((state) => state.turnParams);
   const turnActions = useBoundStore((state) => state.turnActions);
   const opponent = OPPONENTS.find(
      (opponent) => opponent.id === turnParams.opponentId
   );

   const showMatches = turnParams.matches && turnParams.matches.length > 0;
   const showCancel = turnParams.guessing;

   function handleCancelGuess() {
      turnActions.setTurnParams({});
      turnActions.setMessage('');
   }

   return (
      <div className='flex justify-between'>
         <CardStack
            cards={globalEggs}
            title='Click to expand/collapse. Extra eggs, all players can see them.'
         />
         {showMatches && (
            <Matches
               list={turnParams.matches}
               owner={opponent}
            />
         )}
         {message && (
            <div className='flex flex-col justify-center max-w-2/3 pr-4'>
               <p className='self-center bg-orange-900 p-4 rounded shadow-sm'>
                  {message}
               </p>
               {showCancel && (
                  <Button
                     color='green'
                     onClick={handleCancelGuess}
                     className='self-end'
                  >
                     Cancel
                  </Button>
               )}
            </div>
         )}
         <DiscardPile />
      </div>
   );
}
