const setData = (where, data) => {
  localStorage.setItem(where, JSON.stringify(data));
};

const getData = where => {
  return JSON.parse(localStorage.getItem(where));
};

export default { setData, getData };
