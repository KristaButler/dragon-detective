import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faMagnifyingGlassArrowRight,
   faArrowsRotate,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../controls/Button';

export default function TurnControls({ isCurrentPlayer }) {
   const disabledColor = 'zinc-700';

   return (
      <div className='relative mr-8 -top-3'>
         <div className='absolute z-50'>
            <div className='flex flex-col'>
               <Button
                  className='relative -left-5'
                  round
                  customColor={isCurrentPlayer ? 'orange-700' : disabledColor}
                  title='End your turn.'
               >
                  <FontAwesomeIcon icon={faPlay} />
               </Button>
               <Button
                  className='relative -left-2'
                  round
                  customColor={isCurrentPlayer ? 'yellow-700' : disabledColor}
                  title='Discard your hand and draw 4 new cards.'
               >
                  <FontAwesomeIcon icon={faArrowsRotate} />
               </Button>
               <Button
                  className='relative -left-6 -top-1'
                  round
                  customColor={isCurrentPlayer ? 'emerald-700' : disabledColor}
                  title='Make a guess.'
               >
                  <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} />
               </Button>
               <Button
                  className='relative -left-15 -top-5'
                  round
                  customColor='red-900'
                  size='small'
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
