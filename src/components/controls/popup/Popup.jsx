import CloseIcon from './CloseIcon';

export default function Popup({
   title,
   onClose,
   mode = 'light',
   className,
   children,
}) {
   const modeVariants = {
      light: 'bg-zinc-300 text-black',
      dark: 'bg-zinc-900 text-white',
   };

   return (
      <div
         className={`flex flex-col rounded absolute z-100 ${
            modeVariants[mode]
         } ${className ? className : ''}`}
      >
         <div className='flex justify-between items-center mt-1'>
            <div className='mx-2 font-bold text-lg'>{title}</div>
            <div
               className='pr-2 pt-2'
               onClick={() => onClose()}
            >
               <CloseIcon />
            </div>
         </div>
         <div className='rounded-b p-1'>{children}</div>
      </div>
   );
}
