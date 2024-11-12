import React from 'react'
import './Landingpage.css';
const Landingpage = () => {
  return (
    <>
    <nav>
        <img src="src\assets\Passfort_logo.png" alt="Passfort_logo" className='Logo' />
        <button>Login/Signup</button>
    </nav>
    <div className="visualText">
        <h1 className='First'>ONE PLACE</h1>
        <h1 className='Second'>for</h1>
        <h1 className='Third'>ALL YOUR</h1>
        <h1 className='Fourth'>PASSWORDS</h1>
    </div>
     <div className='heroContainer'>
        <img src="src\assets\art.png" alt="Heroart" className='Hero'/>
    </div> 
    <div className="textContainer">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, fuga blanditiis dolore maiores nobis vero, iste sunt velit ad aspernatur, culpa sequi voluptatibus repellendus fugit ipsam reprehenderit enim eos! Minus.
            Amet deleniti voluptate, fuga distinctio quos recusandae officiis quia eaque inventore nihil similique optio vel tempore cum neque voluptatum numquam molestias totam id ut dolore maiores repellendus eos in. Temporibus.
            </p>
            <img src="src\assets\key.png" alt="ipadLocked" className='key' />
    </div>
    <div className="textContainer2">
        <img src="src\assets\key2.png" alt="key2" className='key2' />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error doloremque ipsam porro minus! Quia voluptatibus eum excepturi porro? Itaque laborum totam ab repellendus similique sunt eum sed aperiam ipsum nostrum!
        Provident, repellendus mollitia! Maxime itaque aliquam sapiente molestias in vero. Facilis eum adipisci officiis iure? Reiciendis omnis doloremque reprehenderit ullam deleniti ex nam maxime? Commodi enim distinctio laudantium rerum est?</p>
    </div>
    
    <div className="pm-container">
  <div className="pm-card-box">
    <div className="pm-card-item card-1">
      <div className="pm-card-bg"></div>
      <div className="pm-card-title">Password Storage Features</div>
    </div>

    <div className="pm-card-item card-2">
      <div className="pm-card-bg"></div>
      <div className="pm-card-title">Secure Encryption Methods</div>
    </div>

    <div className="pm-card-item card-3">
      <div className="pm-card-bg"></div>
      <div className="pm-card-title">Cross-Platform Compatibility</div>
    </div>
  </div>
</div>


    <footer>
        <p>© 2025 All Rights Reserved</p>
        <p>Passfort</p>
    </footer>
    </>
  )
}

export default Landingpage