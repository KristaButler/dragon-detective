import { NavLink } from 'react-router-dom';

export default function Button({
   color = 'orange',
   shape = 'normal',
   disabled = false,
   className,
   children,
   to = null,
   ...props
}) {
   const colorVariants = {
      green: 'bg-emerald-700 border-emerald-700',
      orange: 'bg-orange-700 border-orange-700',
      yellow: 'bg-yellow-700 border-yellow-700',
      red: 'bg-red-900 border-red-900',
      disabled: 'bg-zinc-700 border-zinc-700',
   };
   const shapeVariants = {
      big: 'text-xl pt-2 pb-3 px-3 rounded-md',
      normal: 'py-1 px-2 rounded-md',
      round: 'py-1 px-2 rounded-full',
   };

   if (disabled) {
      color = 'disabled';
   }

   let classes = `m-1 shadow-sm shadow-zinc-900 border-2 hover:underline hover:border-white hover:font-bold ${
      colorVariants[color]
   } ${shapeVariants[shape]} ${!disabled ? 'cursor-pointer' : ''}`;

   let content = (
      <button
         className={`${classes} ${className ? className : ''}`}
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
            className={`${classes} ${className ? className : ''}`}
            {...props}
         >
            {children}
         </NavLink>
      );
   }

   return content;
}
