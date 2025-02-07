import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_OPEN_AI_CHAT_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPEN_AI_CHAT_API_KEY}`,
  },
});

export default api;
