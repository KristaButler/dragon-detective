import QueryCards from '../QueryCards/QueryCards';
import PlayerControls from './PlayerControls';
import TurnControls from './TurnControls';

export default function TurnDisplay() {
   return (
      <div
         id='display-window'
         className='flex justify-between mt-6'
      >
         <PlayerControls />
         <QueryCards />
         <TurnControls />
      </div>
   );
}
