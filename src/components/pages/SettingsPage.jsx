import GameSettings from '../settings/GameSettings';
import PlayerCustomization from '../settings/PlayerCustomization';
import Divider from '../layout/Divider';
import NavButton from '../controls/NavButton';
import Button from '../controls/Button';
import useBoundStore from '../../store/store';

export default function SettingsPage() {
   const resetSettings = useBoundStore((state) => state.settings.resetSettings);

   function handleResetSettings() {
      resetSettings();
   }

   return (
      <section>
         <h2>Settings</h2>
         <Divider />
         <PlayerCustomization />
         <Divider />
         <GameSettings />
         <Divider />
         <div className='flex gap-2 justify-center'>
            <NavButton to='/'>Back</NavButton>
            <Button
               secondary
               onClick={handleResetSettings}
            >
               Reset
            </Button>
         </div>
      </section>
   );
}
