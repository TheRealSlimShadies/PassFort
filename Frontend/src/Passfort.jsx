import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import api from './Api/api';
import Sidebar from './Components/Sidebar';
import Vault from './Components/Vault';
import EditCredentials from './Components/EditCredentials';
import './Passfort.css';
import AddLabels from './Components/addLabels';
import AddCredentials from './Components/addCredentials';

const customStyles = {
  content: {
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    margin: '0',
    padding: '0',
    width: '100vw',
    height: '100vh',
  },
};


Modal.setAppElement('#root'); // Accessibility setting

const Passfort = () => {
  const [labels, setLabels] = useState([]); // For vault labels
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state
  const [selectedVault, setSelectedVault] = useState(null); // Selected vault name
  const [credentials, setCredentials] = useState([]); // Vault credentials
  const [toggle,setToggle] = useState(false);
  const [editUsername, setEditUsername] = useState(''); // Username to edit
  const [editPassword, setEditPassword] = useState(''); // Password to edit
  const [editID,setEditID] = useState('')
  const [toggleAdd,setToggleAdd] = useState(false);
  const [vaultID,setVaultID] =useState(null);
  const [Formtoggle,setFormToggle] = useState(false)



  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await api.getLabels();
        setLabels(response);
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      }
    };

    fetchLabels();
  }, [toggleAdd,credentials]);

  const openModal = async (vaultLabel,vaultid) => {
    setSelectedVault(vaultLabel);
    setVaultID(vaultid);
    try {
      const response = await api.getCredentials(vaultLabel);
      console.log(response)
      setCredentials(response); 
    } catch (error) {
      console.error(`Failed to fetch credentials for ${vaultLabel}:`, error);
      setCredentials([]); 
    }

    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedVault(null);
    setCredentials([]);
    setVaultID(null);
  };
  const deleteLabel = async(vaultId) =>{
    try{
      const response = await api.deleteLabels(vaultId);
      setModalIsOpen(false);
      setSelectedVault(null);
      setCredentials([]);
      setVaultID(null);
      console.log(response)
    }
    catch (error)
    {
      console.log(error)
    }
  }
  const deleteCred = async (credid, vaultname) => {
    try {
      const response = await api.deleteCredentials(vaultname, credid);
      openModal(selectedVault,vaultID)
      return response.data
    } catch (error) {
      console.log("Error deleting credential:", error);
    }
  };
  const updateCred = async (credid,vaultname) =>{
    try{
      const response = await api.updateCredentials(vaultname,credid);
      openModal(selectedVault,vaultID)
      return response.data
    }
    catch (error){
      console.log("Error Updating Credential",error)
    }
  }
  const refreshPage = ()=> {
    openModal(selectedVault,vaultID)
  }

  return (
    <>
      <div className="Home">
        <div className="HomeSidebar">
          <Sidebar />
        </div>
        <div className="Vaults">
          {labels.map((label) => (
            <Vault key={label.id} label={label.name} onClick={() => openModal(label.name,label.id)} />
          ))}
        </div>
        <button className="createLabel" onClick={() =>{setToggleAdd((state) => {
                    return !state
                  })}}>Create Label</button>
      </div>

      {toggle?
        <EditCredentials username = {editUsername} password={editPassword} onclose={() =>setToggle()} credID={editID} containerName = {selectedVault} deleteCreden={(credID, containerName) => deleteCred(containerName, credID)}/>
        :
        ""
      }

      {toggleAdd?
        <AddLabels stateValue = {toggleAdd} setStateValue = {setToggleAdd} addVaultID ={vaultID}/>
        :
        ""
      }
      {Formtoggle?
        <AddCredentials labelName = {selectedVault} stateValue = {Formtoggle} setStateValue = {setFormToggle} refresh={refreshPage}/>
        :
        ""
      }

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Vault Modal"
      >
        <h2>{selectedVault} Credentials</h2>
        {/* {credentials.length > 0 ? (
          <ul>
            {credentials.map((cred, index) => (
              <li key={index} className='CredVault'>
                <div className="CredUsername">Username:{cred.username}</div> 
                <div className="CredPassword">Password: {cred.password}</div>
                <div className="CredNotes">Notes: {cred.notes}</div>
                <button>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No credentials found.</p>
        )} */}
                {credentials.length > 0 ? (
          <ul>
            {credentials.map((cred, index) => (
              <li key={index} className="CredVault">
                <div className="CredUsername">
                  <label>Username:</label>
                  <input 
                    type="text" 
                    value={cred.username} 
                    placeholder="Username" 
                    readOnly 
                  />
                </div>
                <div className="CredPassword">
                  <label>Password:</label>
                  <input 
                    type={cred.showPassword ? "text" : "password"} 
                    value={cred.password} 
                    readOnly 
                  />
                  <button
                  type="button"
                  className="show"
                    onClick={() => {
                      const updatedCredentials = [...credentials];
                      updatedCredentials[index].showPassword = !updatedCredentials[index].showPassword;
                      setCredentials(updatedCredentials); // Assuming setCredentials is your state updater
                    }}
                  >
                    {cred.showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="CredNotes">
                  <label>Notes:</label>
                  <textarea 
                    value={cred.notes} 
                    readOnly 
                  />
                </div>
                <button
                type="button"
                className="edit"
                onClick={() =>{
                  setToggle((state) => {
                    return !state
                  })
                    setEditUsername(cred.username);
                    setEditPassword(cred.password);
                    setEditID(cred.id);
                }}>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No credentials available.</p>
        )}

        <button 
        type="button"
        className="close"
        onClick={() => {
          closeModal();
          setFormToggle(false)
        }}>Close</button>
        <button 
        type="button"
        className="Delete-vault"
        onClick={() =>deleteLabel(vaultID)}>Delete vault</button>
        <button 
        type="button"
        className="Add-Credential"
        onClick={() =>setFormToggle(!Formtoggle)}>Add Credential</button>
      </Modal>
    </>
  );
};

export default Passfort;
