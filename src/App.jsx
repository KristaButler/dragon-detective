import { useEffect, useState } from 'react';
import { startGame } from './util/store-util';
import PlayArea from './components/PlayArea';

function App() {
   //TODO: Loading
   useEffect(() => {
      startGame(3); //TODO: Select Number of players
      //TODO: Don't restart on reload?
   }, []);

   return (
      <>
         <h1 className='text-center mt-4 text-shadow-lg text-shadow-black'>
            Dragon Detective
         </h1>

         <PlayArea />
      </>
   );
}

export default App;
