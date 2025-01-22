import React, { useState } from "react";
import api from '../Api/api'
import { useParams } from "react-router-dom";
import './ConfirmReset.css'
function ConfirmReset() {
    const { uid, token } = useParams(); 
    let [newPassword,setNewPassword] = useState('')
    let [newPasswordConfirm,setNewPasswordConfirm] = useState('')
    return (
      <div className="resetConfirm">
        <h1>Reset Password</h1>
        <input className="resetConfirm" type="password" placeholder="newPassword" onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}></input>
        <input className="resetConfirm" type="password" placeholder="confirmPassword" onChange={(e) => setNewPasswordConfirm(e.target.value)}
              value={newPasswordConfirm}></input>
        <button className="resetConfirm" onClick={ async (event) =>{
            event.preventDefault()
            try{const response = await api.resetConfirm(uid,token,newPassword,newPasswordConfirm)
            console.log(response.data)}
            catch (error){
                console.log(error)
            }

        }}>Submit</button>
      </div>
    );
}

export default ConfirmReset;
