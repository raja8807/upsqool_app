import useApiRequest from "./service";

export const useGetCurrentUserProfile = () => {
  return useApiRequest("/profile");
};

export const useUpdateUserProfile = () => {
  return useApiRequest("/profile", "POST");
};
