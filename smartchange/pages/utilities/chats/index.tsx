import type { ReactElement } from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullLayout from '../../../src/layouts/full/FullLayout';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getOrCreateChat, ChatEngine, MessageFormSocial } from 'react-chat-engine';


// const ChatEngine = dynamic(() =>
//   import("react-chat-engine").then((module) => module.ChatEngine)
// );

// const MessageFormSocial = dynamic(() =>
//   import("react-chat-engine").then((module) => module.MessageFormSocial)
// );

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

interface ChatEngineProps {
  height: string;
  projectID: string;
  userName: string;
  userSecret: string;
  renderNewMessageForm: () => JSX.Element;
  renderNewChatForm: (creds: any) => JSX.Element;
}

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Shadow = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext)
  console.log(authContext)

  const chatEngineProps: ChatEngineProps = {
    height: 'calc(100vh - 120px)',
    projectID: "72fd6d6c-3d31-4837-b92d-1c8725e0f8c8",
    userName: authContext.user?.name || "",
    userSecret: authContext.user?.secret || "",
    renderNewMessageForm: () => <MessageFormSocial />,
    renderNewChatForm: (creds: any) => renderChatForm(creds)
  }

  const [username, setUsername] = useState('')

  function createDirectChat(creds: any) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    )
  }

  function renderChatForm(creds: any) {
    return (
      <div>
        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>
          Create
        </button>
      </div>
    )
  }
  const [showChat, setShowChat] = useState(false)
  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true)
    }
  }, [])

  if (!showChat) return <div />

  return (
    <PageContainer title="Chat" description="this is Shadow">
      <ChatEngine {...chatEngineProps} />
    </PageContainer>
  );
};

export default Shadow;

Shadow.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
