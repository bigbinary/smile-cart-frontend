const setToLocalStorage = (key, value) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
};

const getFromLocalStorage = key => {
  let response = null;
  try {
    const value = localStorage.getItem(key);
    response = value ? JSON.parse(value) : null;
  } catch {
    response = null;
  }

  return response;
};

export { setToLocalStorage, getFromLocalStorage };
