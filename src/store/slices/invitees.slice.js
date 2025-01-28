/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InviteesDataList: null,
  inviteesDetail: null,
  pageData: null,
};

export const InviteesSlice = createSlice({
  name: "invitees",
  initialState,
  reducers: {
    setInviteesList: (state, action) => {
      state.InviteesDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setInvitees: (state, action) => {
      state.InviteesDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeInvitees: (state, action) => {
      state.InviteesDataList.splice(action.payload.index, 1);
    },
  },
});
export const { setInviteesList, setInvitees, removeInvitees } =
  InviteesSlice.actions;
export default InviteesSlice.reducer;
export const getInviteesList = (state) => state.invitees?.InviteesDataList;
export const getPageData = (state) => state.invitees?.pageData;
