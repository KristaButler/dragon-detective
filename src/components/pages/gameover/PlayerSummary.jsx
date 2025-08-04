import CardStack from '../../controls/cards/CardStack';
import OpponentAvatar from '../../game/avatar/OpponentAvatar';

export default function PlayerSummary({ player }) {
   return (
      <div className='player-summary'>
         <div className='flex-centered-columns'>
            <OpponentAvatar
               className='summary-avatar'
               src={player.avatar}
               alt={`${player.name}'s avatar`}
            />
            <div>{player.name}</div>
         </div>
         <CardStack
            cards={player.eggs}
            expand={true}
            disabled={true}
            title={`${player.name}'s Eggs`}
            className='narrow'
         />
      </div>
   );
}
