import { useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ConfirmModal({
   children,
   onSelect,
   ref,
   includeActions,
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
      dialog.current.close;
   }

   return createPortal(
      <dialog
         ref={dialog}
         onClose={handleClose}
         className='bg-orange-900 text-white p-4 rounded-lg border-none fixed top-1/3 left-1/3 backdrop:bg-slate-800/50'
      >
         {children}
         {includeActions && (
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
      </dialog>,
      document.getElementById('modal')
   );
}
