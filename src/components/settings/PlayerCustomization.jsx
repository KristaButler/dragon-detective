import useBoundStore from '../../store/store';
import ColorPicker from '../controls/colorpicker/ColorPicker';
import PlayerAvatar from '../game/avatar/PlayerAvatar';
import Input from '../controls/Input';
import Select from '../controls/Select';
import './PlayerCustomization.css';

//TODO: Find a better solution for these, or move to a constants file.
const AVATAR_COLORS = [
   {
      name: 'Teal',
      value: 'oklch(51.1% 0.096 186.391)',
      swatch: 'oklch(51.1% 0.096 186.391)',
   },
   {
      name: 'Orange',
      value: 'oklch(55.3% 0.195 38.402)',
      swatch: 'oklch(55.3% 0.195 38.402)',
   },
   {
      name: 'Yellow',
      value: 'oklch(55.4% 0.135 66.442)',
      swatch: 'oklch(55.4% 0.135 66.442)',
   },
   {
      name: 'Lime',
      value: 'oklch(53.2% 0.157 131.589)',
      swatch: 'oklch(53.2% 0.157 131.589)',
   },
   {
      name: 'Cyan',
      value: 'oklch(52% 0.105 223.128)',
      swatch: 'oklch(52% 0.105 223.128)',
   },
   {
      name: 'Blue',
      value: 'oklch(48.8% 0.243 264.376)',
      swatch: 'oklch(48.8% 0.243 264.376)',
   },
   {
      name: 'Purple',
      value: 'oklch(49.6% 0.265 301.924)',
      swatch: 'oklch(49.6% 0.265 301.924)',
   },
   {
      name: 'Pink',
      value: 'oklch(52.5% 0.223 3.958)',
      swatch: 'oklch(52.5% 0.223 3.958)',
   },
   {
      name: 'Slate',
      value: 'oklch(37.2% 0.044 257.287)',
      swatch: 'oklch(37.2% 0.044 257.287)',
   },
];

//TODO: Find a better solution for these, or move to a constants file.
const SKINTONES = [
   {
      name: 'Light',
      value: 'light',
      swatch: '#fbd3c7',
   },
   { name: 'Brown', value: 'brown', swatch: '#8c5e3c' },
];

//TODO: Find a better solution for these, or move to a constants file.
const GLASSES = ['None', 'Wings', 'Circle', 'Classic', 'Retro', 'Pink'];

//TODO: Find a better solution for these, or move to a constants file.
const EARRINGS = ['None', 'Circle', 'Flower', 'Twist'];

//TODO: Find a better solution for these, or move to a constants file.
const NECKLACES = ['None', 'Onyx', 'Rainbow'];

export default function PlayerCustomization() {
   const settingsActions = useBoundStore((state) => state.settingsActions);
   const playerAvatar = useBoundStore((state) => state.playerAvatar);
   const playerName = useBoundStore((state) => state.playerName);

   function handleBackgroundPicked(color) {
      settingsActions.setAvatarSetting('background', color);
   }

   function handleChangeValue(key, value) {
      settingsActions.setAvatarSetting(key, value);
   }

   function handleNameChange(event) {
      settingsActions.setPlayerName(event.target.value);
   }

   return (
      <div className='player-settings'>
         <div>
            <PlayerAvatar className='customize-avatar' />
         </div>
         <div className='player-settings-container'>
            <div className='player-name-wrapper'>
               <Input
                  id='player-name'
                  label='Player Name:'
                  type='string'
                  value={playerName}
                  onChange={handleNameChange}
               />
            </div>
            <div className='avatar-settings-controls'>
               <div className='avatar-controls-column'>
                  <div>
                     <ColorPicker
                        label='Background: '
                        onPickColor={handleBackgroundPicked}
                        defaultValue={playerAvatar.background}
                        list={AVATAR_COLORS}
                     />
                  </div>
                  <div>
                     <ColorPicker
                        label='Skintone: '
                        onPickColor={(value) =>
                           handleChangeValue('base', value)
                        }
                        defaultValue={playerAvatar.base}
                        list={SKINTONES}
                     />
                  </div>
                  <div>
                     <Input
                        id='avatar-shirt'
                        label='Shirt: '
                        type='number'
                        min={1}
                        max={16}
                        value={playerAvatar.shirt}
                        onChange={(event) =>
                           handleChangeValue('shirt', event.target.value)
                        }
                     />
                  </div>
                  <div>
                     <Input
                        id='avatar-hair'
                        label='Hair: '
                        type='number'
                        min={1}
                        max={16}
                        value={playerAvatar.hair}
                        onChange={(event) =>
                           handleChangeValue('hair', event.target.value)
                        }
                     />
                  </div>
               </div>
               <div className='avatar-controls-column'>
                  <div>
                     <Select
                        id='avatar-glasses'
                        label='Glasses: '
                        defaultValue={playerAvatar.glasses}
                        onChange={(event) =>
                           handleChangeValue('glasses', event.target.value)
                        }
                     >
                        {GLASSES.map((name, index) => (
                           <option
                              key={name}
                              value={index}
                           >
                              {name}
                           </option>
                        ))}
                     </Select>
                  </div>
                  <div>
                     <Select
                        id='avatar-earrings'
                        label='Earrings: '
                        defaultValue={playerAvatar.earrings}
                        onChange={(event) =>
                           handleChangeValue('earrings', event.target.value)
                        }
                     >
                        {EARRINGS.map((name, index) => (
                           <option
                              key={name}
                              value={index}
                           >
                              {name}
                           </option>
                        ))}
                     </Select>
                  </div>
                  <div>
                     <Select
                        id='avatar-necklace'
                        label='Necklace: '
                        defaultValue={playerAvatar.necklace}
                        onChange={(event) =>
                           handleChangeValue('necklace', event.target.value)
                        }
                     >
                        {NECKLACES.map((name, index) => (
                           <option
                              key={name}
                              value={index}
                           >
                              {name}
                           </option>
                        ))}
                     </Select>
                  </div>
                  <div>
                     <Input
                        id='beauty-mark'
                        label='Beauty Mark: '
                        type='checkbox'
                        defaultChecked={playerAvatar.beautymarked}
                        onChange={(event) =>
                           handleChangeValue('beautymark', event.target.checked)
                        }
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
