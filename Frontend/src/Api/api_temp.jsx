import axios from 'axios'
import Cookies from 'js-cookie';
const BASE_URL = 'http://127.0.0.1:8000/'
const LOGIN_URL = `${BASE_URL}api/login/`
const REGISTRATION_URL = `${BASE_URL}user-registration/`
const GET_LABELS_URL = `${BASE_URL}vault/labels/`
const CREATE_LABEL = `${BASE_URL}vault/labels/create/`
const RESET_PASSWORD = `${BASE_URL}password-reset/`
const RESET_PASSWORD_CONFIRM = `${BASE_URL}password-reset-confirm/`
const LOGOUT_URL = `${BASE_URL}api/logout/`

const loginRequest = async (username,password) =>{
    const response = await axios.post(LOGIN_URL,{username:username,password:password},{ withCredentials: true })
    return response.data
};

const registrationRequest = async(username,email,password,confirm_password) =>{
    const response = await axios.post(REGISTRATION_URL,{username:username,email:email,password:password,confirm_password:confirm_password})
    return response.data
};


const createLabels =  async(createLabelname,createdDate) =>{
    const response = await axios.post(CREATE_LABEL,{name:createLabelname, created_at:createdDate},{withCredentials: true} )
    return response.data
};

const deleteLabels = async(vaultId) =>{
  const DELETE_LABEL = `${BASE_URL}vault/labels/${vaultId}/delete/`;
  const response = await axios.delete(DELETE_LABEL,{headers:{
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },withCredentials:true})
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
    const GET_CREDENTIALS_URL = `${BASE_URL}vault/labels/${label_name}/credentials/`;

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

const createCredentials = async (label_name,formData) => {
  try{
  const CREATE_CREDENTIALS = `${BASE_URL}vault/labels/${label_name}/credentials/create/`
  const response = await axios.post(CREATE_CREDENTIALS, formData,{headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`, 
  },withCredentials:true})
  return response.data
  }
  catch (error)
  {
    console.log("chalena yo")
  }
}

const deleteCredentials = async (credentialID,label_name) =>{
    const DELETE_CREDENTIALS = `${BASE_URL}vault/labels/${label_name}/credentials/${credentialID}/delete/`
    const response = await axios.delete(DELETE_CREDENTIALS, {withCredentials:true})
    return response.data
}
const updateCredentials = async (credentialID,label_name) =>{
  const UPDATE_CREDENTIALS = `${BASE_URL}vault/labels/${label_name}/credentials/${credentialID}/update/`
  const response = await axios.put(UPDATE_CREDENTIALS, {withCredentials:true})
  return response.data
}
const resetEmailRequest = async (email) =>{
  const response = await axios.post(RESET_PASSWORD,{ email: email})
  return response.data
}
const resetConfirm = async(uid,token,new_password,confirm_password) =>{
  const response = await axios.post(RESET_PASSWORD_CONFIRM,{uid ,token,new_password:new_password,confirm_password:confirm_password})
  return response.data
}
const logoutRequest = async () => {
  try {
    const response = await axios.post(LOGOUT_URL, {}, {
      withCredentials: true, // To send cookies
    });
    console.log("Logged out successfully:", response.data);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};



export default { logoutRequest,resetConfirm,resetEmailRequest,loginRequest,updateCredentials,registrationRequest,getLabels,getCredentials,createLabels,deleteLabels,deleteCredentials,createCredentials};