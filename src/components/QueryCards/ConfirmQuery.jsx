import { filterQueryChoices } from '../../util/query-deck-util';
import FreeChoiceButton from './FreeChoiceButton';

export default function ConfirmQuery({ title, message, queryCard, onSelect }) {
   let freeChoiceOptions = [];

   if (queryCard.freeChoice) {
      freeChoiceOptions = filterQueryChoices(queryCard);
   }

   function handleChooseFreeChoice(type, value) {
      onSelect(true, { type, value });
   }

   return (
      <>
         {title && <p className='text-xl font-bold'>{title}</p>}
         {message && <p>{message}</p>}
         <form method='dialog'>
            <div className='grid grid-cols-4 mt-2'>
               {queryCard.freeChoice &&
                  freeChoiceOptions.map((choice) => {
                     return (
                        <FreeChoiceButton
                           key={`choice-option-${choice.value}`}
                           choice={choice}
                           onClick={handleChooseFreeChoice}
                        />
                     );
                  })}
            </div>
            <div className='flex justify-end'>
               {!queryCard.freeChoice && (
                  <button
                     onClick={() => onSelect(true, null)}
                     className='mt-4 mr-4 hover:font-bold hover:border-b-2'
                  >
                     Confirm
                  </button>
               )}
               <button
                  onClick={() => onSelect(false, null)}
                  className='mt-4 mr-4 hover:font-bold hover:border-b-2'
               >
                  Cancel
               </button>
            </div>
         </form>
      </>
   );
}
