import React, { useState } from 'react'
import './addLabels.css'
import api from '../Api/api.jsx'
const AddLabels = ({stateValue,setStateValue}) =>{
  let [newVault,setnewVault] = useState()


  const handleCreateVault = async (event) => {
      try {
        const response = await api.createLabels(newVault, new Date().toJSON());
        setStateValue(!stateValue)
        console.log(response);
      } catch (error) {
        console.error("Vault Creation Failed:", error);
      }
    };
  return (
    <>
        <div className="addLabelsWrapper">
            <label htmlFor="" className='vaultName'>Enter Vault Name</label>
            <input onChange= {(e) =>setnewVault(e.target.value)} value ={newVault} type="text" placeholder='Enter Vault Name' />
            <button className='Createbtn' onClick= {handleCreateVault}
              
            >Create</button>
        </div>
    </>
  )
};

export default AddLabels