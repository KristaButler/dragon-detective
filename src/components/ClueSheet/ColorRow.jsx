import ButtonRow from './ButtonRow';

export default function ColorRow({ color, title, className, owners }) {
   let classes =
      'flex gap-1 place-items-center text-left p-2 border-l-2 border-indigo-400';

   if (className) {
      classes = `${classes} ${className}`;
   }

   if (!owners) {
      owners = [null, null, null];
   }

   return (
      <>
         <div className={classes}>
            <img
               src={`/images/${color}-symbol.png`}
               alt={color}
               className='h-5'
            />
            <span className='hidden sm:block'>{title}</span>
         </div>
         <ButtonRow
            color={color}
            species='dragon'
            owners={owners[0]}
         />
         <ButtonRow
            color={color}
            species='wyvern'
            owners={owners[1]}
         />
         <ButtonRow
            color={color}
            species='hydra'
            owners={owners[2]}
         />
      </>
   );
}
