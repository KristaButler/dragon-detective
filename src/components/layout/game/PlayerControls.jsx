import useStore from '../../../store/store';
import CardStack from '../../controls/cards/CardStack';
import PlayerAvatar from '../../game/avatar/PlayerAvatar';
import QueryCards from '../../game/query/QueryCards';
import TurnControls from '../../game/turn-controls/TurnControls';
import { getById } from '../../../utils/utils';
import './PlayerControls.css';

export default function PlayerControls() {
   const currentPlayer = useStore.use.currentPlayer();
   const turnType = useStore.use.turnType();
   const players = useStore.use.players();
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
