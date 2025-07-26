import { useDroppable } from '@dnd-kit/core';
import useBoundStore from '../../../store/store';
import OpponentAvatar from './OpponentAvatar';

export default function Opponent({ id, name, avatar }) {
   const currentPlayer = useBoundStore((state) => state.currentPlayer);
   const { isOver, setNodeRef } = useDroppable({
      id,
   });

   const isCurrentPlayer = currentPlayer === id;

   let imgClasses = 'w-24 h-24 rounded-full mb-2';

   if (isCurrentPlayer) {
      imgClasses += ' border-4 border-rose-600 shadow-md shadow-zinc-900';
   }

   if (isOver) {
      imgClasses += ' border-4 border-lime-600 shadow-md shadow-zinc-900';
   }

   return (
      <div
         id={id}
         className='flex flex-col items-center p-4'
         ref={setNodeRef}
      >
         <OpponentAvatar
            src={avatar}
            alt={`${name}'s avatar`}
            className={imgClasses}
         />
         <p className={isCurrentPlayer ? 'font-bold' : 'text-zinc-400'}>
            {name}
         </p>
         {isCurrentPlayer && <p className='text-xs'>(taking thier turn)</p>}
      </div>
   );
}
