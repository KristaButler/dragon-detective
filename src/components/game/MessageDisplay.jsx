import useStore from '../../store/store';
import Button from '../controls/Button';
import './MessageDisplay.css';

export default function MessageDisplay({ turnParams, message }) {
   const currentPlayer = useStore.use.currentPlayer();
   const autoNotes = useStore.use.autoNotes();
   const turnActions = useStore.use.turnActions();
   const nextPlayer = useStore.use.gameActions().nextPlayer;

   const isCurrentPlayer = currentPlayer === 'player';
   const showCancel = turnParams.guessing;
   const showOk = !isCurrentPlayer && !autoNotes;

   function handleCancelGuess() {
      turnActions.setTurnParams({});
      turnActions.setMessage('');
   }

   function handleClickOk() {
      nextPlayer();
   }

   return (
      <div className='message-display'>
         <p>{message}</p>
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
