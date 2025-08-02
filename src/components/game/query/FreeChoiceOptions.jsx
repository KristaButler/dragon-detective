export default function FreeChoiceOptions({
   list,
   type,
   onSelect,
   useIndex = false,
}) {
   return (
      <div className='flex-wrapped-container'>
         {list.map((item, index) => {
            if (!item) return;
            const value = useIndex ? index : item.id;

            return (
               <div
                  key={`free-choice-${item.id}`}
                  className={`option background-${item.id}`}
                  onClick={() => onSelect({ type, value })}
               >
                  <div>{item.title}</div>
                  <div className='options-img-container'>
                     <img
                        src={item.icon}
                        alt={item.title}
                     />
                  </div>
               </div>
            );
         })}
      </div>
   );
}
