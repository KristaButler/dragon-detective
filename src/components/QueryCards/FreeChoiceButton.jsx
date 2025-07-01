export default function FreeChoiceButton({ choice, onClick }) {
   let classes =
      'flex flex-col shrink-0 items-center gap-2 p-2 border-2 border-orange-900 hover:bg-yellow-700 hover:border-orange-500 rounded-lg hover:underline border-2 border-white m-2';

   if (choice.type === 'color') {
      if (choice.value === 'blue') {
         classes += ' bg-indigo-900';
      } else if (choice.value === 'green') {
         classes += ' bg-emerald-900';
      } else {
         classes = `${classes} bg-${choice.value}-900`;
      }
   }

   return (
      <button
         onClick={() => onClick(choice.type, choice.value)}
         className={classes}
      >
         <img
            src={choice.img}
            alt={choice.title}
            className='h-16'
         />
         <div>{choice.title}</div>
      </button>
   );
}
