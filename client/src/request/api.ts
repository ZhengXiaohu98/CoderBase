import userService from ".";

interface registerData {
  username:string,
  password:string,
  email:string
}

export function register(data:registerData) {
  return userService({
    url:"/register",
    method:"post",
    data
  })
}

interface loginData {
  username:string,
  password:string,
}

export function login(data:loginData) {
  return userService({
    url:"/login",
    method:"post",
    data
  })
}

export function conngit(id:string, github:string) {
  return userService({
    url:`/connectgit/${id}`,
    method:"post",
    data:{
      github
    }
  })
}

export function connlc(id:string, leetcode:string) {
  return userService({
    url:`/connectlc/${id}`,
    method:"post",
    data:{
      leetcode
    }
  })
}