import useBoundStore from '../../../store/store';
import CardStack from '../../controls/cards/CardStack';
import PlayerAvatar from '../../game/avatar/PlayerAvatar';
import QueryCards from '../../game/query/QueryCards';
import TurnControls from '../../game/TurnControls';

export default function PlayerControls() {
   const currentPlayer = useBoundStore((state) => state.currentPlayer);
   const turnType = useBoundStore((state) => state.turnType);
   const players = useBoundStore((state) => state.players);
   const player = players.find((player) => player.id === 'player');

   const isCurrentPlayer = currentPlayer === 'player';
   const currentPlayerClasses =
      'border-4 border-rose-600 shadow-md shadow-zinc-900';

   return (
      <div className='flex justify-between mt-4 mb-8 w-auto relative'>
         <PlayerAvatar
            className={`h-24 w-24 ${
               isCurrentPlayer ? currentPlayerClasses : undefined
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
