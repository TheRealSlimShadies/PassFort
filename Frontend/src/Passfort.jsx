import api from './Api/api';
import React, { useEffect, useState } from 'react'
import Sidebar from './Components/Sidebar';
import Vault from './Components/Vault';
import './Passfort.css';
const Passfort = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await api.getLabels();  // 
        const labelNames = response.map((label) => label.name);  
        setLabels(labelNames);  
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      }
    };

    fetchLabels();  
  }, []);
  return (
    <>
    <div className="Home">
      <div className="HomeSidebar">
        <Sidebar/>
      </div>
      <div className="Vaults">
        {labels.map((label, index) => (
            <Vault key={index} label={label} />
          ))}
      </div>
    </div>
    </>
  )
}

export default Passfort