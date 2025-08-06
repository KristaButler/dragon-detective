import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../../store/store';
import OpponentAvatar from '../avatar/OpponentAvatar';
import NotList from './NotList';
import { getById } from '../../../utils/utils';

export default function CellButton({
   id,
   className,
   clue = { id: id, owner: null },
   species,
}) {
   const winner = useStore.use.winner();
   const solution = useStore.use.solution();
   const selectedClue = useStore.use.selectedClue();
   const setSelectedClue = useStore.use.cluesheetActions().setSelectedClue;
   const players = useStore.use.players();
   const autoMarkPlayerEggs = useStore.use.autoMarkPlayerEggs();
   const turnParams = useStore.use.turnParams();
   const setTurnParams = useStore.use.turnActions().setTurnParams;

   const ownerPlayer = getById(players, clue.owner);
   const isSelectedClue = selectedClue === id;

   let disabled = false;
   let content = '?';
   let cellState = `background-${species.id}-light`;

   if (clue.owner === 'player') {
      cellState = 'owner';
      content = 'X';

      if (autoMarkPlayerEggs) {
         disabled = true;
      }
   } else if (clue.owner === 'global') {
      cellState = 'global';
      content = '/';
      disabled = true;
   } else if (clue.owner) {
      if (ownerPlayer) {
         content = (
            <OpponentAvatar
               src={ownerPlayer.avatar}
               alt={ownerPlayer.name}
               className='cell-avatar'
            />
         );
      } else {
         content = <div>{clue.owner.id}</div>;
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
      cellState = 'selected';
   }

   //If we have a winner, prevent changing the clue sheet, and style the guess and solution
   if (winner) {
      disabled = true;

      if (solution === id) {
         content = <FontAwesomeIcon icon={faStar} />;
         cellState = 'solution';
      } else if (turnParams.guess === id) {
         content = 'Guess';
         cellState = 'guessing';
      }
   }

   function handleClick() {
      if (turnParams.guessing) {
         setTurnParams({ guessing: true, guess: id });
      } else {
         setSelectedClue(id);
      }
   }

   return (
      <div className={`cell ${cellState} ${className ? className : ''} `}>
         <button
            disabled={disabled}
            onClick={handleClick}
         >
            {content}
         </button>
      </div>
   );
}
