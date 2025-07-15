import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ConfirmModal({
   children,
   onSelect,
   ref,
   actions,
   onClose,
}) {
   const dialog = useRef();

   useImperativeHandle(ref, () => {
      return {
         open: () => {
            dialog.current.showModal();
         },
         close: () => {
            dialog.current.close;
         },
      };
   });

   function handleClose() {
      dialog.current.close();

      if (onClose) {
         onClose();
      }
   }

   return createPortal(
      <dialog
         ref={dialog}
         onClose={handleClose}
         className='w-1/2 bg-orange-900 text-white p-4 rounded-lg border-none fixed top-1/3 left-1/3 backdrop:bg-slate-800/50'
      >
         {children}
         {actions === 'ConfirmCancel' && (
            <form method='dialog'>
               <div className='flex justify-end'>
                  <button
                     onClick={() => onSelect(true)}
                     className='mt-4 mr-4 hover:font-bold hover:border-b-2'
                  >
                     Confirm
                  </button>
                  <button
                     onClick={() => onSelect(false)}
                     className='mt-4 mr-4 hover:font-bold hover:border-b-2'
                  >
                     Cancel
                  </button>
               </div>
            </form>
         )}
         {actions === 'OK' && (
            <div className='flex justify-end'>
               <button
                  onClick={handleClose}
                  className='mt-4 mr-4 hover:font-bold hover:border-b-2'
               >
                  OK
               </button>
            </div>
         )}
      </dialog>,
      document.getElementById('modal')
   );
}
