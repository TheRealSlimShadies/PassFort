import axios from 'axios'
import Cookies from 'js-cookie';
const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}api/login/`
const REGISTRATION_URL = `${BASE_URL}user-registration/`
const GET_LABELS_URL = `${BASE_URL}vault/labels/`

const loginRequest = async (username,password) =>{
    const response = await axios.post(LOGIN_URL,{username:username,password:password},{ withCredentials: true })
    return response.data
};

const registrationRequest = async(username,email,password,confirm_password) =>{
    const response = await axios.post(REGISTRATION_URL,{username:username,email:email,password:password,confirm_password:confirm_password})
    return response.data
};
const getLabels = async () => {
    try {
        const response = await axios.get(GET_LABELS_URL, {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`, 
          },
          withCredentials: true, 
        })
        return response.data;  
      } catch (error) {
        console.error("Error fetching vault labels:", error);
        throw error; 
      }
};

export default { loginRequest, registrationRequest, getLabels};