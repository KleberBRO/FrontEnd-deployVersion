// Para funcionar tanto local quanto no Vercel
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // No Vercel, usa o proxy configurado
  : 'https://ec2-34-229-140-168.compute-1.amazonaws.com/api'; // Local, URL direta