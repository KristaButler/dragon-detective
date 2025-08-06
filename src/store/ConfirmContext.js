import { createContext } from 'react';

const ConfirmContext = createContext({
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

export default ConfirmContext;
