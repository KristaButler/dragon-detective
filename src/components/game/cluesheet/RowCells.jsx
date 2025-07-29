import useBoundStore from '../../../store/store';
import { EGG_COLORS, COUNTS, SPECIES, getById } from '../../../utils/utils';
import CellButton from './CellButton';

export default function RowCells({ color, colorIndex }) {
   const cluesheet = useBoundStore((state) => state.cluesheet);

   return SPECIES.map((sp) => {
      return COUNTS.map((ct, ctIndex) => {
         if (!ct) {
            return; //skip first index because it is placeholder
         }

         const clueId = `${color.id}-${sp.id}-${ctIndex}`;
         const clue = getById(cluesheet, clueId);

         let borderClasses = 'border-r-1';

         if (ctIndex === COUNTS.length - 1) {
            borderClasses = 'border-r-2';
         }

         if (ctIndex === 1) {
            borderClasses += ' border-l-2';
         }

         if (colorIndex === EGG_COLORS.length - 1) {
            borderClasses += ' border-b-2';
         }

         return (
            <CellButton
               key={clueId}
               id={clueId}
               clue={clue}
               className={borderClasses}
               species={sp}
            />
         );
      });
   });
}
