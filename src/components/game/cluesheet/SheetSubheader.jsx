import { COUNTS, SPECIES } from '../../../utils/utils';

export default function SheetSubheader() {
   return (
      <>
         {
            //Subheader - egg counts
         }
         {SPECIES.map((sp) => {
            return COUNTS.map((ct, index) => {
               if (!ct) {
                  return; //skip first index because it is placeholder
               }

               let borderClasses = 'cell-border-right';

               if (index <= COUNTS.length) {
                  borderClasses = 'cell-border-right-thick';
               }

               if (index === 1) {
                  borderClasses += ' cell-border-left';
               }

               return (
                  <div
                     key={`subheader-${sp.id}-${index}`}
                     className={`cluesheet-sub-header ${borderClasses} background-${sp.id}`}
                  >
                     <img
                        src={`/images/symbols/${sp.id}-${ct.id}.png`}
                        alt={`${sp.title} ${ct.title}`}
                     />
                     <div className='cell-title'>{ct.title}</div>
                  </div>
               );
            });
         })}
      </>
   );
}
