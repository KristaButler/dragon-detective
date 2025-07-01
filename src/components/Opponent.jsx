import { useDroppable } from '@dnd-kit/core';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

export default function Opponent({ id, name, avatar }) {
   const { isOver, setNodeRef } = useDroppable({
      id,
   });
   const currentPlayer = useSelector((state) => state.players.currentPlayer);
   const isCurrentPlayer = currentPlayer === id;

   let imgClasses =
      'w-16 h-16 md:w-32 md:h-32 sm:w-24 sm:h-24 rounded-full mb-2';

   if (isCurrentPlayer) {
      imgClasses += ' border-4 border-rose-600 shadow-lg shadow-slate-900';
   }

   if (isOver) {
      imgClasses += ' border-4 border-lime-600 shadow-lg shadow-slate-900';
   }

   return (
      <div
         id={id}
         className='flex flex-col items-center p-4'
         ref={setNodeRef}
      >
         <img
            src={avatar}
            alt={`${name}'s avatar`}
            className={imgClasses}
         />
         <p className={isCurrentPlayer ? 'font-bold' : 'text-slate-400'}>
            {name}
         </p>
         {isCurrentPlayer && <p className='text-xs'>(taking thier turn)</p>}
      </div>
   );
}
