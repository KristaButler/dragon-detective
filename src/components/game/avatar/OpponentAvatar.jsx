import xmark from '../../../assets/xmark.png';

export default function OpponentAvatar({ src, alt, not, className }) {
   return (
      <div className='relative'>
         <img
            src={src}
            alt={alt}
            title={alt}
            className={`rounded-full ${className}`}
         />
         {not && (
            <img
               src={xmark}
               className='absolute z-100 top-0'
            />
         )}
      </div>
   );
}
