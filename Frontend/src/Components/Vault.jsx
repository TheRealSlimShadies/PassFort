import React from 'react'
import './Vault.css';
function Vault({label, onClick}) {
  
  return (
  <div className='Vault' onClick={onClick}>
        <h3>{label}</h3>
    </div>
  )
}

export default Vault