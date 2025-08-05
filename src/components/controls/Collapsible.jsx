import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './Collapsible.css';

export default function Collapsible({ title, children, className = '' }) {
   const [isOpen, setIsOpen] = useState(false);

   function onToggle() {
      setIsOpen((prevIsOpen) => !prevIsOpen);
   }

   return (
      <div className={`collapsible ${className}`}>
         <button
            className={`collapsible-header ${isOpen ? 'open' : 'closed'}`}
            onClick={onToggle}
         >
            <h3>{title}</h3>
            <span className='toggle-icon'>
               {isOpen ? (
                  <FontAwesomeIcon icon={faChevronUp} />
               ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
               )}
            </span>
         </button>
         {isOpen && <div className='collapsible-content'>{children}</div>}
      </div>
   );
}
