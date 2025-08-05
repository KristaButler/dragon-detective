import { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import useBoundStore from '../../store/store';
import { getById } from '../../utils/utils';

import './Opponent.css';
import OpponentAvatar from './avatar/OpponentAvatar';

export default function Opponent({ id, name, avatar }) {
   const currentPlayer = useBoundStore((state) => state.currentPlayer);
   const autoNotes = useBoundStore((state) => state.autoNotes);
   const ai = useBoundStore((state) => getById(state.ai, id));
   const aiActions = useBoundStore((state) => state.aiActions);
   const setMessage = useBoundStore((state) => state.turnActions.setMessage);
   const nextPlayer = useBoundStore((state) => state.gameActions.nextPlayer);
   const turnParams = useBoundStore((state) => state.turnParams);
   const { isOver, setNodeRef } = useDroppable({
      id,
   });

   const isCurrentPlayer = currentPlayer === id;
   const isAsked = turnParams.opponentId === id;

   useEffect(() => {
      let timer = 0;

      if (isCurrentPlayer && !turnParams.firstTurn) {
         if (ai.out) {
            setMessage(`Skipping ${name}, because they are out.`);
            timer = 3000;
         } else if (ai.clues.length >= 35) {
            setMessage(`${name} is making a guess.`);
            setTimeout(() => {
               aiActions.guess(id);
            }, 3000);

            timer = 1500;
         } else {
            setTimeout(() => {
               aiActions.takeTurn(id);
            }, 1500);

            if (autoNotes) {
               timer = 6000;
            }
         }

         if (timer > 0) {
            setTimeout(() => {
               nextPlayer();
            }, timer);
         }
      }
   }, [isCurrentPlayer, turnParams, setMessage, aiActions, nextPlayer]);

   let imgClasses = 'w-24 h-24 rounded-full mb-2';

   if (isCurrentPlayer) {
      imgClasses += ' border-4 border-rose-600 shadow-md shadow-zinc-900';
   }

   if (isOver || isAsked) {
      imgClasses += ' border-4 border-orange-600 shadow-md shadow-zinc-900';
   }

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
