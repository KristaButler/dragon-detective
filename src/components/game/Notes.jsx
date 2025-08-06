import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import useStore from '../../store/store';
import Popup from '../controls/popup/Popup';
import './Notes.css';

export default function Notes() {
   const notes = useStore.use.notes();
   const [isOpen, setIsOpen] = useState(false);

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
               className='notes-popup'
               onClose={handleCloseNotes}
            >
               <div className='notes striped-list'>
                  {notes.map((note, index) => (
                     <div
                        key={`${index}-${note}`}
                        className='note'
                     >
                        {note}
                     </div>
                  ))}
               </div>
            </Popup>
         )}
         <button
            className='notes-button'
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
