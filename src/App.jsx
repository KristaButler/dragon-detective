import { useEffect } from 'react';
import { startGame } from './util/store-util';
import PlayArea from './components/PlayArea';
import { useSelector } from 'react-redux';

function App() {
   const { gameOver, winner } = useSelector((state) => state.turns);
   const players = useSelector((state) => state.players.players);
   const solution = useSelector((state) => state.eggs.solution);

   //TODO: Loading
   //TODO: Save game state to local storage
   useEffect(() => {
      //TODO: prompt to start new game
      startGame(3); //TODO: Select Number of players
      //TODO: Don't restart on reload?
   }, []);

   function handlePlayAgain() {
      window.location.reload(true); //TODO: Need a better solution
   }

   return (
      <>
         <h1 className='text-center mt-4 text-shadow-lg text-shadow-black'>
            Dragon Detective
         </h1>

         {gameOver && (
            <div
               id='game-over'
               className='flex flex-col flex-grow w-full bg-violet-900 p-4 rounded-lg -mt-6'
            >
               <div className='mt-4'>
                  <p className='text-xl mb-2'>Game Over</p>
                  {winner === 'player' ? (
                     <p>You won the game!</p>
                  ) : (
                     <p>Oh no! You lost.</p>
                  )}
                  <p>The missing card was the {solution.name}</p>
                  <button
                     onClick={handlePlayAgain}
                     className='bg-green-900 p-2 rounded-lg mt-4 hover:border-2 hover:border-slate-300 hover:font-bold'
                  >
                     Play Again
                  </button>
               </div>
            </div>
         )}
         {!gameOver && <PlayArea />}
      </>
   );
}

export default App;
