import { useCallback, useState } from "react";

import axios from "axios";

const apiKey = "7348e4f6ac1a71a3c54af1c6fc194623";
const units = "metric";

const instance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
  headers: {},
});

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        const resp = await instance(url + `&appid=${apiKey}&units=${units}`, {
          method,
          body,
          headers,
        });
        if (resp.status !== 200) {
          throw new Error(resp.message || "Something went wrong ");
        }
        setLoading(false);
        return resp;
      } catch (e) {
        setLoading(false);
        setError(e);
        throw e;
      }
    },
    []
  );
  const clearError = useCallback(() => setError(null), []);
  return {
    loading,
    request,
    error,
    clearError,
  };
};
