import { useState } from 'react';
import ColorSwatch from './ColorSwatch';
import Popup from '../popup/Popup';

export default function ColorPicker({
   label,
   onPickColor,
   list,
   defaultValue,
}) {
   const [choosingColor, setChoosingColor] = useState(false);

   const colorSettings = list.find((color) => color.value === defaultValue);
   let value = defaultValue;

   if (colorSettings) {
      value = colorSettings.value;
   }

   function openColorPicker() {
      setChoosingColor(true);
   }

   function closeColorPicker() {
      setChoosingColor(false);
   }

   function onSelectColor(color) {
      onPickColor(color);
      closeColorPicker();
   }

   return (
      <>
         <div className='flex gap-4 items-center'>
            <div>{label}</div>
            <button
               className='w-12 h-8 rounded border-2 border-white hover:cursor-pointer'
               style={{ backgroundColor: colorSettings?.swatch }}
               onClick={openColorPicker}
               title={`Selected Color ${colorSettings?.name}`}
            ></button>
         </div>
         {choosingColor && (
            <Popup
               title='Choose a Background Color'
               mode='dark'
               onClose={closeColorPicker}
            >
               <ul className='flex p-2 gap-2 rounded items-center'>
                  {list.map((color) => {
                     return (
                        <ColorSwatch
                           key={color.name}
                           title={color.name}
                           color={color.swatch}
                           selectColor={() => onSelectColor(color.value)}
                           selected={color.value === value}
                        />
                     );
                  })}
               </ul>
            </Popup>
         )}
      </>
   );
}
