export const getUsers = async () => {
  return await fetch("./data/users.json")
    .then(response => response.json())
    .then(data => data);
};

export const checkUsers = () => {
  return localStorage.getItem("username") ? true : false;
};
