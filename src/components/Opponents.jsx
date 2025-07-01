import { useSelector } from 'react-redux';
import Opponent from './Opponent';

export default function Opponents() {
   const players = useSelector((state) => state.players.players);

   return (
      <ul
         id='opponents'
         className='flex flex-row items-center justify-center md:justify-around sm:justify-center mb-4'
      >
         {players.map((player) => {
            if (player.id === 'player') return null; // Skip the human player
            return (
               <li key={player.id}>
                  <Opponent {...player} />
               </li>
            );
         })}
      </ul>
   );
}
