const STORAGE_KEY = 'wordFinderSettings';
const STORAGE_PROFILE_KEY = 'wordFinderProfile';


export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadSettings = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
};

export const getDefaultSettings = () => ({
  language: 'ukr',
  difficulty: '5x5',
  theme: 'default',
  gameMode: 'classic',
  timeLimit: 180,
  maxWordLength: 5,
  soundEnabled: true
});

export const getInitialSettings = () => {
    const saved = loadSettings();
    const defaults = getDefaultSettings();
    
    if (saved) {
        return { ...defaults, ...saved };
    }
    return defaults;
}


