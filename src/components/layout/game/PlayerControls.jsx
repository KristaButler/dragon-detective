import useBoundStore from '../../../store/store';
import CardStack from '../../controls/cards/CardStack';
import PlayerAvatar from '../../game/avatar/PlayerAvatar';
import QueryCards from '../../game/QueryCards';
import TurnControls from '../../game/TurnControls';

export default function PlayerControls() {
   const currentPlayer = useBoundStore((state) => state.currentPlayer);
   const avatar = useBoundStore((state) => state.playerAvatar);
   const player = useBoundStore((state) =>
      state.players.find((player) => player.id === 'player')
   );

   const isCurrentPlayer = currentPlayer === 'player';
   const currentPlayerClasses =
      'border-4 border-rose-600 shadow-md shadow-zinc-900';

   return (
      <div className='flex justify-between mt-4 mb-8 w-auto'>
         <PlayerAvatar
            className={`h-24 w-24 ${
               isCurrentPlayer ? currentPlayerClasses : undefined
            }`}
            avatar={avatar}
         />
         <TurnControls isCurrentPlayer={isCurrentPlayer} />
         <QueryCards
            cards={player.hand}
            isCurrentPlayer={isCurrentPlayer}
         />
         <CardStack
            cards={player.eggs}
            right
            title='Click to expand/collapse. Your eggs.'
         />
      </div>
   );
}
