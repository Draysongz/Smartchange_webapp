import React, {useState, useEffect, useContext} from 'react'
import Styles from './chatbox.module.css'
import Image from 'next/image'
import img1 from "../../../public/images/profile/user.svg"
import { format } from "timeago.js";
import { useRef } from "react";
import InputEmoji from 'react-input-emoji'
import { NotificationContext } from '../../../pages/Context/NotificationContext';


interface UserData {
  username: string;
 
  // add any other properties you expect to receive
}

const Chatbox = ({ chat, currentUser, setSendMessage,  receivedMessage }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef<any>()


  const { setNewMessageReceived } = useContext(NotificationContext);

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

  useEffect(()=>{
    if(receivedMessage !== null && receivedMessage.chatId=== chat._id){
      setMessages([...messages, receivedMessage])
    }
  }, [receivedMessage, chat._id, messages])


  useEffect(()=>{
    const fetchMessages = async()=>{
      try{
        const response =  await fetch(`https://smartchange-webapp.vercel.app//api/message?action=getMessages&chatId=${chat._id}`)
        const data = await response.json(); 
        console.log(data)
        setMessages(data);
      }catch(err){
        console.log(err)
      }
    }
    if(chat !== null ) fetchMessages()
  }, [chat])

  useEffect(() => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  }, [receivedMessage]);

  useEffect(() => {
    const isMessageReceived = messages.some(
      (message) => message._id === receivedMessage?._id
    );

    if (receivedMessage && !isMessageReceived) {
      setNewMessageReceived(true);
    }
  }, [messages, receivedMessage, setNewMessageReceived]);


 
  useEffect(()=>{
    const userId = chat?.users.find((id)=> id !== currentUser)
    const getUserData = async()=>{
      try{
        const response= await fetch(`https://smartchange-webapp.vercel.app/api/getUser?action=getUser&userId=${userId}`)
        const data = await response.json(); 
        setUserData(data)
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }
    if(chat !== null){
      getUserData()
    }
  }, [chat, currentUser])


 


  const handleSend = async (e)=>{
    e.preventDefault()
    const message = {
      senderId: currentUser,
      content: newMessage,
      chatId: chat._id,
    }
    //send message to database

    try{
      const response = await fetch(`https://smartchange-webapp.vercel.app//api/message`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)});
      const data = response.json()
      setMessages([...messages, data])
      setNewMessage("")

    }catch(error){
      console.log(error)
    }

    //send message to socket server
    const receiverId = chat?.users.find((id)=> id !== currentUser);
    setSendMessage({...message, receiverId});
  }

  //always scroll to last message
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  }, [messages])

  useEffect(()=>{
    const fetchMessages = async()=>{
      try{
        const response =  await fetch(`https://smartchange-webapp.vercel.app//api/message?action=getMessages&chatId=${chat._id}`)
        const data = await response.json(); 
        console.log(data)
        setMessages(data);
      }catch(err){
        console.log(err)
      }
    }
    if(chat !== null ) fetchMessages()
  }, [messages])
  return (
    <>
      <div className={Styles.ChatBoxcontainer}>
        {chat? (
          <>
          <div className={Styles.chatheader}>
            <div className={Styles.follower}>
            <div className={Styles.userC}>
      <Image src={img1} alt="alt" 
      style={{width:'50px', height:'50px'}}
       className={Styles.followerImage} />
       <div className ={Styles.name} style={{fontSize:'1rem'}}>
        <span>{userData?.username}</span>
       </div>
      </div>
      </div>
      <hr style={{ width: "95%", border: "0.5px solid grey" }} />
  
          </div>
          
          <div className={Styles.chatbody}>
            {messages.map((message)=>(
              <>
              <div ref={scroll} className={message.senderId === currentUser? ` ${Styles.own}` :`${Styles.message}`}>
                <span>{message.content}</span>
                <span>{format(message.createdAt)}</span>
                
              </div>
              </>
            ))}
          </div>
  
          <div className={Styles.chatsender}>
            <div>+</div>
            <InputEmoji
            value = {newMessage}
            onChange= {handleChange}
            />
            <div className={`${Styles.sendbutton} ${Styles.button}`} onClick={handleSend}>
              Send
            </div>
          </div>
          </>
        ) : 
        <span className={Styles.chatboxemptymessage}>
          Tap on a Chat to start Conversation...
        </span>
        }
        
        </div>
    </>
  )
}

export default Chatbox
 