import './Input.css';

export default function Input({ id, type, label, className, ...props }) {
   return (
      <div className='input'>
         <label htmlFor={id}>{label}</label>
         <input
            id={id}
            type={type}
            className={className ? className : undefined}
            {...props}
         />
      </div>
   );
}
