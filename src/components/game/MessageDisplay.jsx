import useBoundStore from '../../store/store';
import Button from '../controls/Button';
import './MessageDisplay.css';

export default function MessageDisplay({ turnParams, message }) {
   const currentPlayer = useBoundStore((state) => state.currentPlayer);
   const autoNotes = useBoundStore((state) => state.autoNotes);
   const turnActions = useBoundStore((state) => state.turnActions);
   const nextPlayer = useBoundStore((state) => state.gameActions.nextPlayer);

   const isCurrentPlayer = currentPlayer === 'player';
   const showCancel = turnParams.guessing;
   const showOk = !isCurrentPlayer && !autoNotes;
   const showSeeNotes =
      !isCurrentPlayer && autoNotes && message.indexOf('You') === -1;

   function handleCancelGuess() {
      turnActions.setTurnParams({});
      turnActions.setMessage('');
   }

   function handleClickOk() {
      nextPlayer();
   }

   return (
      <div className='message-display'>
         <p>
            {message}
            {showSeeNotes && ' (see notes)'}
         </p>
         {showOk && (
            <Button
               color='green'
               onClick={handleClickOk}
               className='message-button'
            >
               OK
            </Button>
         )}
         {showCancel && (
            <Button
               color='green'
               onClick={handleCancelGuess}
               className='message-button'
            >
               Cancel
            </Button>
         )}
      </div>
   );
}
