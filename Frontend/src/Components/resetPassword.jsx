import React, { useState } from 'react'
import './resetPassword.css'
import api from '../Api/api'
import { useNavigate } from 'react-router-dom'
const ResetPassword = () => {
    const navigate = useNavigate()
    let [resetEmail,setResetEmail] =useState('')
  return (
    <div className='wrapper1'>
        <input className ='resetInput' type="email" placeholder='example@email.com' onChange={(e) => setResetEmail(e.target.value)}
              value={resetEmail} />
        <button className='resetSubmit' onClick={async (event) =>{
            event.preventDefault()
            const response = await api.resetEmailRequest(resetEmail);
            
           if (response.message)
           {
            window.alert("We have successfully sent a reset link to your Email")
            
           }
           else{
            window.alert("False Info")
           }

        }
        }>Submit</button>
    </div>
  )
}

export default ResetPassword