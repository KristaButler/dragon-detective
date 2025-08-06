import { Fragment } from 'react';
import RowCells from './RowCells';
import { EGG_COLORS } from '../../../utils/utils';

export default function SheetRows() {
   return EGG_COLORS.map((color, colorIndex) => {
      let borderClasses = 'cell-border-bottom';

      if (colorIndex === 0) {
         borderClasses += ' cell-border-top';
      }

      if (colorIndex === EGG_COLORS.length - 1) {
         borderClasses += ' cell-border-bottom-thick';
      }

      const classes = `color-row-cell ${borderClasses} background-${color.id}`;

      return (
         <Fragment key={`${color.id}-sheet-row`}>
            <div className={classes}>
               <img
                  src={color.icon}
                  alt={color.title}
               />
               <span className='cell-title'>{color.title}</span>
            </div>
            <RowCells
               color={color}
               colorIndex={colorIndex}
            />
         </Fragment>
      );
   });
}
