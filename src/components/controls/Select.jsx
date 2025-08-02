import './InputSyles.css';

export default function Select({
   id,
   type,
   label,
   className,
   children,
   ...props
}) {
   return (
      <div className='input center-element'>
         <label htmlFor={id}>{label}</label>
         <select
            id={id}
            type={type}
            className={className ? className : undefined}
            {...props}
         >
            {children}
         </select>
      </div>
   );
}
