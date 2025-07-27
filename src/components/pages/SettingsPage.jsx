import GameSettings from '../settings/GameSettings';
import PlayerCustomization from '../settings/PlayerCustomization';
import Divider from '../layout/Divider';
import Button from '../controls/Button';
import useBoundStore from '../../store/store';

export default function SettingsPage() {
   const resetSettings = useBoundStore(
      (state) => state.settingsActions.resetSettings
   );

   function handleResetSettings() {
      resetSettings();
   }

   return (
      <section className='h-full p-4'>
         <h2>Settings</h2>
         <Divider />
         <PlayerCustomization />
         <Divider />
         <GameSettings />
         <Divider />
         <div className='flex gap-2 justify-center'>
            <Button to='/'>Back</Button>
            <Button
               color='green'
               onClick={handleResetSettings}
            >
               Reset
            </Button>
         </div>
         <div className='italic place-self-center pt-1'>
            Settings are auto saved.
         </div>
      </section>
   );
}
