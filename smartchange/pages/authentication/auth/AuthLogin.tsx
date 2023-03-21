import React, {useContext} from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import {useState} from 'react'
import { useRouter } from 'next/router';
import {toast} from 'react-toastify'
import UAuth from '@uauth/js'
import styles from './button.module.css'
import udlogo from './ud.webp'
import Image from 'next/image'

import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import {AuthContext} from '../../Context/AuthContext'


interface loginType {
  title?: string;
  subtitle?: JSX.Element |JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export default function AuthLogin({ title, subtitle, subtext }: loginType) {

  const uauth =new UAuth({
    clientID: 'e645eff4-60dc-400c-a30e-4bd35019d379',
 redirectUri: 'https://plankton-app-k3qqz.ondigitalocean.app/',
 scope: 'openid wallet profile:optional social:optional ',
})
   
  const [error, setError] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState("")


  const authContext = useContext(AuthContext)
  console.log("authContext", authContext)
  
   const router = useRouter();
        
   const privateKey = process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY;


   const handleToggleConnect = async () => {
    try {
      const authorization = await uauth.loginWithPopup()
   
      console.log(authorization)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
   
      
  };
  
  const login = async(e : any)=>{
    e.preventDefault()

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        const data = await response.json();
        toast.success('login successful');
        console.log(data)
        const user = data.username
       authContext.setUser({
        name: user,
        secret: password
       })
       console.log(user)
      
       
   
      const responseChat = await fetch("https://api.chatengine.io/users/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Private-Key": "043648d7-6088-4215-809e-b15aa1c5ec81"
        },
        body: JSON.stringify({ 
          "username" : user, 
          "secret" : password })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
          }
          // handle successful response
          const chatData = response.json()
        })
        .catch(error => {
          console.error(error);
          // handle error
        });
      
       router.push('/')
      } else {
        const { status } = response;
        if (status === 503) {
          const message = await response.text();
          setErrorMessage(message);
          toast.error(message);
        }else if (status === 401){
          const message = await response.text();
          setErrorMessage(message);
          toast.error(message);
        }else if (status === 404){
          const message = await response.text();
          setErrorMessage(message);
          toast.error(message);
        }
      }
    } catch (err) {
      console.log(err)
      
    }
  }
  return(
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
      <Box>
        <Typography     
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="username"
          mb="5px"
          
        >
          Email
        </Typography>
        <CustomTextField variant="outlined" fullWidth onChange={(e: any)=> setEmail(e.target.value)} />
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          Password
        </Typography>
        <CustomTextField type="password" variant="outlined" fullWidth onChange={(e: any)=> setPassword(e.target.value)} />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember this Device"
          />
        </FormGroup>
        <Typography
          component={Link}
          href="/"
          fontWeight="500"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          Forgot Password ?
        </Typography>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        onClick={login}
        
      >
        Sign In
      </Button>
    </Box>
    <br/>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        onClick={handleToggleConnect}
        className={styles.unstoppable}
        
      >
        <Image src={udlogo} alt='ud' width='40' className={styles.ud}/>  Login with Unstoppable
      </Button>
    </Box>
    {subtitle}
  </>
);
        };