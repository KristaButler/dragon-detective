import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faSquare } from '@fortawesome/free-solid-svg-icons';

export default function CloseIcon({
   color = 'text-red-800',
   background = 'text-white',
}) {
   return (
      <span className='fa-layers fa-lg'>
         <FontAwesomeIcon
            icon={faSquare}
            className={background}
         />
         <FontAwesomeIcon
            icon={faSquareXmark}
            size='lg'
            className={`${color} hover:cursor-pointer`}
         />
      </span>
   );
}
