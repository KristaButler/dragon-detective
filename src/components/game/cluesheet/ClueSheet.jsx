import useBoundStore from '../../../store/store';
import SheetHeader from './SheetHeader';
import SheetRows from './SheetRows';
import SheetSubheader from './SheetSubheader';
import MarkClue from './MarkClue';

export default function ClueSheet() {
   const cluesheet = useBoundStore((state) => state.cluesheet);
   const selectedClue = useBoundStore((state) => state.selectedClue);
   const setSelectedClue = useBoundStore(
      (state) => state.cluesheetActions.setSelectedClue
   );
   const autoMarkPlayerEggs = useBoundStore(
      (state) => state.autoMarkPlayerEggs
   );

   let clue = cluesheet.find((clue) => clue.id === selectedClue);

   //If the cluesheet doesn't have a clue for this egg yet, make a dummy clue
   if (!clue && selectedClue) {
      clue = { id: selectedClue, owner: null, not: [] };
   }

   function handleClose() {
      setSelectedClue(null);
   }

   return (
      <div className='grid grid-cols-[1.2fr_repeat(9,1fr)] text-center p-2 mt-1 relative'>
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
