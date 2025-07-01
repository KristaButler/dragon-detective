import { useSelector } from 'react-redux';

export default function TurnControls() {
   const currentPlayer = useSelector((state) => state.players.currentPlayer);
   const isCurrentPlayer = currentPlayer === 'player';

   let endTurnClasses =
      'bg-orange-800 rounded-md md:rounded-full p-1 md:p-2 border-2 border-red-800 hover:bg-orange-600 hover:border-white text-xs sm:text-sm md:text-base';
   let makeGuessClasses =
      'bg-teal-800 rounded-md md:rounded-full p-1 md:p-2 border-2 border-green-800 hover:bg-emerald-600 hover:border-white text-xs sm:text-sm md:text-base';

   if (!isCurrentPlayer) {
      endTurnClasses = makeGuessClasses =
         'bg-slate-800 rounded-full p-1 md:p-2 border-2 border-slate-800 text-slate-400';
   }

   return (
      <div className='flex flex-col gap-2 md:gap-4 justify-center mr-1'>
         <button className={endTurnClasses}>End Turn</button>
         <button className={makeGuessClasses}>Guess</button>
      </div>
   );
}
