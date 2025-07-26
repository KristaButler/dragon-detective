import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faMagnifyingGlassArrowRight,
   faArrowsRotate,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../controls/Button';

export default function TurnControls({ isCurrentPlayer }) {
   return (
      <div className='relative mr-8 -top-3'>
         <div className='absolute z-50'>
            <div className='flex flex-col'>
               <Button
                  className='relative -left-5'
                  shape='round'
                  color='orange'
                  disabled={!isCurrentPlayer}
                  title='End your turn.'
               >
                  <FontAwesomeIcon icon={faPlay} />
               </Button>
               <Button
                  className='relative -left-2'
                  shape='round'
                  color='yellow'
                  disabled={!isCurrentPlayer}
                  title='Discard your hand and draw 4 new cards.'
               >
                  <FontAwesomeIcon icon={faArrowsRotate} />
               </Button>
               <Button
                  className='relative -left-6 -top-1'
                  shape='round'
                  color='green'
                  disabled={!isCurrentPlayer}
                  title='Make a guess.'
               >
                  <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} />
               </Button>
               <Button
                  className='relative -left-15 -top-5'
                  shape='round'
                  color='red'
                  title='Leave the game.'
               >
                  <FontAwesomeIcon
                     icon={faArrowLeft}
                     size='xs'
                  />
               </Button>
            </div>
         </div>
      </div>
   );
}
