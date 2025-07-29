import { OPPONENTS } from '../../../data/player-pool';
import useBoundStore from '../../../store/store';
import Button from '../../controls/Button';
import CardStack from '../../controls/cards/CardStack';
import Matches from '../../game/Matches';
import DiscardPile from '../../game/query/DiscardPile';
import { getById } from '../../../utils/utils';
import MessageDisplay from '../../game/MessageDisplay';

export default function GameTable() {
   const globalEggs = useBoundStore((state) => state.globalEggs);
   const message = useBoundStore((state) => state.message);
   const turnParams = useBoundStore((state) => state.turnParams);
   const opponent = getById(OPPONENTS, turnParams.opponentId);

   const showMatches =
      turnParams.matches &&
      turnParams.matches.length > 0 &&
      turnParams.query.type === 'show';

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
            <MessageDisplay
               turnParams={turnParams}
               message={message}
            />
         )}
         <DiscardPile />
      </div>
   );
}
