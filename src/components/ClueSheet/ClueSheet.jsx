import SheetHeader from './SheetHeader';
import SheetRows from './SheetRows';
import SheetSubheader from './SheetSubheader';

export default function ClueSheet() {
   return (
      <div className='grid grid-cols-10 text-center p-2 mt-1 relative'>
         <SheetHeader />
         <SheetSubheader />
         <SheetRows />
      </div>
   );
}
