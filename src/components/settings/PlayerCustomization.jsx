import ColorPicker from '../controls/ColorPicker/ColorPicker';
import PlayerAvatar from '../game/PlayerAvatar';
import Input from '../controls/Input';
import Select from '../controls/Select';
import useBoundStore from '../../store/store';

//TODO: Move to backend eventually
const COLORS = [
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

//TODO: Move to backend eventually
const SKINTONES = [
   {
      name: 'Light',
      value: 'light',
      swatch: '#fbd3c7',
   },
   { name: 'Brown', value: 'brown', swatch: '#8c5e3c' },
];

//TODO: Move to backend eventually
const GLASSES = ['None', 'Wings', 'Circle', 'Classic', 'Retro', 'Pink'];

//TODO: Move to backend eventually
const EARRINGS = ['None', 'Circle', 'Flower', 'Twist'];

//TODO: Move to backend eventually
const NECKLACES = ['None', 'Onyx', 'Rainbow'];

export default function PlayerCustomization() {
   const settings = useBoundStore((state) => state.settings);

   function handleBackgroundPicked(color) {
      settings.setAvatarSetting('background', color);
   }

   function handleChangeValue(key, value) {
      settings.setAvatarSetting(key, value);
   }

   function handleNameChange(event) {
      settings.setPlayerName(event.target.value);
   }

   return (
      <div className='flex gap-4 mt-4'>
         <div>
            <PlayerAvatar
               className='h-64 w-64'
               avatar={settings.avatar}
            />
         </div>
         <div className='flex flex-col'>
            <div className='mb-4'>
               <Input
                  id='player-name'
                  label='Player Name:'
                  type='string'
                  value={settings.playerName}
                  onChange={handleNameChange}
               />
            </div>
            <div className='flex gap-8'>
               <div className='flex flex-col gap-2 items-end'>
                  <div>
                     <ColorPicker
                        label='Background: '
                        onPickColor={handleBackgroundPicked}
                        defaultValue={settings.avatar.background}
                        list={COLORS}
                     />
                  </div>
                  <div>
                     <ColorPicker
                        label='Skintone: '
                        onPickColor={(value) =>
                           handleChangeValue('base', value)
                        }
                        defaultValue={settings.avatar.base}
                        list={SKINTONES}
                     />
                  </div>
                  <div>
                     <Input
                        label='Shirt: '
                        type='number'
                        min={1}
                        max={16}
                        value={settings.avatar.shirt}
                        onChange={(event) =>
                           handleChangeValue('shirt', event.target.value)
                        }
                     />
                  </div>
                  <div>
                     <Input
                        label='Hair: '
                        type='number'
                        min={1}
                        max={16}
                        value={settings.avatar.hair}
                        onChange={(event) =>
                           handleChangeValue('hair', event.target.value)
                        }
                     />
                  </div>
               </div>
               <div className='flex flex-col gap-2 items-end'>
                  <div>
                     <Select
                        label='Glasses: '
                        defaultValue={settings.avatar.glasses}
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
                        label='Earrings: '
                        defaultValue={settings.avatar.earrings}
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
                        label='Necklace: '
                        defaultValue={settings.avatar.necklace}
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
                        label='Beauty Mark: '
                        type='checkbox'
                        defaultChecked={settings.avatar.beautymarked}
                        onChange={(event) =>
                           handleChangeValue('beautymark', event.target.value)
                        }
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
