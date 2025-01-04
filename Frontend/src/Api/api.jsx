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
// const getCredentials = async (label_name) => {
//   try{
//     // {label_name = label_name.toLowerCase()}

//     let GET_CREDENTIALS_URL = `${BASE_URL}vault/labels/${label_name}/credentials/`
//     const response = await axios.get(GET_CREDENTIALS_URL,{label_name: label_name},{
//           headers: {
//             Authorization: `Bearer ${Cookies.get("access_token")}`, 
//           },
//           withCredentials: true, 
//         }
//     )
    
//     return response.data
//   }
//  catch (error) {
//   console.error("Error fetching vault credentials:", error);
//   throw error; 
//   }

// }
const getCredentials = async (label_name) => {
  try {
    const token = Cookies.get("access_token");
    const GET_CREDENTIALS_URL = `${BASE_URL}vault/labels/${label_name.toLowerCase()}/credentials/`;

    console.log("Fetching credentials from:", GET_CREDENTIALS_URL);
    console.log("Token being sent:", token);

    const response = await axios.get(GET_CREDENTIALS_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching vault credentials:", error);
    throw error;
  }
};


export default { loginRequest, registrationRequest, getLabels,getCredentials};