import type { ReactElement } from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullLayout from '../../../src/layouts/full/FullLayout';
import React, { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useRouter } from "next/router";
import Chatbox from '../../../src/components/Chat/Chatbox'
import Conversation from '../../../src/components/Chat/Conversation'
import NavIcons from '../../../src/components/Chat/NavIcons'
import Styles from './chat.module.scss'
import LogoSearch from '../../../src/components/Logosearch/LogoSearch'
import {io} from 'socket.io-client'
import { Socket } from 'socket.io';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));




const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  const [onlineUsers, setOnlineUsers] = useState<any>([])
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage]= useState(null)
  const router = useRouter();
  const authContext = useContext(AuthContext)
  console.log(authContext)
  const user= authContext.user?.data
  console.log(user)



  useEffect(()=>{
    const socketInitializer = async ()=>{
      const startServer= await fetch('/api/socket')
      console.log(startServer.json())
      const socket = io('http://localhost:3001');
  
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      
      // Send a message to the server
      socket.emit('new-user-add', user._id);
      
      // Receive a message from the server
      socket.on('get-users', (users) => {
        setOnlineUsers(users)
        console.log(onlineUsers)
        console.log('Received message from server:', users);
      });
    }
    socketInitializer()
  }, [user])


  useEffect(()=>{
    if(sendMessage !== null){
      const socket = io('http://localhost:3001');
      socket.emit("send-message",sendMessage)
    }
  }, [sendMessage])
  
  useEffect(()=>{
    
      const socket = io('http://localhost:3001');
      socket.on("receive-message", (data)=>{
        setReceivedMessage(data)
      })
    
  }, [])
  
  useEffect(()=>{
    const getChats = async ()=>{
      try{
        const response= await fetch(`http://localhost:3000/api/chat?action=userChats&userId=${user._id}`)
        const data = await response.json();
        setChats(data)
        console.log(data);
      }catch(err){
        console.log(err)
      }
    }
    getChats()
  }, [user])

  const checkOnlineStatus= (chat)=>{
    const chatMember= chat.users.find((user)=> user!==user._id)
    const online = onlineUsers.find((user)=> user.userId === chatMember)
    return online? true : false;
  }
  return (
    <PageContainer title="Chat" description="this is Shadow">
      {/* <div className={Styles.chatHome}>
        <div className={Styles.container}>
          <Sidebar />
          <Chat />
        </div>
      </div> */}

      <div className={Styles.Chat}>
        <div className={Styles.LeftSideChat}>
          <LogoSearch />
          <div className={Styles.Chatcontainer}>
          <h2>Chat</h2>
          <div className={Styles.Chatlist}>
          {chats.map((chat)=>(
              <div onClick={()=>setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
              </div>
            ))}
          </div>
          </div>
          </div>


           <div className={Styles.RightSideChat}>
            <div style={{width:'20rem', alignSelf: 'flex-end'}}>
              <NavIcons/>
            
            </div>
            <Chatbox chat={currentChat}  currentUser={user?._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
          </div>
        </div>
    </PageContainer>
  );
};

export default Shadow;

Shadow.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
