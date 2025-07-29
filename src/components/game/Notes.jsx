import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useBoundStore from '../../store/store';
import Popup from '../controls/popup/Popup';

export default function Notes() {
   const notes = useBoundStore((state) => state.notes);
   const [isOpen, setIsOpen] = useState(false);

   const notesClasses = '-top-60 text-left';
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
            <Popup
               title='Notes: '
               className={notesClasses}
               onClose={handleCloseNotes}
            >
               <div className='overflow-auto h-48 w-56 striped-list p-2'>
                  {notes.map((note, index) => (
                     <div
                        key={`${index}-${note}`}
                        className='p-2'
                     >
                        {note}
                     </div>
                  ))}
               </div>
            </Popup>
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
