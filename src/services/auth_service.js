import useApiRequest from "./service";

export const useSendOtp = () => {
  return useApiRequest("/auth/otp/send", "POST");
};

export const useVerifyOtp = () => {
  return useApiRequest("/auth/otp/verify", "POST");
};
