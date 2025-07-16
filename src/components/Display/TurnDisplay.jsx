import { useDispatch, useSelector } from 'react-redux';

import QueryCards from '../QueryCards/QueryCards';
import PlayerControls from './PlayerControls';
import TurnControls from './TurnControls';
import { turnsActions } from '../../store/turns-slice';

export default function TurnDisplay() {
   const { isGuessing, guess } = useSelector((state) => state.turns);
   const solution = useSelector((state) => state.eggs.solution);
   const dispatch = useDispatch();

   function clickGuessHandler() {
      dispatch(turnsActions.setIsGuessing(true));
   }

   function cancelGuessHandler() {
      dispatch(turnsActions.setIsGuessing(false));
      dispatch(turnsActions.setGuess(null));
   }

   function makeGuessHandler() {
      let result = false;
      let winner = '';

      if (guess === solution.id) {
         result = true;
         winner = 'player';
      }

      dispatch(turnsActions.recordGuess({ playerId: 'player', guess, result }));
      dispatch(turnsActions.endGame(winner));
   }

   return (
      <>
         <div
            id='display-window'
            className='flex justify-between mt-6'
         >
            <PlayerControls />
            <QueryCards />
            <TurnControls onGuess={clickGuessHandler} />
         </div>
         <div className='flex justify-center'>
            {isGuessing && (
               <p
                  className='flex items-center justify-center gap-4 p-4 mt-4 text-white bg-orange-900 rounded-lg w-1/2
               '
               >
                  Select a card below to make a guess.{' '}
                  <button
                     className='hover:font-bold hover:border-b-2'
                     onClick={cancelGuessHandler}
                  >
                     Cancel
                  </button>
                  <button
                     className='hover:font-bold hover:border-4 border-1 border-slate-300 rounded-lg p-2 bg-green-800'
                     onClick={makeGuessHandler}
                  >
                     Guess
                  </button>
               </p>
            )}
         </div>
      </>
   );
}
