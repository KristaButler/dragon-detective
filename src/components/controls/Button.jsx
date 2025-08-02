import { NavLink } from 'react-router-dom';
import './Button.css';

export default function Button({
   color = 'orange',
   shape = 'normal',
   disabled = false,
   className,
   children,
   to = null,
   ...props
}) {
   if (disabled) {
      color = 'disabled';
   }

   const classes = `button button-${color} button-${shape} ${
      disabled ? 'disabled' : ''
   } ${className ? className : ''}`;

   let content = (
      <button
         className={classes}
         disabled={disabled}
         {...props}
      >
         {children}
      </button>
   );

   //Adding to makes it a nav button
   if (to) {
      content = (
         <NavLink
            to={to}
            className={classes}
            disabled={disabled}
            {...props}
         >
            {children}
         </NavLink>
      );
   }

   return content;
}
