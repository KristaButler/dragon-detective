import useBoundStore from '../../../store/store';
import OpponentAvatar from '../avatar/OpponentAvatar';
import NotList from './NotList';

export default function CellButton({
   id,
   className,
   clue = { id: id, owner: null },
   species,
}) {
   const setSelectedClue = useBoundStore(
      (state) => state.cluesheetActions.setSelectedClue
   );
   const players = useBoundStore((state) => state.players);
   const autoMarkPlayerEggs = useBoundStore(
      (state) => state.autoMarkPlayerEggs
   );

   const ownerPlayer = players.find((p) => p.id === clue.owner);

   let disabled = false;
   let classes = `border-b-1 border-indigo-400 text-black ${
      className ? className : ''
   }`;

   let content = '?';
   let background = species.bgLight;

   if (clue.owner === 'player') {
      background = 'bg-zinc-400 text-white';
      content = 'X';

      if (autoMarkPlayerEggs) {
         disabled = true;
      }
   } else if (clue.owner === 'global') {
      background = 'bg-zinc-500 text-white';
      content = '/';
      disabled = true;
   } else if (clue.owner) {
      if (ownerPlayer) {
         content = (
            <OpponentAvatar
               src={ownerPlayer.avatar}
               alt={ownerPlayer.name}
               className='h-8 w-8'
            />
         );
      } else {
         content = <div>{owner.id}</div>;
      }
   } else if (clue.not?.length > 0) {
      content = (
         <NotList
            list={clue.not}
            players={players}
         />
      );
   }

   function handleClick() {
      setSelectedClue(id);
   }

   return (
      <div className={`${classes} ${background}`}>
         <button
            disabled={disabled}
            onClick={handleClick}
            className='flex items-center justify-center w-full h-full p-2'
         >
            {content}
         </button>
      </div>
   );
}
