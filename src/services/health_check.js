import useApiRequest from "./service";


const useHealthCheck = () => {
    return useApiRequest("/health");
};

export default useHealthCheck;