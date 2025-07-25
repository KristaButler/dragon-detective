import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { turnsActions } from '../../store/turns-slice';
import { playersActions } from '../../store/players-slice';
import { queryDeckActions } from '../../store/query-deck-slice';
import ConfirmModal from '../ConfirmModal';

export default function TurnControls({ onGuess }) {
   const endTurnModal = useRef();
   const guessModal = useRef();
   const dispatch = useDispatch();
   const currentPlayer = useSelector((state) => state.players.currentPlayer);
   const cardPlayed = useSelector((state) => state.turns.cardPlayed);
   const isGuessing = useSelector((state) => state.turns.isGuessing);

   const isCurrentPlayer = currentPlayer === 'player';

   let endTurnClasses =
      'bg-orange-800 rounded-md md:rounded-full p-1 md:p-2 border-2 border-red-800 hover:bg-orange-600 hover:border-white text-xs sm:text-sm md:text-base';
   let makeGuessClasses =
      'bg-teal-800 rounded-md md:rounded-full p-1 md:p-2 border-2 border-green-800 hover:bg-emerald-600 hover:border-white text-xs sm:text-sm md:text-base';

   if (!isCurrentPlayer || isGuessing) {
      endTurnClasses = makeGuessClasses =
         'bg-slate-800 rounded-full p-1 md:p-2 border-2 border-slate-800 text-slate-400';
   } else if (cardPlayed) {
      endTurnClasses += ' border-4 border-white animate-pulse';
   }

   function handleEndTurn() {
      if (isCurrentPlayer && cardPlayed) {
         dispatch(turnsActions.recordTurn({ playerId: 'player' }));
         dispatch(queryDeckActions.draw('player'));
         dispatch(playersActions.nextPlayer());
      } else {
         endTurnModal.current.open();
      }
   }

   function handleGuess() {
      if (isCurrentPlayer) {
         guessModal.current.open();
      }
   }

   function handleGuessConfirm(confirmed) {
      if (confirmed) {
         onGuess();
      }
   }

   return (
      <>
         <ConfirmModal
            actions='OK'
            ref={endTurnModal}
            id='end-turn-modal'
         >
            <p className='text-lg font-bold'>Cannot End Turn</p>
            <p>
               You must play a card, discard your hand, or make a guess before
               you end your turn.
            </p>
         </ConfirmModal>
         <ConfirmModal
            actions='ConfirmCancel'
            onSelect={handleGuessConfirm}
            ref={guessModal}
            id='handle-guess-modal'
         >
            <p className='text-lg font-bold'>Make a Guess?</p>
            <p>
               If you guess the wrong solution you will lose the game. Proceed
               with caution!
            </p>
         </ConfirmModal>
         <div className='flex flex-col gap-2 md:gap-4 justify-center mr-1'>
            <button
               className={endTurnClasses}
               onClick={handleEndTurn}
            >
               End Turn
            </button>
            <button
               className={makeGuessClasses}
               onClick={handleGuess}
            >
               Guess
            </button>
         </div>
      </>
   );
}
