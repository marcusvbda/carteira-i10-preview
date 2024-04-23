import axios from 'axios'
const  baseURL = process.env.NEXT_PUBLIC_SERVER_URI;

export const api = axios.create({
    baseURL: `${baseURL}/api/rest`,
    withCredentials: true,
    headers: {
      'Content-type': 'application/json',
    },
  })
  