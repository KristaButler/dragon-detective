import { OPPONENTS } from '../data/player-pool';
import { QUERY_POOL } from '../data/query-pool';
import { getCardLabel, getMatches, getQuestion } from '../util/query-deck-util';
import ClueSheet from './ClueSheet/ClueSheet';
import TurnDisplay from './Display/TurnDisplay';
import Opponents from './Opponents';
import { useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import ConfirmModal from './ConfirmModal';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmQuery from './QueryCards/ConfirmQuery';
import { queryDeckActions } from '../store/query-deck-slice';
import RevealCards from './Display/RevealCards';
import { clueSheetsActions } from '../store/clue-sheets-slice';
import { turnsActions } from '../store/turns-slice';

export default function PlayArea() {
   const dispatch = useDispatch();
   const playersEggs = useSelector((state) => state.eggs.playerEggs);
   const cardPlayed = useSelector((state) => state.turns.cardPlayed);
   const matches = useSelector((state) => state.turns.matches);
   const [confirmMessage, setConfirmMessage] = useState();
   const confirmQuery = useRef();
   const revealCards = useRef();

   function handleDragEnd(event) {
      const opponentId = event.over?.id || null;
      const queryCardId = event.active?.id || null;

      if (event.over && opponentId && queryCardId) {
         const opponent = OPPONENTS.find((opp) => opp.id === opponentId);
         const queryCard = QUERY_POOL.find((query) => query.id === queryCardId);

         setConfirmMessage(`Ask ${opponent.name} ${getQuestion(queryCard)}?`);

         dispatch(turnsActions.playCard({ queryCard, opponent }));

         confirmQuery.current.open();
      }
   }

   function handleConfirmQuery(
      confirmed,
      choice = { type: null, value: null }
   ) {
      if (confirmed) {
         dispatch(
            queryDeckActions.discard({
               playerId: 'player',
               discardId: cardPlayed.queryCard.id,
            })
         );
         const opponentEggs = playersEggs[cardPlayed.opponent.id];

         if (opponentEggs) {
            dispatch(turnsActions.playCard({ ...cardPlayed, choice }));

            let cardMatches = getMatches(
               opponentEggs,
               cardPlayed.queryCard,
               choice
            );

            dispatch(turnsActions.setMatches({ matches: cardMatches }));

            revealCards.current.open();
         }
      }
   }

   function handleCloseRevealedCards(markClues) {
      revealCards.current.close();

      if (markClues) {
         matches.forEach((egg) => {
            dispatch(
               clueSheetsActions.setEggOwner({
                  playerId: 'player',
                  ownerId: cardPlayed.opponent.id,
                  eggId: egg.id,
               })
            );
         });
      }
   }

   return (
      <DndContext onDragEnd={handleDragEnd}>
         <div
            id='play-area'
            className='flex flex-col flex-grow w-full bg-violet-900 p-4 rounded-lg -mt-6'
         >
            <Opponents />
            <TurnDisplay />
            <ClueSheet />
            <ConfirmModal
               ref={confirmQuery}
               onSelect={handleConfirmQuery}
               includeActions={false}
            >
               {cardPlayed && (
                  <ConfirmQuery
                     title='Confirm Query'
                     message={confirmMessage}
                     queryCard={cardPlayed.queryCard}
                     onSelect={handleConfirmQuery}
                  />
               )}
            </ConfirmModal>
            <ConfirmModal
               ref={revealCards}
               onSelect={handleCloseRevealedCards}
               includeActions={false}
            >
               {matches && (
                  <RevealCards
                     cards={matches}
                     queryLabel={getCardLabel(
                        cardPlayed.queryCard,
                        cardPlayed.choice
                     )}
                     queryType={cardPlayed.queryCard.type}
                     owner={cardPlayed.opponent.name}
                     onClick={handleCloseRevealedCards}
                  />
               )}
            </ConfirmModal>
         </div>
      </DndContext>
   );
}
