import { Fragment } from 'react';
import { EGG_COLORS } from '../../../utils/utils';
import RowCells from './RowCells';
import './SheetRows.css';

export default function SheetRows() {
   return EGG_COLORS.map((color, colorIndex) => {
      let borderClasses = 'border-bottom';

      if (colorIndex === 0) {
         borderClasses += ' border-top';
      }

      if (colorIndex === EGG_COLORS.length - 1) {
         borderClasses += ' border-bottom-thick';
      }

      const classes = `color-row-cell ${borderClasses} background-${color.id}`;

      return (
         <Fragment key={`${color.id}-sheet-row`}>
            <div className={classes}>
               <img
                  src={color.icon}
                  alt={color.title}
               />
               <span className='title'>{color.title}</span>
            </div>
            <RowCells
               color={color}
               colorIndex={colorIndex}
            />
         </Fragment>
      );
   });
}
