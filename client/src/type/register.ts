export interface RegisterFormInterface {
  username: string,
  password: string,
  rePassword: string,
  email: string
}

export class RegisterData {
  ruleForm:RegisterFormInterface={
    username:"",
    password:"",
    rePassword:"",
    email:""
  }
}