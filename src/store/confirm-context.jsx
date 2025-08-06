import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './store';
import ConfirmContext from './ConfirmContext';
import Confirm from '../components/controls/popup/Confirm';
import './confirm-context.css';

export default function ConfirmContextProvider({ children }) {
   const [isConfirming, setIsConfirming] = useState(false);
   const [config, setConfig] = useState(null);
   const turnParams = useStore.use.turnParams();
   const turnActions = useStore.use.turnActions();
   const gameActions = useStore.use.gameActions();
   const navigate = useNavigate();

   function showConfirm(title, message, action) {
      setConfig({ title, message, action, type: 'confirm' });
      setIsConfirming(true);
   }

   function showAlert(title, message) {
      setConfig({ title, message, action: 'ALERT', type: 'alert' });
      setIsConfirming(true);
   }

   function doConfirmAction(action, confirmed) {
      setIsConfirming(false);

      if (confirmed && action !== 'ALERT') {
         if (action === 'CONFIRM_GUESS') {
            turnActions.makeGuess(turnParams.guess);
            navigate('/gameover');
            return null;
         }

         if (action === 'DISCARD_HAND') {
            turnActions.discardHand();
            gameActions.nextPlayer();
         }

         if (action === 'LEAVE_GAME') {
            navigate('/');
            return null;
         }
      }

      setConfig(null);
   }

   function close() {}

   const context = {
      showConfirm,
      showAlert,
   };

   return (
      <ConfirmContext.Provider value={context}>
         <div
            className='confirm-context-container'
            onClick={close}
         >
            {isConfirming && (
               <div className='confirm-context-backdrop'>
                  <Confirm
                     title={config.title}
                     message={config.message}
                     type={config.type}
                     onConfirm={(confirmed) =>
                        doConfirmAction(config.action, confirmed)
                     }
                  />
               </div>
            )}
            {children}
         </div>
      </ConfirmContext.Provider>
   );
}
