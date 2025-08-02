import useBoundStore from '../../../store/store';
import { SPECIES } from '../../../utils/utils';
import Notes from '../../game/Notes';
import './SheetHeader.css';

export default function SheetHeader() {
   const autoNotes = useBoundStore((state) => state.autoNotes);
   return (
      <>
         {
            //Header - species and notes
         }
         <div className='cluesheet-notes'>{autoNotes && <Notes />}</div>
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
