import useBoundStore from '../../store/store';
import Button from '../controls/Button';

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
      <div className='flex flex-col justify-center max-w-2/3 pr-4'>
         <p className='self-center bg-orange-900 p-4 rounded shadow-sm'>
            {message}
            {showSeeNotes && ' (see notes)'}
         </p>
         {showOk && (
            <Button
               color='green'
               onClick={handleClickOk}
               className='self-end'
            >
               OK
            </Button>
         )}
         {showCancel && (
            <Button
               color='green'
               onClick={handleCancelGuess}
               className='self-end'
            >
               Cancel
            </Button>
         )}
      </div>
   );
}
