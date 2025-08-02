import OpponentAvatar from '../avatar/OpponentAvatar';
import { getById } from '../../../utils/utils';
import './NotList.css';

export default function NotList({ list, players }) {
   return (
      <div className='not-owner-list'>
         {list.map((playerId) => {
            const notPlayer = getById(players, playerId);

            return (
               <OpponentAvatar
                  key={notPlayer.id}
                  src={notPlayer.avatar}
                  alt={notPlayer.name}
                  not
                  className='not-owner-list-avatar'
               />
            );
         })}
      </div>
   );
}
