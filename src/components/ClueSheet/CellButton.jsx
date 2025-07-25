export default function CellButton({ id, className, backgroundBase, owner }) {
   let classes = 'p-2 border-b-1 border-indigo-400 text-center text-black';

   if (className) {
      classes = `${classes} ${className}`;
   }

   let content = '?';
   let background = `bg-${backgroundBase}-300`;

   if (owner === 'player') {
      background = 'bg-zinc-400 text-white';
      content = 'X';
   } else if (owner === 'global') {
      background = 'bg-zinc-500 text-white';
      content = '/';
   } else if (owner) {
      background = `bg-${backgroundBase}-600`;
      content = ''; //TODO: Avatar
   }

   return (
      <div className={`${classes} ${background}`}>
         <button>{content}</button>
      </div>
   );
}
