import { NavLink } from 'react-router-dom';

export default function NavButton({
   secondary,
   round,
   className,
   to,
   children,
   ...props
}) {
   let classes =
      'm-1 shadow-sm border-2 no-underline hover:underline hover:border-white hover:font-bold';

   if (secondary) {
      classes += ' bg-teal-700 border-teal-700';
   } else {
      classes += ' bg-orange-700 border-orange-700';
   }

   if (round) {
      classes += ' py-1 px-2 rounded-full';
   } else {
      classes += ' rounded-md';
   }

   return (
      <NavLink
         to={to}
         className={`${classes} ${className}`}
         {...props}
      >
         {children}
      </NavLink>
   );
}
