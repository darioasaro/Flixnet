const setData = (where, data) => {
  localStorage.setItem(where, JSON.stringify(data));
};

const getData = async where => {
  let ret = await localStorage.getItem(where);
  let json = await JSON.parse(ret);
  return json;
};

const deleteData = data => {
  localStorage.removeItem(data);
};
export default { setData, getData, deleteData };
