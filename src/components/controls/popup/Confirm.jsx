import Button from '../Button';
import Popup from './Popup';
import './Confirm.css';

export default function Confirm({
   title,
   message,
   type,
   onConfirm,
   className,
}) {
   return (
      <div className={`confirm ${className ? className : ''}`}>
         <Popup
            title={title}
            onClose={() => onConfirm(false)}
         >
            <div className='confirm-message'>{message}</div>
            <div className='confirm-buttons'>
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
