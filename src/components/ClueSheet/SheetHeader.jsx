export default function SheetHeader() {
   const classes =
      'col-span-3 text-center border-b-1 border-t-2 border-l-2 border-r-2 border-indigo-400 p-2 rounded-t-lg';

   return (
      <>
         {
            //Empty cell for alignment
         }
         <div className='row-span-2'>&nbsp;</div>
         <div className={`${classes} bg-violet-900`}>Dragons</div>
         <div className={`${classes} bg-purple-900`}>Wyverns</div>
         <div className={`${classes} bg-fuchsia-900`}>Hydra</div>
      </>
   );
}
