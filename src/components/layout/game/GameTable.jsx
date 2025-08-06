import useBoundStore from '../../../store/store';
import CardStack from '../../controls/cards/CardStack';
import Matches from '../../game/Matches';
import DiscardPile from '../../game/query/DiscardPile';
import MessageDisplay from '../../game/MessageDisplay';
import { getById } from '../../../utils/utils';
import { OPPONENTS } from '../../../data/player-pool';

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
      <div className='flex-spaced-container'>
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
