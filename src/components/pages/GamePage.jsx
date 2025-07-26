import { useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import useBoundStore from '../../store/store';
import Opponents from '../layout/game/Opponents';
import GameTable from '../layout/game/GameTable';
import PlayerControls from '../layout/game/PlayerControls';
import ClueSheet from '../game/cluesheet/ClueSheet';
import { OPPONENTS } from '../../data/player-pool';

export default function GamePage() {
   const players = useBoundStore((state) => state.players);
   const startNewGame = useBoundStore((state) => state.startNewGame);

   //TODO: For Test
   const state = useBoundStore((state) => state);
   console.log(state);

   //Temporary, for easier testing
   useEffect(() => {
      startNewGame();
   }, [startNewGame]);

   function handleDragEnd(event) {
      const opponentId = event.over?.id || null;
      const queryCardId = event.active?.id || null;

      if (event.over && opponentId && queryCardId) {
         //TODO: Play Card
         alert('Playing Card');
      }
   }
   return (
      <DndContext onDragEnd={handleDragEnd}>
         <Opponents players={players} />
         <GameTable />
         <PlayerControls />
         <ClueSheet />
      </DndContext>
   );
}
