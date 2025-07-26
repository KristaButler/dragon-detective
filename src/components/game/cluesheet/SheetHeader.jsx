import useBoundStore from '../../../store/store';
import { SPECIES } from '../../../utils/utils';
import Notes from '../../game/Notes';

export default function SheetHeader() {
   const autoNotes = useBoundStore((state) => state.autoNotes);
   const classes =
      'col-span-3 text-center border-b-1 border-t-2 border-l-2 border-r-2 border-indigo-400 p-1 rounded-t-lg';

   return (
      <>
         {
            //Header - species and notes
         }
         <div className='row-span-2 self-end mb-4'>
            {autoNotes && <Notes />}
         </div>
         {SPECIES.map((sp) => {
            return (
               <div
                  key={`cluesheet-${sp.id}-header`}
                  className={`flex gap-2 items-center justify-center ${classes} ${sp.bgDark}`}
               >
                  <div>{sp.title}</div>
                  <img
                     src={sp.icon}
                     alt={`A ${sp.id}`}
                     className='h-4 w-auto'
                  />
               </div>
            );
         })}
      </>
   );
}
