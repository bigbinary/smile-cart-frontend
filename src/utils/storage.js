const setToLocalStorage = (key, value) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
};

const getFromLocalStorage = key => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : "";
  } catch (error) {
    logger.error(error);

    return "";
  }
};

export { setToLocalStorage, getFromLocalStorage };
