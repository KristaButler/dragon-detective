import useStore from '../../store/store';
import Input from '../controls/Input';

export default function GameSettings() {
   const settingsActions = useStore.use.settingsActions();
   const numberOfPlayers = useStore.use.numberOfPlayers();
   const autoNotes = useStore.use.autoNotes();
   const autoMarkPlayerEggs = useStore.use.autoMarkPlayerEggs();

   function handleChangeNumberOfPlayers(event) {
      settingsActions.setNumberOfPlayers(event.target.value);
   }

   function handleChangeAutoNotes(event) {
      settingsActions.setAutoNotes(event.target.checked);
   }

   function handleChangeAutoMarkPlayerEggs(event) {
      settingsActions.setAutoMarkPlayerEggs(event.target.checked);
   }

   return (
      <>
         <div>Game Parameters:</div>
         <div className='game-settings'>
            <div>
               <Input
                  id='players'
                  label='Number of Players:'
                  type='number'
                  min={3}
                  max={7}
                  value={numberOfPlayers}
                  title='Number of players, including you.'
                  onChange={handleChangeNumberOfPlayers}
               />
            </div>
            <div>
               <Input
                  id='auto-notes'
                  label='Enable Automatic Notes: '
                  type='checkbox'
                  defaultChecked={autoNotes}
                  title='Track notes based on all player turns.'
                  onChange={handleChangeAutoNotes}
               />
            </div>
            <div>
               <Input
                  id='markEggs'
                  label='Mark your eggs on game start: '
                  type='checkbox'
                  defaultChecked={autoMarkPlayerEggs}
                  title='Automatcially mark which eggs you have at the beginning of the game.'
                  onChange={handleChangeAutoMarkPlayerEggs}
               />
            </div>
         </div>
      </>
   );
}
