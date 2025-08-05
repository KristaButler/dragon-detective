import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import useBoundStore from '../../../store/store';
import Button from '../../controls/Button';
import Popup from '../../controls/popup/Popup';
import PlayerAvatar from '../avatar/PlayerAvatar';
import OpponentAvatar from '../avatar/OpponentAvatar';
import { getById } from '../../../utils/utils';
import { EGG_POOL } from '../../../data/egg-pool';
import './MarkClue.css';

export default function MarkClue({ clue, includePlayer, onClose }) {
   const cluesheetActions = useBoundStore((state) => state.cluesheetActions);
   const players = useBoundStore((state) => state.players);

   const egg = getById(EGG_POOL, clue.id);

   function handleClickOwner(opponentId) {
      cluesheetActions.toggleClueOwner(opponentId, clue.id);
   }

   function handleClickNotOwner(opponentId) {
      cluesheetActions.toggleClueNotOwner(opponentId, clue.id);
   }

   function handleClear() {
      cluesheetActions.clearClue(clue.id);
   }

   //TODO: Split this out or simplify it so that there is less logic in the map
   return (
      <Popup
         title={egg ? egg.name : 'Mark Clue'}
         onClose={onClose}
         className='mark-clue-popup'
      >
         <div className='flex-wrapped-container'>
            {players.map((player) => {
               const isPlayer = player.id === 'player';
               if (!includePlayer && isPlayer) {
                  return; //Skip the player if not including
               }

               //These could both be false if the info is unknown
               const isOwner = clue.owner === player.id;
               const isNotOwner = clue.not.indexOf(player.id) > -1;

               let title = player.name;
               if (isOwner) {
                  title += ', marked as owner.';
               } else if (isNotOwner) {
                  title += ', does not have the egg.';
               }

               let avatar = (
                  <OpponentAvatar
                     src={player.avatar}
                     alt={player.name}
                     className='mark-owner-avatar'
                  />
               );

               if (isPlayer) {
                  avatar = <PlayerAvatar className='mark-owner-avatar' />;
               }

               const classes = `mark-owner ${isOwner ? 'is-owner' : ''} ${
                  isNotOwner ? 'not-owner' : ''
               }`;

               return (
                  <div
                     key={`mark-clue-${player.id}`}
                     className={classes}
                  >
                     <div>{player.name}</div>
                     <div className='mark-owner-avatar-container'>
                        {isNotOwner ? (
                           <OpponentAvatar
                              src={player.avatar}
                              alt={player.name}
                              not
                              className='mark-owner-avatar'
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
                              className='mark-icon'
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
                                 className='mark-icon'
                              />
                           </Button>
                        )}
                     </div>
                  </div>
               );
            })}
         </div>
         <div className='mark-owner-buttons'>
            <Button onClick={handleClear}>Reset</Button>
            <Button
               color='green'
               onClick={onClose}
            >
               Close
            </Button>
         </div>
      </Popup>
   );
}
