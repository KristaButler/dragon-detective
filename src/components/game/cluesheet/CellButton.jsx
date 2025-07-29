import useBoundStore from '../../../store/store';
import OpponentAvatar from '../avatar/OpponentAvatar';
import NotList from './NotList';
import { getById } from '../../../utils/utils';

export default function CellButton({
   id,
   className,
   clue = { id: id, owner: null },
   species,
}) {
   const selectedClue = useBoundStore((state) => state.selectedClue);
   const setSelectedClue = useBoundStore(
      (state) => state.cluesheetActions.setSelectedClue
   );
   const players = useBoundStore((state) => state.players);
   const autoMarkPlayerEggs = useBoundStore(
      (state) => state.autoMarkPlayerEggs
   );
   const turnParams = useBoundStore((state) => state.turnParams);
   const setTurnParams = useBoundStore(
      (state) => state.turnActions.setTurnParams
   );

   const ownerPlayer = getById(players, clue.owner);
   const isSelectedClue = selectedClue === id;

   let disabled = false;
   let classes = `border-b-1 border-indigo-400 text-black ${
      className ? className : ''
   }`;
   let buttonClasses = 'flex items-center justify-center w-full h-full p-2';

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

   if (isSelectedClue || (turnParams.guessing && turnParams.guess === id)) {
      background = 'bg-green-300';
      buttonClasses += ' border-4 border-green-900';
   }

   function handleClick() {
      if (turnParams.guessing) {
         setTurnParams({ guessing: true, guess: id });
      } else {
         setSelectedClue(id);
      }
   }

   return (
      <div className={`${classes} ${background}`}>
         <button
            disabled={disabled}
            onClick={handleClick}
            className={buttonClasses}
         >
            {content}
         </button>
      </div>
   );
}
