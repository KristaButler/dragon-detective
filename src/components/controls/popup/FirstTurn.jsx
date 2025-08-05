import {
   faArrowsRotate,
   faMagnifyingGlassArrowRight,
   faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from './Popup';
import Button from '../Button';
import './FirstTurn.css';

export default function FirstTurn({ onClose }) {
   return (
      <div className='center-element'>
         <Popup
            title='It Begins...'
            onClose={onClose}
            mode='dark'
            className='first-turn-popup-container '
         >
            <div className='first-turn-popup'>
               <p>
                  On your turn you can drag and drop a query card on to one of
                  your opponents to ask about their eggs.
               </p>
               <p>
                  When you play a "show" query card your opponent will show you
                  their matching eggs. With a "quantity" query card, they only
                  tell you how many they have.
               </p>
               <p>
                  The relevent results of all turns are recorded in the notes (
                  &nbsp;
                  <FontAwesomeIcon
                     icon={faPenToSquare}
                     size='lg'
                  />
                  &nbsp;) - if enabled.
               </p>
               <p>
                  You can can also discard your hand ( &nbsp;
                  <FontAwesomeIcon
                     icon={faArrowsRotate}
                     size='lg'
                  />
                  &nbsp; ) or make a guess ( &nbsp;
                  <FontAwesomeIcon
                     icon={faMagnifyingGlassArrowRight}
                     size='&nbsp:lg'
                  />{' '}
                  &nbsp; ).
               </p>
               <p>
                  Click on a cell in the clue sheet to mark who does or doesn't
                  have the egg. Your cards, and the left over cards, have
                  already been marked for you - if enabled.
               </p>
               <p>Good luck finding the missing egg!</p>
               <div className='first-turn-buttons'>
                  <Button onClick={onClose}>Let's Go!</Button>
               </div>
            </div>
         </Popup>
      </div>
   );
}
