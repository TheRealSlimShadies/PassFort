
import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}user-login/`
const REGISTRATION_URL = `${BASE_URL}user-registration/`

const loginRequest = async (username,password) =>{
    const response = await axios.post(LOGIN_URL,{username:username,password:password})
    return response.data
};

const registrationRequest = async(username,email,password,confirm_password) =>{
    const response = await axios.post(REGISTRATION_URL,{username:username,email:email,password:password,confirm_password:confirm_password})
    return response.data
};
export default { loginRequest, registrationRequest};
