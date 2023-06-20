import React, {useContext} from 'react'
import Styles from '../../../pages/utilities/chats/chat.module.scss'
// import Image from 'Next/image'
import img1 from "../../../public/images/profile/user.svg"
import Image from 'next/image'
import {AuthContext} from '../Context/AuthContext'
const Navbar = () => {
  const authContext = useContext(AuthContext)
  console.log(authContext.user?.name)
  return (
    <div className={Styles.navbar}>
      <span className={Styles.logo}>Smartchange</span>

      <div className={Styles.user}>
        <Image src={img1} alt='alt' className={Styles.userImage} width='50'/>
        <span>{authContext.user?.name}</span>
      </div>
    </div>
  )
}

export default Navbar
