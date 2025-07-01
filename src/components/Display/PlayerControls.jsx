import { useSelector } from 'react-redux';

export default function PlayerControls() {
   const currentPlayer = useSelector((state) => state.players.currentPlayer);
   const isCurrentPlayer = currentPlayer === 'player';

   const buttonClasses =
      'flex flex-col justify-center bg-orange-600 h-8 w-8 rounded-full hover:bg-amber-600 hover:border-2';
   let imgClasses =
      'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 rounded-full my-2';

   if (isCurrentPlayer) {
      imgClasses += ' bg-teal-300 border-rose-600 shadow-lg shadow-slate-900';
   } else {
      imgClasses += ' bg-teal-600 border-transparent';
   }

   return (
      <div className='flex flex-col'>
         <div
            id='player-controls'
            className='flex'
         >
            <div
               id='player-avatar'
               className='flex flex-col items-center'
            >
               <img
                  src='/images/avatars/avatar-player.png'
                  alt='Player Avatar'
                  className={imgClasses}
               />
            </div>
            <div
               id='player-actions'
               className='flex flex-col justify-center gap-2'
            >
               <button
                  title='View Your Eggs'
                  className={`${buttonClasses} ml-2 sm:-ml-1`}
               >
                  <i className='fa-solid fa-egg'></i>
               </button>
               <button
                  title='Discard and draw new queries.'
                  className={`${buttonClasses} ml-2 sm:ml-2`}
               >
                  <i className='fa-solid fa-arrows-rotate'></i>
               </button>
               <button
                  title='Settings'
                  className={`${buttonClasses} ml-2 sm:-ml-2`}
               >
                  <i className='fa-solid fa-gear'></i>
               </button>
            </div>
         </div>
         {isCurrentPlayer ? (
            <p className='font-bold'>Your Turn</p>
         ) : (
            <p>&nbsp;</p>
         )}
      </div>
   );
}
