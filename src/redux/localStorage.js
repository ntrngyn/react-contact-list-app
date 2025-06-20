export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("contactsState");
    if (serializedState === null) {
      return undefined; // Để Redux dùng initialState của reducer
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("contactsState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
