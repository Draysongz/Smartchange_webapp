import React from 'react'
import Message from './Message'
import Styles from '../../../pages/utilities/chats/chat.module.scss'


const Messages = () => {
  return (
    <div className={Styles.messages}>
      <Message />  
      
    </div>
  )
}

export default Messages
