import useStore from '../../../store/store';
import Notes from '../../game/Notes';
import { SPECIES } from '../../../utils/utils';

export default function SheetHeader() {
   const autoNotes = useStore.use.autoNotes();
   const winner = useStore.use.winner();

   const showNotes = autoNotes && !winner;

   return (
      <>
         {
            //Header - species and notes
         }
         <div className='cluesheet-notes'>{showNotes && <Notes />}</div>
         {SPECIES.map((sp) => {
            return (
               <div
                  key={`cluesheet-${sp.id}-header`}
                  className={`cluesheet-header-cell background-${sp.id}`}
               >
                  <div>{sp.title}</div>
                  <img
                     src={sp.icon}
                     alt={`A ${sp.id}`}
                  />
               </div>
            );
         })}
      </>
   );
}
