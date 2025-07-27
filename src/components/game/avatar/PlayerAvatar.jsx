import { DEFAULT_AVATAR } from '../../../store/settingsSlice';
import useBoundStore from '../../../store/store';

//TODO: Move to backend eventually, or find better solution
const HAIR_BACKS = [
   false, //0 - throw away
   false,
   false,
   false,
   true, //4
   true, //5
   true, //6
   false,
   false,
   false,
   true, //10
   false,
   false,
   true, //13
   true, //14
   true, //15
   true, //16
];

export default function PlayerAvatar({ className }) {
   const avatar = useBoundStore((state) => state.playerAvatar);
   const imageClasses = `absolute rounded-full`;

   return (
      <div
         className={`flex items-center relative rounded-full ${className}`}
         style={{ backgroundColor: avatar.background }}
         id='avatar'
      >
         {avatar.glasses > 0 && (
            <img
               className={`${imageClasses} z-7`}
               src={`/images/player/glasses-${avatar.glasses}.png`}
            />
         )}
         <img
            className={`${imageClasses} z-6`}
            src={`/images/player/hair-${avatar.hair}.png`}
         />
         <img
            className={`${imageClasses} z-5`}
            src={`/images/player/shirt-${avatar.shirt}.png`}
         />
         {avatar.earrings > 0 && (
            <img
               className={`${imageClasses} z-4`}
               src={`/images/player/earrings-${avatar.earrings}.png`}
            />
         )}
         {avatar.necklace > 0 && (
            <img
               className={`${imageClasses} z-3`}
               src={`/images/player/necklace-${avatar.necklace}.png`}
            />
         )}
         {avatar.beautymark && (
            <img
               className={`${imageClasses} z-2`}
               src={`/images/player/beauty-mark.png`}
            />
         )}
         <img
            className={`${imageClasses} z-1`}
            src={`/images/player/skintone-${avatar.base}.png`}
         />
         {HAIR_BACKS[avatar.hair] && (
            <img
               className={`${imageClasses} z-0`}
               src={`/images/player/hair-${avatar.hair}-back.png`}
            />
         )}
      </div>
   );
}
