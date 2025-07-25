import useBoundStore from '../../store/store';
import Input from '../controls/Input';

export default function GameSettings() {
   const settings = useBoundStore((state) => state.settings);

   function handleChangeNumberOfPlayers(event) {
      settings.setNumberOfPlayers(event.target.value);
   }

   function handleChangeAutoNotes(event) {
      settings.setAutoNotes(event.target.checked);
   }

   function handleChangeAutoMarkPlayerEggs(event) {
      settings.setAutoMarkPlayerEggs(event.target.checked);
   }

   function handleChangeAutoMarkGlobalEggs(event) {
      settings.setAutoMarkGlobalEggs(event.target.checked);
   }

   return (
      <>
         <div>Game Parameters:</div>
         <div className='flex flex-col gap-4 mt-4'>
            <div>
               <Input
                  id='players'
                  label='Number of Players:'
                  type='number'
                  min={3}
                  max={7}
                  value={settings.numberOfPlayers}
                  title='Number of players, including you.'
                  onChange={handleChangeNumberOfPlayers}
               />
            </div>
            <div>
               <Input
                  label='Enable Automatic Notes: '
                  type='checkbox'
                  defaultChecked={settings.autoNotes}
                  title='Automatically track notes based on all player turns.'
                  onChange={handleChangeAutoNotes}
               />
            </div>
            <div>
               <Input
                  label='Mark your eggs on game start: '
                  type='checkbox'
                  defaultChecked={settings.autoMarkPlayerEggs}
                  title='Automatcially mark which eggs you have at the beginning of the game.'
                  onChange={handleChangeAutoMarkPlayerEggs}
               />
            </div>
            <div>
               <Input
                  label='Mark tabled eggs on game start: '
                  type='checkbox'
                  defaultChecked={settings.autoMarkGlobalEggs}
                  title='Automatically mark the tabled eggs, or the extra eggs after distributing them amoung players. These eggs are known by all players.'
                  onChange={handleChangeAutoMarkGlobalEggs}
               />
            </div>
         </div>
      </>
   );
}
