import { useDroppable } from '@dnd-kit/core';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBestPlay, getCardLabel, getMatches } from '../util/query-deck-util';
import { OPPONENTS, PLAYER } from '../data/player-pool';
import ConfirmModal from './ConfirmModal';
import { playersActions } from '../store/players-slice';
import { turnsActions } from '../store/turns-slice';
import { queryDeckActions } from '../store/query-deck-slice';
import { clueSheetsActions } from '../store/clue-sheets-slice';

export default function Opponent({ id, name, avatar }) {
   const [turnMessage, setTurnMessage] = useState();
   const playersTurnModal = useRef();
   const dispatch = useDispatch();
   const { isOver, setNodeRef } = useDroppable({
      id,
   });
   const playersEggs = useSelector((state) => state.eggs.playerEggs);
   const currentPlayer = useSelector((state) => state.players.currentPlayer);
   const allPlayers = useSelector((state) => state.players.players);
   const playerHands = useSelector((state) => state.queryDeck.playerHands);
   const clueSheets = useSelector((state) => state.clueSheets.clueSheets);

   const isCurrentPlayer = currentPlayer === id;

   useEffect(() => {
      if (isCurrentPlayer) {
         takeTurn();

         setTimeout(() => {
            playersTurnModal.current.open();
         }, 3000); //Wait to add a bit of delay between computer players turns.
      }
   }, [isCurrentPlayer, playersTurnModal]);

   let imgClasses =
      'w-16 h-16 md:w-32 md:h-32 sm:w-24 sm:h-24 rounded-full mb-2';

   if (isCurrentPlayer) {
      imgClasses += ' border-4 border-rose-600 shadow-lg shadow-slate-900';
   }

   if (isOver) {
      imgClasses += ' border-4 border-lime-600 shadow-lg shadow-slate-900';
   }

   function playACard(clues) {
      const players = allPlayers.filter((player) => player.id !== id);
      const hand =
         playerHands.find((hand) => hand.playerId === id)?.cards || [];

      const [queryCard, choice, askPlayer] = getBestPlay(clues, hand, players);

      let opponent = OPPONENTS.find((opp) => opp.id === askPlayer);

      if (askPlayer === 'player') {
         opponent = PLAYER;
      }

      const opponentEggs = playersEggs[askPlayer];
      const cardMatches = getMatches(opponentEggs, queryCard, choice);

      //Play the card, set the matches, discard the played card, record the turn, and draw a new card
      dispatch(
         turnsActions.playCard({ cardPlayed: { queryCard, opponent }, choice })
      );
      dispatch(turnsActions.setMatches({ matches: cardMatches }));
      dispatch(
         queryDeckActions.discard({
            playerId: id,
            discardId: queryCard.id,
         })
      );
      dispatch(
         turnsActions.recordTurn({
            playerId: id,
            cardPlayed: { queryCard, opponent, choice },
            matches: cardMatches,
         })
      );
      dispatch(queryDeckActions.draw(id));

      if (queryCard.type === 'show') {
         //Mark Matches
         cardMatches.forEach((egg) => {
            dispatch(
               clueSheetsActions.setEggOwner({
                  playerId: id,
                  ownerId: askPlayer,
                  eggId: egg.id,
               })
            );
         });
      }

      //Build message to display turn result
      let message = `${name} played their turn.`;
      console.log(name + ': Getting card label with choice: ', choice);
      let cardLabel = getCardLabel(queryCard, choice);

      if (queryCard.type === 'show') {
         const display = askPlayer === 'player' ? 'your' : cardMatches.length;

         message = `${opponent.name} showed ${name} ${display} ${cardLabel}s.`;
      }

      if (queryCard.type === 'quantity') {
         const verb = askPlayer === 'player' ? 'have' : 'has';
         message = `${name} found out ${opponent.name} ${verb} ${cardMatches} ${cardLabel}s.`;
      }

      setTurnMessage(message);
   }

   function takeTurn() {
      const clues =
         clueSheets.find((sheet) => sheet.playerId === id)?.clues || [];

      //For now, this is easy mode, so computer player won't guess until they have seen all cards
      const readyToGuess = clues.length === 36;

      if (readyToGuess) {
         setTurnMessage(`${name} guessed the missing card!`); //Since we are waiting to see all cards, computer player auto guesses the solution

         dispatch(turnsActions.recordGuess({ id, guess, result: true }));
         dispatch(turnsActions.endGame(id));
      } else {
         playACard(clues);
      }
   }

   function handleEndTurn() {
      if (isCurrentPlayer) {
         dispatch(playersActions.nextPlayer());
      }
   }

   return (
      <>
         <ConfirmModal
            actions='OK'
            ref={playersTurnModal}
            onClose={handleEndTurn}
            id='end-turn-modal   '
         >
            <p>{turnMessage}</p>
         </ConfirmModal>
         <div
            id={id}
            className='flex flex-col items-center p-4'
            ref={setNodeRef}
         >
            <img
               src={avatar}
               alt={`${name}'s avatar`}
               className={imgClasses}
            />
            <p className={isCurrentPlayer ? 'font-bold' : 'text-slate-400'}>
               {name}
            </p>
            {isCurrentPlayer && <p className='text-xs'>(taking thier turn)</p>}
         </div>
      </>
   );
}
