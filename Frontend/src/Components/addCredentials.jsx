import React, { useState } from 'react'
import './addCredentials.css'
import api from '../Api/api.jsx'
function AddCredentials({labelName,stateValue,setStateValue,refresh}) {
    const [username, setUsername] =useState('')
    const [password,setPassword] = useState('')
    const [notes,setNotes] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { username, password, notes };
        const response = await api.createCredentials(labelName,formData)
        console.log(response)
        setStateValue(!stateValue)
        setUsername('');
        setPassword('');
        setNotes('');
        refresh()
      };


  return (
    <>
    <form onSubmit={handleSubmit} className="simple-form">
      <div className="form-field">
        <label className="form-label">Username:</label>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label">Password:</label>
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label">Notes:</label>
        <textarea
          className="form-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button type="submit" className="form-submit-button" onClick={ () => handleSubmit}>Submit</button>
    </form>
    </>
  )
}

export default AddCredentials