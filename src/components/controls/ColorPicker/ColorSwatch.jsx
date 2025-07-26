export default function ColorSwatch({ title, color, selectColor, selected }) {
   let classes = 'w-8 h-8 rounded hover:border-4';

   if (selected) {
      classes += ' border-4 hover:border-zinc-400';
   }

   return (
      <li
         className={classes}
         style={{ backgroundColor: color }}
         title={title}
         onClick={() => selectColor(color)}
      ></li>
   );
}
