import useBoundStore from '../../../store/store';
import './PlayerAvatar.css';

//TODO: Find a better solution for these, or move to a constants file.
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

   return (
      <div
         className={`player-avatar ${className}`}
         style={{ backgroundColor: avatar.background }}
         id='avatar'
      >
         {HAIR_BACKS[avatar.hair] && (
            <img src={`/images/player/hair-${avatar.hair}-back.png`} />
         )}
         <img src={`/images/player/skintone-${avatar.base}.png`} />
         {avatar.beautymark && <img src={`/images/player/beauty-mark.png`} />}
         {avatar.necklace > 0 && (
            <img src={`/images/player/necklace-${avatar.necklace}.png`} />
         )}
         {avatar.earrings > 0 && (
            <img src={`/images/player/earrings-${avatar.earrings}.png`} />
         )}
         <img src={`/images/player/shirt-${avatar.shirt}.png`} />
         <img src={`/images/player/hair-${avatar.hair}.png`} />
         {avatar.glasses > 0 && (
            <img src={`/images/player/glasses-${avatar.glasses}.png`} />
         )}
      </div>
   );
}
