import useBoundStore from '../../../store/store';
import CardStack from '../../controls/cards/CardStack';
import PlayerAvatar from '../../game/avatar/PlayerAvatar';
import QueryCards from '../../game/query/QueryCards';
import TurnControls from '../../game/TurnControls';
import { getById } from '../../../utils/utils';
import './PlayerControls.css';

export default function PlayerControls() {
   const currentPlayer = useBoundStore((state) => state.currentPlayer);
   const turnType = useBoundStore((state) => state.turnType);
   const players = useBoundStore((state) => state.players);
   const player = getById(players, 'player');

   const isCurrentPlayer = currentPlayer === 'player';

   return (
      <div className='player-controls'>
         <PlayerAvatar
            className={`player-controls-avatar ${
               isCurrentPlayer ? 'current-player' : ''
            }`}
         />
         <TurnControls
            isCurrentPlayer={isCurrentPlayer}
            turnType={turnType}
         />
         <QueryCards
            cards={player.hand}
            enabled={isCurrentPlayer && !turnType}
         />
         <CardStack
            cards={player.eggs}
            right
            title='Click to expand/collapse. Your eggs.'
         />
      </div>
   );
}
