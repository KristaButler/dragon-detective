import useStore from '../../../store/store';
import SheetHeader from './SheetHeader';
import SheetRows from './SheetRows';
import SheetSubheader from './SheetSubheader';
import MarkClue from './MarkClue';
import { getById } from '../../../utils/utils';
import './ClueSheet.css';

export default function ClueSheet() {
   const cluesheet = useStore.use.cluesheet();
   const selectedClue = useStore.use.selectedClue();
   const setSelectedClue = useStore.use.cluesheetActions().setSelectedClue;
   const autoMarkPlayerEggs = useStore.use.autoMarkPlayerEggs();

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
