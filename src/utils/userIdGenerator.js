const USER_ID_KEY = 'wordFinderUserId';


export const generateUserId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 9);
  return `user_${timestamp}_${randomPart}`;
};

export const getOrCreateUserId = () => {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) {
      return stored;
    }
    
    const newUserId = generateUserId();
    localStorage.setItem(USER_ID_KEY, newUserId);
    return newUserId;
  } catch (error) {
    console.error('Error managing userId:', error);
    return generateUserId();
  }
};

export const setUserId = (userId) => {
  try {
    localStorage.setItem(USER_ID_KEY, userId);
  } catch (error) {
    console.error('Error setting userId:', error);
  }
};

export const regenerateUserId = () => {
  const newUserId = generateUserId();
  setUserId(newUserId);
  return newUserId;
};

export const clearUserId = () => {
  try {
    localStorage.removeItem(USER_ID_KEY);
  } catch (error) {
    console.error('Error clearing userId:', error);
  }
};