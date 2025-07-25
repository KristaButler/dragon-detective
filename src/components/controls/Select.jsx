export default function Select({
   id,
   type,
   label,
   displayRow,
   className,
   children,
   ...props
}) {
   const labelClasses = 'mr-2';
   const inputClasses = 'text-black bg-white w-min p-1 m-1 rounded';

   return (
      <div className={`flex items-center`}>
         <label
            htmlFor={id}
            className={labelClasses}
         >
            {label}
         </label>
         <select
            id={id}
            type={type}
            className={`${inputClasses} ${className ? className : undefined}`}
            {...props}
         >
            {children}
         </select>
      </div>
   );
}
