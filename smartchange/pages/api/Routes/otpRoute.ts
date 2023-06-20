
import { Vonage } from '@vonage/server-sdk';
import { SMS } from '@vonage/messages/dist/classes/SMS/SMS'


interface AuthInterface{

}


function generateOtp() {
    const otpLength = 6; // Length of the OTP
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < otpLength; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
      console.log(otp)
    }
  
    return otp;
    
}

  // Implement the required AuthInterface properties
  const YourCustomAuthObject: AuthInterface = {
    getQueryParams: () => {
      // Implement the logic to return query parameters
      return {};
    },
    createSignatureHash: (params) => {
      // Implement the logic to create a signature hash
      return '';
    },
    createBasicHeader: () => {
      // Implement the logic to create a basic header
      return '';
    },
    createBearerHeader: () => {
      // Implement the logic to create a bearer header
      return '';
    }
  };





export const sendOtp = async (req, res)=>{
    const otp= req.params.otp
    try {
        const from = 'CryptoSmart'
        const text = generateOtp()
        console.log(text)
        const response = await vonage.sms.send({to, from, text})
        console.log('Message sent successfully');
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}