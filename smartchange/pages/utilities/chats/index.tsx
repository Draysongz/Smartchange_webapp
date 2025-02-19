import type { ReactElement } from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullLayout from '../../../src/layouts/full/FullLayout';
import React, { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../../../src/components/Context/AuthContext'
import { useRouter } from "next/router";
import Chatbox from '../../../src/components/Chat/Chatbox'
import Conversation from '../../../src/components/Chat/Conversation'
import NavIcons from '../../../src/components/Chat/NavIcons'
import Styles from './chat.module.scss'
import LogoSearch from '../../../src/components/Logosearch/LogoSearch'
import { toast } from 'react-toastify';


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
  const [chats, setChats] = useState<any>([]);
  const [user, setUser] = useState<any>([])
  const [currentChat, setCurrentChat] = useState(null)
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage]= useState(null)
  const router = useRouter();
  const authContext = useContext(AuthContext)
  console.log(authContext)







  
useEffect(()=>{
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const data = JSON.parse(storedData);
    setUser(data.data);
  }
}, [receivedMessage])
  



  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:3000/api/socket');
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection established.');
      socket.send(JSON.stringify({ event: 'new-user-add', data: user._id }));
    });
    
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      const { event: eventName, data } = message;
    
      if (eventName === 'get-users') {
        // Handle the event 'get-users' and update the list of active users
        console.log('Received active users:', data);
        setOnlineUsers(data)
      } else if (eventName === 'receive-message') {
        // Handle the event 'receive-message' and process the received message
        console.log('Received message:', data);
        console.log(data)
      }
      setReceivedMessage(data)
      console.log(receivedMessage)
    });
    
    socket.addEventListener('close', (event) => {
      console.log('WebSocket connection closed.');
    });
    
  }, [user])


  

  const getChats = async () => {
    try {
      console.log('Fetching chats...');
      console.log(`https://smartchange-webapp.vercel.app/api/chat?action=userChats&userId=${user._id}`)
      const response = await fetch(`https://smartchange-webapp.vercel.app/api/chat?action=userChats&userId=${user._id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Chats fetched:', data);
      setChats(data);
    } catch (error) {
      console.log('Error fetching chats:', error);
    }
  };
  

  useEffect(() => {
    if (user && user._id) {
      getChats(); // Call the getChats function here
    }
    console.log(user)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const checkOnlineStatus = (chat) => {
    if (user && user._id) {
      const chatMember = chat.users.find((userId) => userId !== user._id);
      const online = onlineUsers.find((user) => user.userId === chatMember);
      return online ? true : false;
    }
    return false;
  };

  
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
          {chats.map((chat, index)=>(
              <div onClick={()=>setCurrentChat(chat)} key={index}>
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
