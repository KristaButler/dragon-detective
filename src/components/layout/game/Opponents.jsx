import useBoundStore from '../../../store/store';
import Opponent from '../../game/Opponent';
import './Opponents.css';

export default function Opponents() {
   const players = useBoundStore((state) => state.players);

   return (
      <ul
         id='opponents'
         className='opponents-list'
      >
         {players.map((player) => {
            if (player.id === 'player') return null; // Skip the human player
            return (
               <li key={player.id}>
                  <Opponent
                     id={player.id}
                     name={player.name}
                     avatar={player.avatar}
                  />
               </li>
            );
         })}
      </ul>
   );
}
