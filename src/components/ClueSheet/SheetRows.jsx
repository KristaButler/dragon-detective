import { COLORS } from '../../utils/utils';
import { Fragment } from 'react';
import RowCells from './RowCells';

export default function SheetRows() {
   const classes =
      'flex gap-1 place-items-center text-left p-1 border-l-2 border-indigo-400';

   return COLORS.map((color, colorIndex) => {
      let borderClasses = 'border-b-1';

      if (colorIndex === 0) {
         borderClasses += ' border-t-2';
      }

      if (colorIndex === COLORS.length - 1) {
         borderClasses += ' border-b-2';
      }

      return (
         <Fragment key={`${color.id}-sheet-row`}>
            <div
               className={`${classes} ${borderClasses} bg-${color.color}-900`}
            >
               <img
                  src={color.icon}
                  alt={color.title}
                  className='h-4'
               />
               <span className='text-xs hidden sm:block'>{color.title}</span>
            </div>
            <RowCells
               color={color}
               colorIndex={colorIndex}
            />
         </Fragment>
      );
   });
}
