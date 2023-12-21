export const setToLocalStorage = (key, value) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
};

export const getFromLocalStorage = key => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};
