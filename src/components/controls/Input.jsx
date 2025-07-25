export default function Input({
   id,
   type,
   label,
   displayRow,
   className,
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
         <input
            id={id}
            type={type}
            className={`${inputClasses} ${className ? className : undefined}`}
            {...props}
         />
      </div>
   );
}
