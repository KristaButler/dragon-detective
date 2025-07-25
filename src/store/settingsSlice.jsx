export const DEFAULT_AVATAR = {
   background: 'oklch(51.1% 0.096 186.391)',
   base: 'light',
   shirt: 9,
   hair: 8,
   glasses: 2,
   necklace: 0,
   earrings: 0,
   beautymark: false,
};

const createSettingsSlice = (set, store) => ({
   settings: {
      playerName: 'Player 1',
      avatar: { ...DEFAULT_AVATAR },
      numberOfPlayers: 4,
      autoNotes: true,
      autoMarkPlayerEggs: true,
      autoMarkGlobalEggs: true,
      setPlayerName: (playerName) =>
         set((state) => {
            return { settings: { ...state.settings, playerName } };
         }),
      setAvatarSetting: (key, value) =>
         set((state) => {
            const newAvatar = { ...state.settings.avatar, [key]: value };

            return { settings: { ...state.settings, avatar: newAvatar } };
         }),
      setNumberOfPlayers: (numberOfPlayers) =>
         set((state) => {
            //Ensure number of players stays between 3 and 7
            if (numberOfPlayers < 3) {
               numberOfPlayers = 3;
            }
            if (numberOfPlayers > 7) {
               numberOfPlayers = 7;
            }

            return { settings: { ...state.settings, numberOfPlayers } };
         }),
      setAutoNotes: (autoNotes) =>
         set((state) => {
            return { settings: { ...state.settings, autoNotes } };
         }),
      setAutoMarkPlayerEggs: (autoMarkPlayerEggs) =>
         set((state) => {
            return { settings: { ...state.settings, autoMarkPlayerEggs } };
         }),
      setAutoMarkGlobalEggs: (autoMarkGlobalEggs) =>
         set((state) => {
            return { settings: { ...state.settings, autoMarkGlobalEggs } };
         }),
      resetSettings: () =>
         set(() => {
            const initialState = store.getInitialState();
            return { settings: { ...initialState.settings } };
         }),
   },
});

export default createSettingsSlice;
