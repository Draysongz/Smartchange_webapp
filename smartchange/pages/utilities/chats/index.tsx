import type { ReactElement } from 'react';
import { Paper, Box, Grid } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import FullLayout from '../../../src/layouts/full/FullLayout';
import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../../Context/AuthContext'
import { getOrCreateChat } from 'react-chat-engine'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);



const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);
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
  const router = useRouter();


  const authContext = useContext(AuthContext)
  console.log(authContext)
  const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
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


  return (
    <PageContainer title="Chat" description="this is Shadow">

      {/* <DashboardCard title="Chat">
        <Grid container spacing={2}>
          {[lightTheme, darkTheme].map((theme, index) => (
            <Grid item xs={6} key={index}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'background.default',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                  }}
                >
                 
                </Box>
            </Grid>
          ))}
        </Grid>
      </DashboardCard> */}
      <ChatEngine 
                    height='calc(100vh - 120px)'
                    projectID="72fd6d6c-3d31-4837-b92d-1c8725e0f8c8"
                    userName={authContext.user?.name}
                    userSecret={authContext.user?.secret}
                    renderNewMessageForm = {()=> <MessageFormSocial/>}
                    renderNewChatForm={(creds) => renderChatForm(creds)}
                    
                />
    </PageContainer>
  );
};

export default Shadow;
Shadow.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};