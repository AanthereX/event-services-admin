/** @format */

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeLoginData } from "../store/slices/auth.slice";

const baseUrl = import.meta.env.VITE_APP_BASEURL;
// const baseUrl = "http://192.168.0.51:1000/api/v1/";

// Define a service using a base URL and expected endpoints

const customBaseQuery = async (args, api, extraOptions) => {
  try {
    const result = await fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: (headers, { getState, extra }) => {
        const token = getState()?.auth?.token?.accessToken;
        const header = getState()?.auth?.header;
        if (!!token) {
          headers.set("Authorization", `Bearer ${token}`);
          if (header === "application/json")
            headers.set("Content-type", "application/json");
        }
        return headers;
      },
    })(args, api, extraOptions);

    if (result.error?.status == 401) {
      api.dispatch(removeLoginData());
    }
    return result;
  } catch (error) {
    return { error: { status: "FETCH_ERROR", error } };
  }
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default baseApi;
