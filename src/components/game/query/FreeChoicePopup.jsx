import useBoundStore from '../../../store/store';
import Popup from '../../controls/popup/Popup';
import FreeChoiceOptions from './FreeChoiceOptions';
import { EGG_COLORS, SPECIES, COUNTS } from '../../../utils/utils';
import './FreeChoicePopup.css';

export default function FreeChoicePopup({ onClose, onSelect }) {
   const turnParams = useBoundStore((state) => state.turnParams);
   const card = turnParams.card;

   return (
      <div className='free-choice-container'>
         <Popup
            title='Select Free Choice Value'
            onClose={onClose}
         >
            {!card.color && (
               <FreeChoiceOptions
                  list={EGG_COLORS}
                  type='color'
                  onSelect={onSelect}
               />
            )}
            {!card.species && (
               <FreeChoiceOptions
                  list={SPECIES}
                  type='species'
                  onSelect={onSelect}
               />
            )}
            {!card.count && (
               <FreeChoiceOptions
                  list={COUNTS}
                  type='count'
                  onSelect={onSelect}
                  useIndex={true}
               />
            )}
         </Popup>
      </div>
   );
}
