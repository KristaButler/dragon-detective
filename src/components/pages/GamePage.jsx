import { useEffect, useState } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import useBoundStore from '../../store/store';
import Opponents from '../layout/game/Opponents';
import GameTable from '../layout/game/GameTable';
import PlayerControls from '../layout/game/PlayerControls';
import ClueSheet from '../game/cluesheet/ClueSheet';
import { QUERY_POOL } from '../../data/query-pool';
import FreeChoicePopup from '../game/query/FreeChoicePopup';
import ConfirmContextProvider from '../../store/confirm-context';

export default function GamePage() {
   const startNewGame = useBoundStore((state) => state.startNewGame);
   const playCard = useBoundStore((state) => state.turnActions.playCard);
   const turnParams = useBoundStore((state) => state.turnParams);
   const setTurnParams = useBoundStore(
      (state) => state.turnActions.setTurnParams
   );
   const [isPicking, setIsPicking] = useState(false);

   //Temporary, for easier testing
   useEffect(() => {
      startNewGame();
   }, [startNewGame]);

   function handleDragEnd(event) {
      const opponentId = event.over?.id || null;
      const cardId = event.active?.id || null;
      const card = QUERY_POOL.find((query) => query.id == cardId);

      if (card.freeChoice) {
         setTurnParams({ opponentId, card });
         setIsPicking(true);
      } else {
         playCard(opponentId, card, cardId);
      }
   }

   function handleSelectFreeChoice(choice) {
      let query = { ...turnParams.card };
      query[choice.type] = choice.value;
      setIsPicking(false);
      playCard(turnParams.opponentId, query, turnParams.cardId);
   }

   function handleCloseFreeChoice() {
      setIsPicking(false);
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <ConfirmContextProvider>
            <div className='p-4'>
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
