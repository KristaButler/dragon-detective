import OpponentAvatar from '../avatar/OpponentAvatar';
import { getById } from '../../../utils/utils';

export default function NotList({ list, players }) {
   return (
      <div className='flex flex-wrap items-end justify-between w-full h-full'>
         {list.map((playerId) => {
            const notPlayer = getById(players, playerId);

            return (
               <OpponentAvatar
                  key={notPlayer.id}
                  src={notPlayer.avatar}
                  alt={notPlayer.name}
                  not
                  className='h-4 w-4'
               />
            );
         })}
      </div>
   );
}
