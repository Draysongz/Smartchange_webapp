import type { ReactElement } from 'react';
import FullLayout from '../../../src/layouts/full/FullLayout';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import BlankCard from '../../../src/components/shared/BlankCard';
import {useState, useEffect, useContext} from 'react'
import {toast} from 'react-toastify'
import styles from'./swap.module.css'
import Image from 'next/image'
import profile from './assets/eclipse.png'
import algo from './assets/algo.png'
import star from './assets/star.png'
import arrow from './assets/arrow.png'
import { useRouter } from "next/router";
import {AuthContext} from '../../../src/components/Context/AuthContext'
import { createChat } from '../../api/functions/chat';



const TypographyPage = () => {
  const [merchantUsers, setMerchantUsers] = useState([]);
  const[userId, setUserId]= useState('')
  const [userd, setUserd] = useState<any>([])
  
  useEffect(() => {
    async function fetchMerchantUsers() {
      try {
        const response = await fetch('/api/getMerchants');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMerchantUsers(data.data);
      } catch (error) {
        console.error('Error fetching merchant users:', error);
        // Handle the error
      }
    }
    fetchMerchantUsers();
  }, []);
 

  function user(id: string) {
    setUserId(id)
      
  }
  console.log('userId:', userId);

  const authContext = useContext(AuthContext)
 console.log(authContext)
  
  
useEffect(()=>{
  const storedData = localStorage.getItem("userData");
  if (storedData) {
    const data = JSON.parse(storedData);
    setUserd(data.data);
  }
}, [])
 

  const router = useRouter();
  useEffect(() => {
    async function createChatAndRedirect() {
      if (userId) {
        try {
          const senderId = userd._id;
          const receiverId = userId;
          const chat = await createChat(senderId, receiverId);
          console.log('Chat created:', chat);
          toast('Chat created successfully');
          router.push('/utilities/chats');
        } catch (err) {
          console.log(err);
        }
      }
    }
  
    createChatAndRedirect();
  }, [userId]); 
  async function createDirectChat() {
    console.log(userd._id)
    console.log(userId)
    try{
      const senderId=userd._id
      const receiverId = userId
      const chat = await createChat(senderId, receiverId);
      console.log('Chat created:', chat);
      // Do something with the created chat
      toast('Chat created successfully')
      router.push('/utilities/chats')
  
    }catch(err){
  console.log(err)
    }
    
  }
  
  
  return (
    <PageContainer title="Smart Swap" description="Smart Swap">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Smart Swap">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h1"></Typography>
                    <Typography variant="body1" color="textSecondary">
                      {/* data and styling runs here dray */}
                      <div className='swapHead'>
                      <ul>
                        <li className={styles.mercTitle}>Merchant List</li>
                      </ul>
                      </div>
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>

        
          </DashboardCard>
        </Grid>
      </Grid >
      <BlankCard className={styles.card}>
              <CardContent>
              
                      {/* data and styling runs here dray */}
                      <div className='mercCard'>
                      <div className={styles.merchant}>
                        {merchantUsers.map((e : any, index :any)=>{
                          return(
                            <BlankCard className={styles.userContainer} key={index}>
                              <CardContent className={styles.left}  >
                                <div className={styles.userDeets}>
                            <Image src={profile} alt='profile' width='50'/>
                            <h2 className={styles.username}>{e.username}</h2>
                            </div>

                            <div className={styles.rate}>
                              <div className={styles.pairs}>
                                <p className={styles.firstPair}>CSA</p>
                                <p className={styles.secondPair}>Algos</p>
                              </div>
                            
                            <div className={styles.numbers}>
                              <p>1.00</p>
                               <Image src={arrow} alt='arrow' className={styles.arrow} width='20' />
                              <p className={styles.secondPair}>500</p>
                            </div>
                            </div>
                          

                            </CardContent>
                            <CardContent className={styles.deets}>
                              <div className={styles.rating}>
                            <Image src={algo} alt='algo' className={styles.algo}/>
                            <p className={styles.tag}>Selling $ALGOS</p>
                            <Image src={star} alt='rating' className={styles.star}/>
                            <p> | +4.5</p>
                            </div>

                            <div className={styles.payCont}>
                              <p className={styles.payMethod}>Accepts: ALGOS NGN USDT CSA </p>
                            </div>
                            <div className={styles.buttons}>
                              <button className={styles.reviews}>Reviews</button>
                              <button className={styles.select} value={e._id} onClick={() => { user(e._id); createDirectChat();}}>Select</button>

                            </div>
                            </CardContent>
                            </BlankCard>

                          )
                        })}
                      </div>

                      </div>
                  
              </CardContent>
            </BlankCard>
      
    </PageContainer>
  );
};

export default TypographyPage;
TypographyPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};