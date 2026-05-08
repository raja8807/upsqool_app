import { useState, useEffect, useCallback } from "react";
import BE_API from "../config/api.config";

const useApiRequest = (url, method = "GET", autoCall) => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  const executeRequest = useCallback(
    async (payload = {}, dynamicUrl = null) => {
      setLoading(true);
      setErrorInfo(null);

      try {
        const response = await BE_API({
          url: dynamicUrl || url,
          method,
          data: payload,
        });

        setResponseData(response.data);

        return {
          success: response.data.success,
          data: response.data.data,
          error: response.data.error,
        };
      } catch (err) {




        const errorDetails = {
          message: err.response?.data?.message || err.message,
          code: err.response?.data?.code || err.code || "UNKNOWN_ERROR",
          status: err.response?.status,
        };

        setErrorInfo(errorDetails);

        console.log(`API Error (${method} ${url}):`, errorDetails);

        return {
          success: false,
          data: null,
          error: errorDetails,
        };
      } finally {
        setLoading(false);
      }
    },
    [url, method],
  );

  useEffect(() => {
    if (autoCall) {
      executeRequest();
    }
  }, [executeRequest, method]);

  return { loading, responseData, errorInfo, executeRequest };
};

export default useApiRequest;
