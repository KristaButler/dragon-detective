export default function ColorSwatch({ title, color, selectColor, selected }) {
   return (
      <li
         className={`color-swatch ${selected ? 'selected' : ''}`}
         style={{ backgroundColor: color }}
         title={title}
         onClick={() => selectColor(color)}
      ></li>
   );
}
