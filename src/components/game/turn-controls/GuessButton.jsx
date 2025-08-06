import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassArrowRight } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../../store/store';
import Button from '../../controls/Button';
import ConfirmContext from '../../../store/ConfirmContext';
import { getById } from '../../../utils/utils';
import { EGG_POOL } from '../../../data/egg-pool';

export default function GuessButton({ className, isCurrentPlayer }) {
   const turnParams = useStore.use.turnParams();
   const turnActions = useStore.use.turnActions();
   const { showConfirm, showAlert } = useContext(ConfirmContext);

   const isGuessing = turnParams.guessing;

   const classes = `${
      isGuessing ? 'guessing animate-pulse pause-animation' : ''
   } ${className}`;

   function handleClick() {
      if (!turnParams.guessing) {
         turnActions.setMessage(
            'Choose an egg on your cluesheet then press the Guess Button again.'
         );
         turnActions.setTurnParams({ guessing: true });
      } else if (turnParams.guess) {
         const egg = getById(EGG_POOL, turnParams.guess);
         showConfirm(
            'Are you sure?',
            `Are you sure you want to guess the ${egg.name}? This will end the game.`,
            'CONFIRM_GUESS'
         );
      } else {
         showAlert(
            'Select an egg',
            'You must select an egg on your cluesheet to guess.'
         );
      }
   }

   return (
      <>
         <Button
            className={classes}
            shape='round'
            color='green'
            disabled={!isCurrentPlayer}
            title='Make a guess.'
            onClick={handleClick}
         >
            <FontAwesomeIcon icon={faMagnifyingGlassArrowRight} />
         </Button>
      </>
   );
}
