import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faSquare } from '@fortawesome/free-solid-svg-icons';
import './Popup.css';

function CloseIcon() {
   return (
      <span className='fa-layers fa-lg'>
         <FontAwesomeIcon
            icon={faSquare}
            className='close-icon-background'
         />
         <FontAwesomeIcon
            icon={faSquareXmark}
            size='lg'
            className='close-icon-x'
         />
      </span>
   );
}

export default function Popup({
   title,
   onClose,
   mode = 'light',
   className,
   children,
}) {
   return (
      <div className={`popup ${mode} ${className ? className : ''}`}>
         <div className='popup-header'>
            <div className='popup-title'>{title}</div>
            <div
               className='popup-close'
               onClick={() => onClose()}
            >
               <CloseIcon />
            </div>
         </div>
         <div className='popup-content'>{children}</div>
      </div>
   );
}
