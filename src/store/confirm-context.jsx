import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBoundStore from './store';
import Confirm from '../components/controls/popup/Confirm';

export const ConfirmContext = createContext({
   showAlert: (title, message) => {},
   showConfirm: (title, message, action) => {},
});

export default function ConfirmContextProvider({ children }) {
   const [isConfirming, setIsConfirming] = useState(false);
   const [config, setConfig] = useState(null);
   const turnParams = useBoundStore((state) => state.turnParams);
   const turnActions = useBoundStore((state) => state.turnActions);
   const gameActions = useBoundStore((state) => state.gameActions);
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
         }

         if (action === 'DISCARD_HAND') {
            turnActions.discardHand();
            gameActions.nextPlayer();
         }

         if (action === 'LEAVE_GAME') {
            navigate('/');
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
            className='relative w-full h-full'
            onClick={close}
         >
            {isConfirming && (
               <div className='absolute w-full h-full z-150 bg-zinc-900/50'>
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
