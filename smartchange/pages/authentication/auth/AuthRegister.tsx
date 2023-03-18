import React from 'react';
import { Box, Typography, Button } from '@mui/material';  
import Link  from 'next/link';
import {useState} from 'react'
import { useRouter } from 'next/router';
import {toast} from 'react-toastify'

import CustomTextField from '../../../src/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

interface registerType {
    title?: string;
    subtitle?: JSX.Element | JSX.Element[];
    subtext?: JSX.Element | JSX.Element[];
  }

export default function  AuthRegister({ title, subtitle, subtext }: registerType) {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [confirm, setConfirm] = useState('')

    const router = useRouter();

  

  const register = async (e) => {
    e.preventDefault();
    try {
        if(password == confirm){
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username, number })
      });
      if (response.ok) {
        toast.success('Registration successful');
        console.log(response.json())
        router.push('/authentication/login');
      } else {
        const { status } = response;
        if (status === 503) {
          const message = await response.text();
          setErrorMessage(message);
          console.log(errorMessage)
          toast.error(errorMessage);
        }
      }
    }else{
        toast.error('Passwords do not match ')
    }
    } catch (err) {
        console.log(err)
      toast.error('An error occurred. Please try again later.');
    }
  };
  return (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Username</Typography>
                <CustomTextField id="name" onChange={(e : any)=> setUsername(e.target.value)} variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <CustomTextField id="email"onChange={(e : any)=> setEmail(e.target.value)} variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='name' mb="5px">Phone</Typography>
                <CustomTextField id="name"onChange={(e :any)=> setNumber(e.target.value)} variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                <CustomTextField id="password" onChange={(e : any)=> setPassword(e.target.value)} variant="outlined" fullWidth />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Confirm Password</Typography>
                <CustomTextField id="password" onChange={(e :any)=> setConfirm(e.target.value)} variant="outlined" fullWidth />
            </Stack>
            <Button color="primary" variant="contained" size="large" fullWidth  onClick={register}>
                Sign Up
            </Button>
        </Box>
        {subtitle}
    </>
);
        }
