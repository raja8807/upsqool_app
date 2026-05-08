import useApiRequest from "./service";

export const useGetChildren = () => {
  return useApiRequest("/child", "GET");
};

export const useCreateChild = () => {
  return useApiRequest("/child", "POST");
};

export const useUpdateChild = () => {
  return useApiRequest("/child", "PUT");
};
