import xmark from '../../../assets/xmark.png';
import './OpponentAvatar.css';

export default function OpponentAvatar({ src, alt, not, className }) {
   return (
      <div className='opponent-avatar-container'>
         <img
            src={src}
            alt={alt}
            title={alt}
            className={`avatar-img ${className}`}
         />
         {not && (
            <img
               src={xmark}
               className='not-img'
            />
         )}
      </div>
   );
}
