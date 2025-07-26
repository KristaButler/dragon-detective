import Opponent from '../../game/avatar/Opponent';

export default function Opponents({ players }) {
   return (
      <ul
         id='opponents'
         className='flex flex-row items-center justify-center md:justify-around sm:justify-center mb-4'
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
