import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import api from './Api/api';
import Sidebar from './Components/Sidebar';
import Vault from './Components/Vault';
import EditCredentials from './Components/EditCredentials';
import './Passfort.css';
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

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await api.getLabels();
        const labelNames = response.map((label) => label.name);
        setLabels(labelNames);
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      }
    };

    fetchLabels();
  }, []);

  const openModal = async (vaultLabel) => {

    setSelectedVault(vaultLabel);
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
  };

  return (
    <>
      <div className="Home">
        <div className="HomeSidebar">
          <Sidebar />
        </div>
        <div className="Vaults">
          {labels.map((label, index) => (
            <Vault key={index} label={label} onClick={() => openModal(label)} />
          ))}
        </div>
      </div>

      {toggle?
        <EditCredentials username = {editUsername} password={editPassword} onclose={() =>setToggle()}/>
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
                <button onClick={() =>{
                  setToggle((state) => {
                    return !state
                  })
                    setEditUsername(cred.username);
                    setEditPassword(cred.password);
                }}>Edit</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No credentials available.</p>
        )}

        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
};

export default Passfort;
