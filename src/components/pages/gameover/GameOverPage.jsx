import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useBoundStore from '../../../store/store';
import Card from '../../controls/cards/Card';
import PlayerSummary from './PlayerSummary';
import ClueSheet from '../../game/cluesheet/ClueSheet';
import Button from '../../controls/Button';
import Divider from '../../layout/Divider';
import { getById } from '../../../utils/utils';
import { EGG_POOL } from '../../../data/egg-pool'; //TODO: Move to constants folder maybe?
import './GameOverPage.css';

export default function GameOverPage() {
   const navigate = useNavigate();
   const winner = useBoundStore((state) => state.winner);
   const players = useBoundStore((state) => state.players);
   const solution = useBoundStore((state) => state.solution);

   useEffect(() => {
      if (!winner || !solution) {
         // If there's no winner or solution, redirect to home
         navigate('/');
      }
   }, [winner, solution, navigate]);

   const heading = winner === 'player' ? 'Congrats! You won!' : 'Game Over :(';
   const solutionEgg = getById(EGG_POOL, solution);

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
         <Divider />
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
         <Divider />
         <div className='game-over-buttons'>
            <Button shape='big'>Play Again</Button>
         </div>
      </section>
   );
}
