import useBoundStore from '../../../store/store';
import SheetHeader from './SheetHeader';
import SheetRows from './SheetRows';
import SheetSubheader from './SheetSubheader';
import MarkClue from './MarkClue';
import { getById } from '../../../utils/utils';
import './ClueSheet.css';

export default function ClueSheet() {
   const cluesheet = useBoundStore((state) => state.cluesheet);
   const selectedClue = useBoundStore((state) => state.selectedClue);
   const setSelectedClue = useBoundStore(
      (state) => state.cluesheetActions.setSelectedClue
   );
   const autoMarkPlayerEggs = useBoundStore(
      (state) => state.autoMarkPlayerEggs
   );

   let clue = getById(cluesheet, selectedClue);

   //If the cluesheet doesn't have a clue for this egg yet, make a dummy clue
   if (!clue && selectedClue) {
      clue = { id: selectedClue, owner: null, not: [] };
   }

   function handleClose() {
      setSelectedClue(null);
   }

   return (
      <div className='cluesheet'>
         <SheetHeader />
         <SheetSubheader />
         <SheetRows />
         {selectedClue && (
            <MarkClue
               clue={clue}
               includePlayer={!autoMarkPlayerEggs}
               onClose={handleClose}
            />
         )}
      </div>
   );
}
