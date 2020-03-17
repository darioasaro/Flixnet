export const getUsers = async () => {
  return await fetch("./data/users.json")
    .then(response => response.json())
    .then(data => data);
};
export const login = async(user)=>{
  var response =  await fetch('http://localhost:3000/api/auth/login',{
    method : 'POST',
    headers:{
      'content-type':'application/json' 
    },
    body:JSON.stringify({
      'username': user.username,
      'password' : user.password
    })
  })
  var data = await response.json()
  return data
  
}

export const register = async(user)=>{
  var response =  await fetch('http://localhost:3000/api/auth/register',{
    method : 'POST',
    headers:{
      'content-type':'application/json' 
    },
    body:JSON.stringify({
      'username': user.username,
      'password' : user.password,
      'passwordConf' : user.passwordConf,
      'id_role':2
    })
  })
  var data = await response.json()
  return data
  
}

export const checkUsers = () => {
  return localStorage.getItem("username") ? true : false;
};
