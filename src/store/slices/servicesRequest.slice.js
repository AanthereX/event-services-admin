/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ServiceRequestDataList: null,
  serviceRequestDetail: null,
  pageData: null,
};

export const RequestServiceSlice = createSlice({
  name: "serviceRequests",
  initialState,
  reducers: {
    setServiceRequestList: (state, action) => {
      state.ServiceRequestDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setServiceRequest: (state, action) => {
      state.ServiceRequestDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeServiceRequest: (state, action) => {
      state.ServiceRequestDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setServiceRequestList,
  setServiceRequest,
  removeServiceRequest,
} = RequestServiceSlice.actions;
export default RequestServiceSlice.reducer;
export const getServiceRequestList = (state) =>
  state.serviceRequests?.ServiceRequestDataList;
export const getPageData = (state) => state.serviceRequests?.pageData;
