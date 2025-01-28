/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserDataList: null,
  UserEventsDataList: null,
  userDetail: null,
  pageData: null,
  eventsPageData: null,
  UserInvitationsDataList: null,
  invitationsPageData: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.UserDataList = action.payload?.data;
      state.pageData = action.payload?.meta;
    },
    setUserEventsList: (state, action) => {
      state.UserEventsDataList = action.payload?.data;
      state.eventsPageData = action.payload?.meta;
    },
    setUserInvitationsList: (state, action) => {
      const existingIds = new Set(
        state.UserInvitationsDataList?.map((item) => item?.id),
      );
      const newData =
        action.payload?.data?.filter((item) => !existingIds.has(item.id)) || [];

      state.UserInvitationsDataList = [
        ...(state.UserInvitationsDataList || []),
        ...newData,
      ];
      state.invitationsPageData = action.payload?.meta;
    },
    removeUserInvitationsList: (state, action) => {
      state.UserInvitationsDataList = null;
    },
    setUser: (state, action) => {
      state.UserDataList[action.payload.index] = action.payload?.data;
      if (((action.payload.index + 1) / 10) % 1 !== 0) {
        state.pageData.totalPages =
          ((state.pageData.totalItems + 1) / 10) % 1 !== 0
            ? parseInt((state.pageData.totalItems + 1) / 10) + 1
            : parseInt((state.pageData.totalItems + 1) / 10);
      }
    },
    removeUser: (state, action) => {
      state.UserDataList.splice(action.payload.index, 1);
    },
  },
});
export const {
  setUserList,
  setUserInvitationsList,
  setUserEventsList,
  setUser,
  removeUser,
  removeUserInvitationsList,
} = UserSlice.actions;
export default UserSlice.reducer;
export const getUserList = (state) => state.user?.UserDataList;
export const getUserEventList = (state) => state.user?.UserEventsDataList;
export const getUserInvitationsList = (state) =>
  state.user?.UserInvitationsDataList;
export const getPageData = (state) => state.user?.pageData;
export const getEventsPageData = (state) => state.user?.eventsPageData;
export const getInvitationsPageData = (state) =>
  state.user?.invitationsPageData;
