import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import ConfirmModal from '../ConfirmModal';
import { queryDeckActions } from '../../store/query-deck-slice';
import { turnsActions } from '../../store/turns-slice';
import { playersActions } from '../../store/players-slice';

//TODO: Add addtional settings, style displaying cards better.
export default function PlayerControls() {
   const playerEggsModal = useRef();
   const discardHandModal = useRef();
   const settingsModal = useRef();
   const currentPlayer = useSelector((state) => state.players.currentPlayer);
   const playerEggs = useSelector((state) => state.eggs.playerEggs);
   const communalEggs = useSelector((state) => state.eggs.excessEggs);
   const dispatch = useDispatch();

   const yourEggs = playerEggs['player'] || [];

   const isCurrentPlayer = currentPlayer === 'player';

   const buttonClasses =
      'flex flex-col justify-center bg-orange-600 h-8 w-8 rounded-full hover:bg-amber-600 hover:border-2';
   let imgClasses =
      'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 rounded-full my-2';

   if (isCurrentPlayer) {
      imgClasses += ' bg-teal-300 border-rose-600 shadow-lg shadow-slate-900';
   } else {
      imgClasses += ' bg-teal-600 border-transparent';
   }

   function handleDiscardHand(confirm) {
      if (confirm) {
         dispatch(queryDeckActions.discardHand('player'));
         dispatch(turnsActions.recordDiscardHand({ playerId: 'player' }));
         dispatch(playersActions.nextPlayer());
      }
   }

   function handleRestartGame(confirm) {
      if (confirm) {
         window.location.reload(true); //TODO: Need a better solution
      }
   }

   return (
      <>
         <ConfirmModal
            id='player-eggs-modal'
            actions='OK'
            ref={playerEggsModal}
         >
            <p className='text-xl'>Your Eggs:</p>
            <ul className='list-disc pl-10 p-5 bg-teal-800 rounded-lg p-2'>
               {yourEggs.map((egg) => (
                  <li key={egg.id}>{egg.name}</li>
               ))}
            </ul>

            <p className='text-xl mt-4'>Communal Eggs:</p>
            <ul className='list-disc pl-10 p-5 bg-teal-800 rounded-lg p-2'>
               {communalEggs.map((egg) => (
                  <li key={egg.id}>{egg.name}</li>
               ))}
            </ul>
         </ConfirmModal>
         <ConfirmModal
            id='discard-hand-modal'
            actions='ConfirmCancel'
            ref={discardHandModal}
            onSelect={handleDiscardHand}
         >
            <p className='text-xl'>Discard your whole hand?</p>
            <p>
               Discard all query cards and draw four new ones? This will end
               your turn.
            </p>
         </ConfirmModal>
         <ConfirmModal
            id='settings-modal'
            actions='ConfirmCancel'
            ref={settingsModal}
            onSelect={handleRestartGame}
         >
            <p className='text-xl'>Restart the Game?</p>
            <p>Abandon this game and start over? This cannot be undone.</p>
         </ConfirmModal>
         <div className='flex flex-col'>
            <div
               id='player-controls'
               className='flex'
            >
               <div
                  id='player-avatar'
                  className='flex flex-col items-center'
               >
                  <img
                     src='/images/avatars/avatar-player.png'
                     alt='Player Avatar'
                     className={imgClasses}
                  />
               </div>
               <div
                  id='player-actions'
                  className='flex flex-col justify-center gap-2'
               >
                  <button
                     title='View Your Eggs'
                     className={`${buttonClasses} ml-2 sm:-ml-1`}
                     onClick={() => playerEggsModal.current.open()}
                  >
                     <i className='fa-solid fa-egg'></i>
                  </button>
                  <button
                     title='Discard and draw new queries.'
                     className={`${buttonClasses} ml-2 sm:ml-2`}
                     onClick={() => discardHandModal.current.open()}
                  >
                     <i className='fa-solid fa-arrows-rotate'></i>
                  </button>
                  <button
                     title='Settings'
                     className={`${buttonClasses} ml-2 sm:-ml-2`}
                     onClick={() => settingsModal.current.open()}
                  >
                     <i className='fa-solid fa-gear'></i>
                  </button>
               </div>
            </div>
            {isCurrentPlayer ? (
               <p className='font-bold'>Your Turn</p>
            ) : (
               <p>&nbsp;</p>
            )}
         </div>
      </>
   );
}
