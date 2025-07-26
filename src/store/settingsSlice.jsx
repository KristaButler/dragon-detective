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

const INITIAL_STATE = {
   playerName: 'Player 1',
   playerAvatar: { ...DEFAULT_AVATAR },
   numberOfPlayers: 4,
   autoNotes: true,
   autoMarkPlayerEggs: true,
};

const createSettingsSlice = (set, store) => ({
   ...INITIAL_STATE,
   settingsActions: {
      setPlayerName: (newPlayerName) =>
         set((state) => {
            return { playerName: newPlayerName };
         }),
      setAvatarSetting: (key, value) =>
         set((state) => {
            const newAvatar = { ...state.playerAvatar, [key]: value };

            return { playerAvatar: newAvatar };
         }),
      setNumberOfPlayers: (newNumberOfPlayers) =>
         set((state) => {
            //Ensure number of players stays between 3 and 7
            if (newNumberOfPlayers < 3) {
               newNumberOfPlayers = 3;
            }
            if (newNumberOfPlayers > 7) {
               newNumberOfPlayers = 7;
            }

            return { numberOfPlayers: newNumberOfPlayers };
         }),
      setAutoNotes: (newAutoNotes) =>
         set((state) => {
            return { autoNotes: newAutoNotes };
         }),
      setAutoMarkPlayerEggs: (newAutoMarkPlayerEggs) =>
         set((state) => {
            return { autoMarkPlayerEggs: newAutoMarkPlayerEggs };
         }),
      resetSettings: () =>
         set(() => {
            return {
               ...INITIAL_STATE,
            };
         }),
   },
});

export default createSettingsSlice;
