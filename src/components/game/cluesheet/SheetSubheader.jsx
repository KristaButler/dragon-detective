import { COUNTS, SPECIES } from '../../../utils/utils';

export default function SheetSubheader() {
   const classes =
      'flex flex-col justify-center items-center border-indigo-400 p-2 border-b-1';

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

               let borderClasses = 'border-r-1';

               if (index <= COUNTS.length) {
                  borderClasses = 'border-r-2';
               }

               if (index === 1) {
                  borderClasses += ' border-l-2';
               }

               return (
                  <div
                     key={`subheader-${sp.id}-${index}`}
                     className={`${classes} ${borderClasses} ${sp.bgDark}`}
                  >
                     <img
                        className='h-4 mx-auto'
                        src={`/images/symbols/${sp.id}-${ct.id}.png`}
                        alt={`${sp.title} ${ct.title}`}
                     />
                     <div className='text-xs'>{ct.title}</div>
                  </div>
               );
            });
         })}
      </>
   );
}
