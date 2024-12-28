import React from 'react';
import { Sidebardata } from './Sidebardata';
import './Sidebar.css';

function Sidebar() {
  
  return (
    <div className='Sidebar'>
        <div className="Banner"> </div>
        <ul className='Sidebarlist'>
        {Sidebardata.map((val,key) =>{
            return (
            <li key = {key} className='Row'>
            <div id='Icon'>{val.icon}</div>
            <div id='Title'>{val.title}</div>
            
            </li>)
        })}
        </ul>
    </div>
  )
} 

export default Sidebar