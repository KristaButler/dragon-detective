import useStore from '../../../store/store';
import CellButton from './CellButton';
import { EGG_COLORS, COUNTS, SPECIES, getById } from '../../../utils/utils';

export default function RowCells({ color, colorIndex }) {
   const cluesheet = useStore.use.cluesheet();

   return SPECIES.map((sp) => {
      return COUNTS.map((ct, ctIndex) => {
         if (!ct) {
            return; //skip first index because it is placeholder
         }

         const clueId = `${color.id}-${sp.id}-${ctIndex}`;
         const clue = getById(cluesheet, clueId);

         let borderClasses = 'cell-border-right';

         if (ctIndex === COUNTS.length - 1) {
            borderClasses = 'cell-border-right-thick';
         }

         if (ctIndex === 1) {
            borderClasses += ' cell-border-left';
         }

         if (colorIndex === EGG_COLORS.length - 1) {
            borderClasses += ' cell-border-bottom';
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
