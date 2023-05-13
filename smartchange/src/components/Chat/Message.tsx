import React from 'react'
import Styles from '../../../pages/utilities/chats/chat.module.scss'
import img1 from "../../../public/images/profile/user.svg"
import Image from 'next/image'

const Message = () => {
  
  return (
    <div className={`${Styles.message} ${Styles.owner}`}>
     <div className={Styles.messageInfo}>
      <Image src={img1} alt='img'/>
      <span>just now</span>
     </div>
     <div className={Styles.messageContent}>
      <p>hello</p>
      {/* <Image src={img1} alt='img'/> */}
     </div>
    </div>
  )
}

export default Message
