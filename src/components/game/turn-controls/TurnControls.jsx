import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faPlay,
   faArrowsRotate,
   faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../controls/Button';
import useBoundStore from '../../../store/store';
import GuessButton from './GuessButton';
import { ConfirmContext } from '../../../store/confirm-context';
import './TurnControls.css';

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

   const endTurnClasses = `end-turn-button ${
      turnType ? 'turn-over animate-pulse pause-animation' : ''
   }`;

   return (
      <div className='turn-controls-outer'>
         <div className='turn-controls-inner'>
            <div className='turn-controls'>
               <Button
                  className={endTurnClasses}
                  shape='round'
                  color='orange'
                  disabled={!isCurrentPlayer || !turnType}
                  title='End your turn.'
                  onClick={handleEndTurn}
               >
                  <FontAwesomeIcon icon={faPlay} />
               </Button>
               <Button
                  className='discard-hand-button'
                  shape='round'
                  color='yellow'
                  disabled={!isCurrentPlayer || turnType}
                  title='Discard your hand and draw 4 new cards.'
                  onClick={handleDiscard}
               >
                  <FontAwesomeIcon icon={faArrowsRotate} />
               </Button>
               <GuessButton
                  className='guess-button'
                  isCurrentPlayer={isCurrentPlayer}
               />
               <Button
                  className='leave-button'
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
