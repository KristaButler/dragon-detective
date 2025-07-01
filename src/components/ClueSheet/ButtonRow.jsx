import CellButton from './CellButton';

export default function ButtonRow({ color, species, owners }) {
   const classes =
      'p-2 border-b-1 border-indigo-400 text-center bg-slate-200 text-black';

   if (!owners) {
      owners = [null, null, null];
   }

   return (
      <>
         <CellButton
            eggId={`${color}-${species}-1`}
            owner={owners[0]}
            className={`${classes} border-1-2 border-l-1`}
         />
         <CellButton
            eggId={`${color}-${species}-2`}
            owner={owners[1]}
            className={`${classes} border-r-1 border-l-1`}
         />
         <CellButton
            eggId={`${color}-${species}-3`}
            owner={owners[2]}
            className={`${classes} border-r-2`}
         />
      </>
   );
}
