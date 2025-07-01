import { useRef } from 'react';
import MarkClueModal from './MarkClueModal';
import { useSelector } from 'react-redux';

export default function CellButton({ eggId, owner, className }) {
   const modal = useRef();
   const players = useSelector((state) => state.players.players);
   let isDisabled = false;

   function handleClick() {
      modal.current.open();
   }

   let content = '?';
   let classes = className;

   if (owner) {
      if (owner === 'player') {
         content = '/';
         classes = `${className} bg-slate-400 text-white`;
      } else if (owner === 'excess') {
         content = 'X';
         classes = `${className} bg-slate-500 text-white`;
         isDisabled = true;
      } else if (owner.length > 0) {
         const player = players.find((player) => player.id === owner);
         classes = `${className} bg-slate-300`;

         content = (
            <img
               src={player.avatar}
               alt={player.name}
               className='w-8 h-8 rounded-full cursor-pointer'
            />
         );
      }
   }

   return (
      <>
         <MarkClueModal
            ref={modal}
            eggId={eggId}
         />
         <div className={classes}>
            <button
               className='w-8 h-8 cursor-pointer'
               onClick={handleClick}
               disabled={isDisabled}
            >
               {content}
            </button>
         </div>
      </>
   );
}
