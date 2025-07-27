import Button from '../Button';
import Popup from './Popup';

export default function Confirm({
   title,
   message,
   type,
   onConfirm,
   className,
}) {
   return (
      <div className={`flex items-center ${className ? className : ''}`}>
         <Popup
            title={title}
            onClose={() => onConfirm(false)}
            className='w-3/4 top-1/4 left-20'
         >
            <div className='p-2'>{message}</div>
            <div className='flex justify-end'>
               {type === 'confirm' && (
                  <>
                     <Button
                        color='green'
                        onClick={() => onConfirm(true)}
                     >
                        Confirm
                     </Button>
                     <Button onClick={() => onConfirm(false)}>Cancel</Button>
                  </>
               )}
               {type === 'alert' && (
                  <Button onClick={() => onConfirm(false)}>OK</Button>
               )}
            </div>
         </Popup>
      </div>
   );
}
