import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import useBoundStore from '../../store/store';
import Button from '../controls/Button';
import Input from '../controls/Input';
import NavButton from '../controls/NavButton';
import PlayerAvatar from '../game/PlayerAvatar';
import Divider from '../layout/Divider';

export default function HomePage() {
   const settings = useBoundStore((state) => state.settings);
   const startNewGame = useBoundStore((state) => state.startNewGame);

   const navigate = useNavigate();

   function handlePlayerNameChange(event) {
      settings.setPlayerName(event.target.value);
   }

   function handleChangeNumberOfPlayers(event) {
      settings.setNumberOfPlayers(event.target.value);
   }

   function handleStartNewGame() {
      //TODO: if there is a game in progress warn, or let return to game.
      //startNewGame(); //TODO: Temporary for easier testing
      navigate('/play');
   }

   return (
      <section className='pt-5'>
         <h2>Welcome!</h2>
         <p>
            The Dragon Hatchery is in a commotion. An egg has gone missing, the
            problem is, they don't know which one. They need your help!
         </p>
         <Divider />
         <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center mt-4 gap-2'>
               <Input
                  id='player-name'
                  label='Player Name:'
                  type='string'
                  value={settings.playerName}
                  onChange={handlePlayerNameChange}
               />
               <PlayerAvatar
                  className='h-32 w-32'
                  avatar={settings.avatar}
               />
               <NavButton
                  to='/settings'
                  secondary
               >
                  Customize
               </NavButton>
            </div>
            <div className='flex flex-col items-center mt-4 gap-2'>
               <Input
                  id='players'
                  label='Number of Players:'
                  type='number'
                  min={3}
                  max={7}
                  value={settings.numberOfPlayers}
                  onChange={handleChangeNumberOfPlayers}
               />
            </div>
         </div>
         <Divider />
         <div className='mt-4 mb-4'>
            <div className='flex justify-center items-center'>
               <Button
                  onClick={handleStartNewGame}
                  size='big'
               >
                  New Game
               </Button>
               <NavButton
                  to='/settings'
                  secondary
                  round
                  title='Settings'
               >
                  <FontAwesomeIcon icon={faGear} />
               </NavButton>
            </div>
         </div>
      </section>
   );
}
