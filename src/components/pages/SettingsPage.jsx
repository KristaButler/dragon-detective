import GameSettings from '../settings/GameSettings';
import PlayerCustomization from '../settings/PlayerCustomization';
import Divider from '../layout/Divider';
import Button from '../controls/Button';
import useBoundStore from '../../store/store';
import './SettingsPage.css';

export default function SettingsPage() {
   const resetSettings = useBoundStore(
      (state) => state.settingsActions.resetSettings
   );

   function handleResetSettings() {
      resetSettings();
   }

   return (
      <section className='settings-page page-padding'>
         <h2>Settings</h2>
         <Divider />
         <PlayerCustomization />
         <Divider />
         <GameSettings />
         <Divider />
         <div className='settings-buttons'>
            <Button to='/'>Back</Button>
            <Button
               color='green'
               onClick={handleResetSettings}
            >
               Reset
            </Button>
         </div>
         <div className='settings-note'>Settings are auto saved.</div>
      </section>
   );
}
