import { DndContext } from '@dnd-kit/core';
import useBoundStore from '../../store/store';
import Opponents from '../game-layout/Opponents';
import GameTable from '../game-layout/GameTable';
import PlayerControls from '../game-layout/PlayerControls';
import ClueSheet from '../cluesheet/ClueSheet';
import { useEffect } from 'react';

export default function GamePage() {
   const game = useBoundStore((state) => state.game);
   const startNewGame = useBoundStore((state) => state.startNewGame);

   //Temporary, for easier testing
   useEffect(() => {
      startNewGame();
   }, [startNewGame]);

   function handleDragEnd() {
      //TODO
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <Opponents players={game.players} />
         <GameTable />
         <PlayerControls />
         <ClueSheet />
      </DndContext>
   );
}
