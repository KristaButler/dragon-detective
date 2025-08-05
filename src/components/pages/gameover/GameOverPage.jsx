import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBoundStore from '../../../store/store';
import Card from '../../controls/cards/Card';
import PlayerSummary from './PlayerSummary';
import ClueSheet from '../../game/cluesheet/ClueSheet';
import Button from '../../controls/Button';
import { getById } from '../../../utils/utils';
import { EGG_POOL } from '../../../data/egg-pool';
import './GameOverPage.css';
import Collapsible from '../../controls/Collapsible';

export default function GameOverPage() {
   const navigate = useNavigate();
   const [isReset, setIsReset] = useState(false);
   const winner = useBoundStore((state) => state.winner);
   const players = useBoundStore((state) => state.players);
   const solution = useBoundStore((state) => state.solution);
   const resetGame = useBoundStore((state) => state.resetGame);

   useEffect(() => {
      if (isReset) {
         navigate('/play');
      } else if (!winner || !solution) {
         // If there's no winner or solution, redirect to home
         navigate('/');
      }
   }, [isReset, winner, solution, navigate]);

   const heading = winner === 'player' ? 'Congrats! You won!' : 'Game Over :(';
   const solutionEgg = getById(EGG_POOL, solution);

   function handlePlayAgain() {
      //Reset the game state and navigate to the play page
      resetGame();
      setIsReset(true);
   }

   if (!solutionEgg) {
      return null;
   }

   return (
      <section className='game-over-page page-padding'>
         <h2>{heading}</h2>
         <p className='game-over-summary'>
            The missing egg has been found! It was the {solutionEgg.name}.
         </p>
         <Card
            id={solution}
            card={solutionEgg}
         />
         <Collapsible title='Details'>
            <div>
               {players.map((player) => {
                  if (player.id !== 'player') {
                     return (
                        <PlayerSummary
                           key={player.id}
                           player={player}
                        />
                     );
                  }
               })}
            </div>
            <div className='game-over-cluesheet'>
               <ClueSheet />
            </div>
         </Collapsible>
         <div className='game-over-buttons'>
            <Button
               shape='big'
               onClick={handlePlayAgain}
            >
               Play Again
            </Button>
         </div>
      </section>
   );
}
