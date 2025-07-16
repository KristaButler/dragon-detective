import { useRef } from 'react';
import MarkClueModal from './MarkClueModal';
import { useDispatch, useSelector } from 'react-redux';
import { turnsActions } from '../../store/turns-slice';

export default function CellButton({ eggId, owner, className }) {
   //TODO: every cell has a modal - fix this so that it only creates one modal and reuses it
   const modal = useRef();
   const players = useSelector((state) => state.players.players);
   const { isGuessing, guess } = useSelector((state) => state.turns);
   const dispatch = useDispatch();

   let isDisabled = false;

   function handleClick() {
      if (isGuessing) {
         handleMarkGuess();
      } else {
         handleMarkClue();
      }
   }

   function handleMarkClue() {
      modal.current.open();
   }

   function handleMarkGuess() {
      dispatch(turnsActions.setGuess(eggId));
   }

   let content = '?';
   let classes = className;

   if (owner) {
      if (owner === 'player') {
         content = 'X';
         classes = `${className} bg-slate-400 text-white`;
         isDisabled = true;
      } else if (owner === 'excess') {
         content = '';
         classes = `${className} bg-slate-500 text-white`;
         isDisabled = true;
      } else if (owner.length > 0) {
         if (isGuessing) {
            isDisabled = true;
         }

         const player = players.find((player) => player.id === owner);
         classes = `${className} bg-slate-300`;

         content = (
            <img
               src={player.avatar}
               alt={player.name}
               className='w-8 h-8 rounded-full cursor-pointer'
            />
         );
      }
   }

   if (isGuessing && guess === eggId) {
      content = (
         <div className='h-full w-full bg-green-600 text-white border-4 border-green-600 rounded-full font-bold'>
            ?
         </div>
      );
   }

   return (
      <>
         {!isDisabled && (
            <MarkClueModal
               ref={modal}
               eggId={eggId}
            />
         )}
         <div className={classes}>
            <button
               className='w-8 h-8 cursor-pointer'
               onClick={handleClick}
               disabled={isDisabled}
            >
               {content}
            </button>
         </div>
      </>
   );
}
