import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import useStore from '../../store/store';
import Opponents from '../layout/game/Opponents';
import GameTable from '../layout/game/GameTable';
import PlayerControls from '../layout/game/PlayerControls';
import ClueSheet from '../game/cluesheet/ClueSheet';
import FreeChoicePopup from '../game/query/FreeChoicePopup';
import ConfirmContextProvider from '../../store/confirm-context';
import FirstTurn from '../controls/popup/FirstTurn';
import { getById } from '../../utils/utils';
import { QUERY_POOL } from '../../data/query-pool';

export default function GamePage() {
   const navigate = useNavigate();
   const startNewGame = useStore.use.startNewGame();
   const playCard = useStore.use.turnActions().playCard;
   const setTurnParams = useStore.use.turnActions().setTurnParams;
   const turnParams = useStore.use.turnParams();
   const winner = useStore.use.winner();
   const solution = useStore.use.solution();
   const [isPicking, setIsPicking] = useState(false);

   useEffect(() => {
      if (winner) {
         //If we have a winner the game is over.
         navigate('/gameover');
      } else if (!solution) {
         //Only start a new game if there isn't one in progress.
         startNewGame();
      }
   }, [solution, winner, startNewGame, navigate]);

   function handleDragEnd(event) {
      const opponentId = event.over?.id || null;
      const cardId = event.active?.id || null;

      if (opponentId && cardId) {
         const card = getById(QUERY_POOL, cardId);

         if (card.freeChoice) {
            setTurnParams({ opponentId, card });
            setIsPicking(true);
         } else {
            playCard(opponentId, card);
         }
      }
   }

   function handleSelectFreeChoice(choice) {
      let query = { ...turnParams.card };
      query[choice.type] = choice.value;
      setIsPicking(false);
      playCard(turnParams.opponentId, query);
   }

   function handleCloseFreeChoice() {
      setIsPicking(false);
   }

   function handleCloseFirstTurn() {
      setTurnParams({ firstTurn: false });
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <ConfirmContextProvider>
            {turnParams.firstTurn && (
               <FirstTurn onClose={handleCloseFirstTurn} />
            )}
            <section className='game-page page-padding'>
               <Opponents />
               {isPicking && (
                  <FreeChoicePopup
                     onClose={handleCloseFreeChoice}
                     onSelect={handleSelectFreeChoice}
                  />
               )}
               <GameTable />
               <PlayerControls />
               <ClueSheet />
            </section>
         </ConfirmContextProvider>
      </DndContext>
   );
}
