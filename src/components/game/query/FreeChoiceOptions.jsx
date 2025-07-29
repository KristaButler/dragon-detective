export default function FreeChoiceOptions({
   list,
   type,
   onSelect,
   useIndex = false,
}) {
   const classes =
      'flex flex-col items-center shrink-0 p-2 rounded border-2 border-zinc-400 hover:border-zinc-900 text-white';
   const imgClasses = 'h-12';

   return (
      <div className='flex flex-wrap gap-2 p-2'>
         {list.map((item, index) => {
            if (!item) return;
            const value = useIndex ? index : item.id;

            return (
               <div
                  key={`free-choice-${item.id}`}
                  className={`${classes} ${item.bg}`}
                  onClick={() => onSelect({ type, value })}
               >
                  <div>{item.title}</div>
                  <div className='relative'>
                     <img
                        src={item.icon}
                        alt={item.title}
                        className={imgClasses}
                     />
                  </div>
               </div>
            );
         })}
      </div>
   );
}
