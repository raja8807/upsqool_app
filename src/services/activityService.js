import useApiRequest from "./service";

export const useGetActivitiesByChild = () => {
  return useApiRequest("/activities", "GET");
};

export const useAddActivity = () => {
  return useApiRequest("/activities", "POST");
};

export const useUpdateActivityScore = () => {
  return useApiRequest("/activities", "PUT");
};

export const useGetAllActivities = () => {
  return useApiRequest("/activities/all", "GET", true);
};
