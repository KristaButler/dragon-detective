import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import useBoundStore from '../../store/store';
import Opponents from '../layout/game/Opponents';
import GameTable from '../layout/game/GameTable';
import PlayerControls from '../layout/game/PlayerControls';
import ClueSheet from '../game/cluesheet/ClueSheet';
import { QUERY_POOL } from '../../data/query-pool';
import FreeChoicePopup from '../game/query/FreeChoicePopup';
import ConfirmContextProvider from '../../store/confirm-context';
import { getById } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export default function GamePage() {
   const navigate = useNavigate();
   const startNewGame = useBoundStore((state) => state.startNewGame);
   const playCard = useBoundStore((state) => state.turnActions.playCard);
   const setTurnParams = useBoundStore(
      (state) => state.turnActions.setTurnParams
   );
   const turnParams = useBoundStore((state) => state.turnParams);
   const winner = useBoundStore((state) => state.winner);
   const [isPicking, setIsPicking] = useState(false);

   //Temporary, for easier testing
   useEffect(() => {
      startNewGame();
   }, [startNewGame]);

   //TODO: This causes error because of render
   if (winner) {
      navigate('/gameover');
   }

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

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <ConfirmContextProvider>
            <div className='padding-4'>
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
            </div>
         </ConfirmContextProvider>
      </DndContext>
   );
}
