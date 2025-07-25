import { useState } from 'react';
import ColorSwatch from './ColorSwatch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

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
            <div className='flex flex-col bg-zinc-900 rounded mt-2 absolute z-100'>
               <div className='flex justify-between items-center mt-1'>
                  <div className='mx-2'>Choose a color: </div>
                  <FontAwesomeIcon
                     icon={faSquareXmark}
                     size='lg'
                     className='text-red-800 pr-2 hover:cursor-pointer'
                     onClick={closeColorPicker}
                  />
               </div>

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
            </div>
         )}
      </>
   );
}
