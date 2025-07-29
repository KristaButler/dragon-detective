import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faArrowsRotate,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../controls/Button';
import useBoundStore from '../../store/store';
import GuessButton from './GuessButton';
import { ConfirmContext } from '../../store/confirm-context';

export default function TurnControls({ isCurrentPlayer, turnType }) {
   const nextPlayer = useBoundStore((state) => state.gameActions.nextPlayer);
   const draw = useBoundStore((state) => state.gameActions.draw);
   const { showConfirm } = useContext(ConfirmContext);

   function handleDiscard() {
      showConfirm(
         'Discard your hand?',
         'Do you want to discard all your cards and draw new ones? This will end your turn.',
         'DISCARD_HAND'
      );
   }

   function handleLeave() {
      showConfirm(
         'Leave the game?',
         'Leave the game and go back to the home screen? Your progress may be lost.',
         'LEAVE_GAME'
      );
   }

   function handleEndTurn() {
      draw('player');
      nextPlayer();
   }

   return (
      <div className='relative mr-8 -top-3'>
         <div className='absolute z-50'>
            <div className='flex flex-col'>
               <Button
                  className={`relative -left-5 ${
                     turnType
                        ? 'border-white animate-pulse pause-animation'
                        : ''
                  }`}
                  shape='round'
                  color='orange'
                  disabled={!isCurrentPlayer || !turnType}
                  title='End your turn.'
                  onClick={handleEndTurn}
               >
                  <FontAwesomeIcon icon={faPlay} />
               </Button>
               <Button
                  className='relative -left-2'
                  shape='round'
                  color='yellow'
                  disabled={!isCurrentPlayer || turnType}
                  title='Discard your hand and draw 4 new cards.'
                  onClick={handleDiscard}
               >
                  <FontAwesomeIcon icon={faArrowsRotate} />
               </Button>
               <GuessButton
                  className='relative -left-6 -top-1'
                  isCurrentPlayer={isCurrentPlayer}
               />
               <Button
                  className='relative -left-15 -top-5'
                  shape='round'
                  color='red'
                  title='Leave the game.'
                  onClick={handleLeave}
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
