import { COUNTS, SPECIES } from '../../../utils/utils';
import './SheetSubheader.css';

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

               let borderClasses = 'border-right';

               if (index <= COUNTS.length) {
                  borderClasses = 'border-right-thick';
               }

               if (index === 1) {
                  borderClasses += ' border-left';
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
                     <div className='title'>{ct.title}</div>
                  </div>
               );
            });
         })}
      </>
   );
}
