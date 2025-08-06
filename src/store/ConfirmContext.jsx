import { createContext } from 'react';

export const ConfirmContext = createContext({
   showAlert: (title, message) => {
      let _ = title;
      let __ = message;
   },
   showConfirm: (title, message, action) => {
      let _ = title;
      let __ = message;
      let ___ = action;
   },
});
