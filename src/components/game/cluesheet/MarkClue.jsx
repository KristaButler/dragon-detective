import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import { EGG_POOL } from '../../../data/egg-pool';

import useBoundStore from '../../../store/store';
import { getById } from '../../../utils/utils';
import Button from '../../controls/Button';
import Popup from '../../controls/popup/Popup';
import PlayerAvatar from '../avatar/PlayerAvatar';
import OpponentAvatar from '../avatar/OpponentAvatar';

export default function MarkClue({ clue, includePlayer, onClose }) {
   const cluesheetActions = useBoundStore((state) => state.cluesheetActions);
   const players = useBoundStore((state) => state.players);

   const egg = getById(EGG_POOL, clue.id);
   const classes =
      'flex flex-col items-center shrink-0 p-2 rounded border-2 border-zinc-400 hover:border-zinc-900';

   function handleClickOwner(opponentId) {
      cluesheetActions.toggleClueOwner(opponentId, clue.id);
   }

   function handleClickNotOwner(opponentId) {
      cluesheetActions.toggleClueNotOwner(opponentId, clue.id);
   }

   function handleClear() {
      cluesheetActions.clearClue(clue.id);
   }

   return (
      <Popup
         title={egg ? egg.name : 'Mark Clue'}
         onClose={onClose}
         className='-mt-14'
      >
         <div className='flex flex-wrap gap-2 p-2'>
            {players.map((player) => {
               const isPlayer = player.id === 'player';
               if (!includePlayer && isPlayer) {
                  return; //Skip the player if not including
               }

               //These could both be false if the info is unknown
               const isOwner = clue.owner === player.id;
               const isNotOwner = clue.not.indexOf(player.id) > -1;
               let background = 'bg-white';

               let title = player.name;
               if (isOwner) {
                  title += ', marked as owner.';
                  background = 'bg-emerald-300';
               } else if (isNotOwner) {
                  title += ', does not have the egg.';
                  background = 'bg-zinc-400';
               }

               //TODO: Maybe split the individual content into another component

               let avatar = (
                  <OpponentAvatar
                     src={player.avatar}
                     alt={player.name}
                     className='w-16 h-16'
                  />
               );

               if (isPlayer) {
                  avatar = <PlayerAvatar className='w-16 h-16 rounded-full' />;
               }

               return (
                  <div
                     key={`mark-clue-${player.id}`}
                     className={`${classes} ${background}`}
                  >
                     <div>{player.name}</div>
                     <div className='relative'>
                        {isNotOwner ? (
                           <OpponentAvatar
                              src={player.avatar}
                              alt={player.name}
                              not
                              className='w-16 h-16'
                           />
                        ) : (
                           avatar
                        )}
                     </div>
                     <div>
                        <Button
                           shape='round'
                           color='green'
                           title={`${player.name} owns this egg.`}
                           onClick={() => handleClickOwner(player.id)}
                        >
                           <FontAwesomeIcon
                              icon={faCheck}
                              className='text-white'
                           />
                        </Button>
                        {!isPlayer && (
                           <Button
                              color='red'
                              title={`${player.name} doesn't have this egg.`}
                              onClick={() => handleClickNotOwner(player.id)}
                           >
                              <FontAwesomeIcon
                                 icon={faXmark}
                                 className='text-white'
                              />
                           </Button>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
         <div className='justify-self-end'>
            <Button
               onClick={handleClear}
               className='text-white'
            >
               Reset
            </Button>
            <Button
               color='green'
               onClick={onClose}
               className='text-white'
            >
               Close
            </Button>
         </div>
      </Popup>
   );
}
