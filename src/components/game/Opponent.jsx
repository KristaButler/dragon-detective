import { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import useStore from '../../store/store';
import OpponentAvatar from './avatar/OpponentAvatar';
import { setupAISimulation } from '../../utils/ai-util';
import './Opponent.css';

export default function Opponent({ id, name, avatar }) {
   const currentPlayer = useStore.use.currentPlayer();
   const turnParams = useStore.use.turnParams();
   const { isOver, setNodeRef } = useDroppable({
      id,
   });

   const isCurrentPlayer = currentPlayer === id;
   const isAsked = turnParams.opponentId === id;

   useEffect(() => {
      if (isCurrentPlayer && !turnParams.firstTurn) {
         const simulate = setupAISimulation(id, name);
         simulate();
      }
   }, [isCurrentPlayer, turnParams.firstTurn, id, name]);

   const avatarClasses = `opponent-avatar ${
      isCurrentPlayer ? 'current-player' : ''
   } ${isOver || isAsked ? 'highlight' : ''}`;

   return (
      <div
         id={id}
         className={`opponent ${isCurrentPlayer ? 'current-player' : ''}`}
         ref={setNodeRef}
      >
         <OpponentAvatar
            src={avatar}
            alt={`${name}'s avatar`}
            className={avatarClasses}
         />
         <div className='opponent-name'>{name}</div>
         {isCurrentPlayer && (
            <div className='opponent-note'>(taking thier turn)</div>
         )}
      </div>
   );
}
