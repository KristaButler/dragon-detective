import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UNKNOWN_PLAYER } from '../../data/player-pool';
import { clueSheetsActions } from '../../store/clue-sheets-slice';

export default function MarkClueModal({ ref, eggId }) {
   const dispatch = useDispatch();
   const players = useSelector((state) => state.players.players);
   const dialog = useRef();

   useImperativeHandle(ref, () => {
      return {
         open: () => {
            dialog.current.showModal();
         },
         close: () => {
            dialog.current.close;
         },
      };
   });

   function handleClick(playerId) {
      const ownerId = playerId !== 'unknown' ? playerId : null;
      dispatch(
         clueSheetsActions.setEggOwner({ playerId: 'player', eggId, ownerId })
      );
   }

   const options = [...players, UNKNOWN_PLAYER];

   return createPortal(
      <dialog
         ref={dialog}
         className='bg-orange-900 text-white p-4 rounded-lg border-none fixed top-1/3 left-1/3 backdrop:bg-slate-800/50'
         onClose={() => dialog.current.close()}
      >
         <form
            method='dialog'
            id='mark-clue-form'
            className='flex flex-col items-end'
         >
            <div
               id='mark-owner-options'
               className='flex flex-wrap items-center gap-4'
            >
               {options.map((player) => (
                  <button
                     key={player.id}
                     className='flex flex-col shrink-0 items-center gap-2 p-2 border-2 border-orange-900 hover:bg-yellow-700 hover:border-orange-500 rounded-lg hover:underline'
                     onClick={() => handleClick(player.id)}
                  >
                     <img
                        src={player.avatar}
                        alt={player.name}
                        className='w-16 h-16 rounded-full'
                     />
                     <div>{player.name}</div>
                  </button>
               ))}
            </div>
            <div
               id='mark-owner-actions'
               className='mt-4 mr-4 hover:font-bold hover:border-b-2'
            >
               <button>Close</button>
            </div>
         </form>
      </dialog>,
      document.getElementById('modal')
   );
}
