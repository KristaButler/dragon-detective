import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useBoundStore from '../../store/store';

export default function Notes() {
   const notes = useBoundStore((state) => state.game.notes);
   const [isOpen, setIsOpen] = useState(false);

   const notesClasses =
      'absolute -top-60 z-100 bg-white text-black p-2 rounded-lg';
   const buttonClasses =
      'p-2 border-2 border-transparent hover:border-white hover:cursor-pointer';

   function handleCloseNotes() {
      setIsOpen(false);
   }

   function handleToggleOpen() {
      setIsOpen((prevIsOpen) => !prevIsOpen);
   }

   return (
      <div>
         {isOpen && (
            <div className={`${notesClasses} text-left`}>
               <div className='flex justify-between items-center mt-1 border-b-2 border-zinc-900 pb-1'>
                  <div className='mx-2'>Notes: </div>
                  <FontAwesomeIcon
                     icon={faSquareXmark}
                     size='lg'
                     className='text-red-800 pr-2 hover:cursor-pointer'
                     onClick={handleCloseNotes}
                  />
               </div>
               <div className='overflow-auto h-48 w-56'>{notes}</div>
            </div>
         )}
         <button
            className={buttonClasses}
            title='Open Notes'
            onClick={handleToggleOpen}
         >
            <FontAwesomeIcon
               icon={faPenToSquare}
               size='lg'
            />
         </button>
      </div>
   );
}
