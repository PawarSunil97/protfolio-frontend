import React, { useState } from 'react'
import Header from "./Header/Header"
import { Profile } from './Profile/Profile'
import Footer from "./Footer/Footer"
import ChatBox from '../Chat/ChatBox'

import './Home.css'

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div id='Home' className='home-container'>
      <Header />
      <Profile />
      <Footer />

      
      {/* Message Me Button (Left Side) */}
      <div className="chat-button-container">
        <button className="btn-message" onClick={() => setShowChat(true)}>
          <i className="fa fa-comments"></i> Message Me
        </button>
      </div>

      {/* ChatBox (Left Side Popup) */}
      {showChat && (
        <div className="chatbox-wrapper">
          <ChatBox onClose={() => setShowChat(false)} />
        </div>
      )}
    </div>
  )
}
