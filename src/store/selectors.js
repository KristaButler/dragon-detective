const createSelectors = (useStore) => {
   let store = useStore;
   store.use = {};

   for (let k of Object.keys(store.getState())) {
      store.use[k] = () => store((state) => state[k]);
   }

   return store;
};

export default createSelectors;
