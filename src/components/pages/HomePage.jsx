import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import useBoundStore from '../../store/store';
import Button from '../controls/Button';
import Input from '../controls/Input';
import PlayerAvatar from '../game/avatar/PlayerAvatar';
import Divider from '../layout/Divider';
import './HomePage.css';

export default function HomePage() {
   const settingsActions = useBoundStore((state) => state.settingsActions);
   const playerName = useBoundStore((state) => state.playerName);
   const playerAvatar = useBoundStore((state) => state.playerAvatar);
   const numberOfPlayers = useBoundStore((state) => state.numberOfPlayers);
   const startNewGame = useBoundStore((state) => state.startNewGame);

   const navigate = useNavigate();

   function handlePlayerNameChange(event) {
      settingsActions.setPlayerName(event.target.value);
   }

   function handleChangeNumberOfPlayers(event) {
      settingsActions.setNumberOfPlayers(event.target.value);
   }

   function handleStartNewGame() {
      //TODO: if there is a game in progress warn, or let return to game.
      //startNewGame(); //TODO: Temporary for easier testing
      navigate('/play');
   }

   return (
      <section className='homepage'>
         <h2>Welcome!</h2>
         <p>
            The Dragon Hatchery is in a commotion. An egg has gone missing, the
            problem is, they don't know which one. They need your help!
         </p>
         <Divider />
         <div className='flex-centered-columns'>
            <div className='setup-section'>
               <Input
                  id='player-name'
                  label='Player Name:'
                  type='string'
                  value={playerName}
                  onChange={handlePlayerNameChange}
               />
               <PlayerAvatar className='setup-avatar' />
               <Button
                  to='/settings'
                  color='green'
               >
                  Customize
               </Button>
            </div>
            <div className='setup-section'>
               <Input
                  id='players'
                  label='Number of Players:'
                  type='number'
                  min={3}
                  max={7}
                  value={numberOfPlayers}
                  onChange={handleChangeNumberOfPlayers}
               />
            </div>
         </div>
         <Divider />
         <div className='buttons-outer'>
            <div className='button-container'>
               <Button
                  onClick={handleStartNewGame}
                  shape='big'
               >
                  New Game
               </Button>
               <Button
                  to='/settings'
                  color='green'
                  shape='round'
                  title='Settings'
               >
                  <FontAwesomeIcon icon={faGear} />
               </Button>
            </div>
         </div>
      </section>
   );
}
