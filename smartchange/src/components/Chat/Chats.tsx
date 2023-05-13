import React from 'react'
import Styles from '../../../pages/utilities/chats/chat.module.scss'
import img1 from "../../../public/images/profile/user.svg"
import Image from 'next/image'

const Chats = () => {
  return (
    <div className={Styles.chats}>
      <div className={Styles.userChat}>
        <Image src={img1} alt="alt" width='50' className={Styles.userImg} />
        <div className={Styles.userChatInfo}>
        <span>Jane</span>
        <p>Hello </p>
      </div>
    </div>

    <div className={Styles.userChat}>
        <Image src={img1} alt="alt" width='50' className={Styles.userImg} />
        <div className={Styles.userChatInfo}>
        <span>Jane</span>
        <p>Hello </p>
      </div>
    </div>

    <div className={Styles.userChat}>
        <Image src={img1} alt="alt" width='50' className={Styles.userImg} />
        <div className={Styles.userChatInfo}>
        <span>Jane</span>
        <p>Hello </p>
      </div>
    </div>
    </div>
  )
}

export default Chats
