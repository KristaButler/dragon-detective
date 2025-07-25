export default function Button({
   secondary,
   round,
   size = 'normal',
   className,
   children,
   customColor,
   ...props
}) {
   let classes =
      'm-1 shadow-sm shadow-zinc-900 border-2 hover:underline hover:border-white hover:font-bold';

   if (secondary) {
      classes += ' bg-teal-700 border-teal-700';
   } else if (customColor) {
      classes += ` bg-${customColor} border-${customColor}`;
   } else {
      classes += ' bg-orange-700 border-orange-700';
   }

   if (size === 'big') {
      classes += ' text-xl pt-2 pb-3 px-3';
   } else if (!round) {
      classes += ' py-1 px-2';
   }

   if (round) {
      classes += ' py-1 px-2 rounded-full';
   } else {
      classes += ' rounded-md';
   }

   return (
      <button
         className={`${classes} ${
            className ? className : undefined
         } cursor-pointer`}
         {...props}
      >
         {children}
      </button>
   );
}
