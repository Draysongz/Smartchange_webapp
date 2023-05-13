import React from "react";
import Home from "./home.png";
import Noti from "./noti.png";
import Comment from "./comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import Image from 'next/image'
import Styles from '../../../pages/utilities/chats/chat.module.scss'

const NavIcons = () => {
  return (
    <div className={Styles.navIcons}>
     
        <Image src={Home} alt="" />
      
      <UilSetting />
      <Image src={Noti} alt="" />
      
        <Image src={Comment} alt="" />
     
    </div>
  );
};

export default NavIcons;