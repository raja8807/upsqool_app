import axios from "axios";
import { supabase } from "../lib/supabase";

const BE_API = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_BE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
BE_API.interceptors.request.use(
  async (config) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error("Error attaching auth token to request:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default BE_API;
