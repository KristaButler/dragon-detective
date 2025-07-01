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

export default function PlayArea() {
   const dispatch = useDispatch();
   const playersEggs = useSelector((state) => state.eggs.playerEggs);
   const [cardPlayed, setCardPlayed] = useState();
   const [matches, setMatches] = useState(null);
   const confirmQuery = useRef();
   const revealCards = useRef();

   function handleDragEnd(event) {
      const opponentId = event.over?.id || null;
      const queryCardId = event.active?.id || null;

      if (event.over && opponentId && queryCardId) {
         const opponent = OPPONENTS.find((opp) => opp.id === opponentId);
         const queryCard = QUERY_POOL.find((query) => query.id === queryCardId);

         setCardPlayed({
            message: `Ask ${opponent.name} ${getQuestion(queryCard)}?`,
            queryCard,
            opponent,
         });

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
            setMatches(getMatches(opponentEggs, cardPlayed.queryCard, choice));
            revealCards.current.open();
         }
      }
   }

   function handleCloseRevealedCards() {
      revealCards.current.close();

      setCardPlayed(null);
      setMatches(null);

      dispatch(queryDeckActions.draw('player'));
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
                     message={cardPlayed.message}
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
                     queryLabel={getCardLabel(cardPlayed.queryCard)}
                     queryType={cardPlayed.queryCard.type}
                     owner={cardPlayed.opponent.name}
                  />
               )}
            </ConfirmModal>
         </div>
      </DndContext>
   );
}
