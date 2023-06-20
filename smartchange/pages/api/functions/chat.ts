import axios from 'axios';

export async function createChat(senderId, receiverId) {
  try {
    const response = await axios.post('https://smartchange-webapp.vercel.app//api/chat', {
      senderId: senderId,
      receiverId: receiverId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
}