import useBoundStore from '../../store/store';
import { COLORS, COUNTS, SPECIES } from '../../utils/utils';
import CellButton from './CellButton';

export default function RowCells({ color, colorIndex }) {
   const clues = useBoundStore(
      (state) =>
         state.game.players.find((player) => player.id === 'player').clues
   );

   return SPECIES.map((sp) => {
      return COUNTS.map((ct, ctIndex) => {
         if (!ct) {
            return; //skip first index because it is placeholder
         }

         const clueId = `${color.id}-${sp.id}-${ctIndex}`;
         const clue = clues.find((clue) => clue.eggId === clueId);

         let owner = null;

         if (clue) {
            owner = clue.owner;
         }

         let borderClasses = 'border-r-1';

         if (ctIndex === COUNTS.length - 1) {
            borderClasses = 'border-r-2';
         }

         if (ctIndex === 1) {
            borderClasses += ' border-l-2';
         }

         if (colorIndex === COLORS.length - 1) {
            borderClasses += ' border-b-2';
         }

         return (
            <CellButton
               key={clueId}
               id={clueId}
               owner={owner}
               className={borderClasses}
               backgroundBase={sp.color}
            />
         );
      });
   });
}
