import React, {useState, useEffect} from 'react'
import Styles from '../../../pages/utilities/chats/chat.module.scss'
import Image from 'next/image'
import img1 from "../../../public/images/profile/user.svg"


interface UserData {
  username: string;
 
  // add any other properties you expect to receive
}
const Conversation = ({data, currentUserId, online}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(()=>{
    const userId = data.users.find((id)=>id !== currentUserId)
    console.log(userId)

    const BASE_URL = process.env.BASE_URL  || 'http://localhost:3000'
    const getUserData = async()=>{
      try{
        const response= await fetch(`${BASE_URL}/api/getUser?action=getUser&userId=${userId}`)
        const data = await response.json(); 
        setUserData(data)
        console.log(data)
      }catch(err){
        console.log(err)
      }
     
    }
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
    <div className ={`${Styles.follower} ${Styles.conversation}`}>
      {/* <div className={Styles.chatInfo}>
        <span>Jane</span>
        <div className={Styles.chatIcons}>
          
    </div>
    
      </div>
      <Messages />
    <Input /> */}
    <div className={Styles.userC}>
      {online && <div className={Styles.onlineDot}></div>}
    <Image src={img1} alt="alt" 
    style={{width:'50px', height:'50px'}}
     className={Styles.followerImage} />
     <div className ={Styles.name} style={{fontSize:'1rem'}}>
      <span>{userData?.username}</span>
      <span>{online? "Online" : "Offline"}</span>
     </div>
    </div>
    </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  )
}

export default Conversation
