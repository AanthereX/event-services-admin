/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/auth.slice";
import baseApi from "../services/api";
import UserSlice from "./slices/user.slice";
import VendorSlice from "./slices/vendor.slice";
import ServiceCategoriesSlice from "./slices/serviceCategories.slice";
import VenueFacilitySlice from "./slices/venueFacility.slice";
import Venues from "./slices/venues.slice";
import RatingAndReviewSlice from "./slices/ratingAndReview.slice";
import InvitationSlice from "./slices/invitation.slice";
import RequestSlice from "./slices/request.slice";
import EventSlice from "./slices/events.slice";
import ProviderServiceSlice from "./slices/providerService.slice";
import InviteesSlice from "./slices/invitees.slice";
import Rating from "./slices/ratings.slice";
import TransactionSlice from "./slices/transaction.slice";
import RequestServiceSlice from "./slices/servicesRequest.slice";
import ChangeEventRequestSlice from "./slices/changeEventRequest.slice";
import DashboardSlice from "./slices/dashboard.slice";
import StatisticSlice from "./slices/statistics.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: UserSlice,
  dashboardData: DashboardSlice,
  statistics: StatisticSlice,
  vendor: VendorSlice,
  serviceCategories: ServiceCategoriesSlice,
  venueFacility: VenueFacilitySlice,
  venues: Venues,
  reviews: RatingAndReviewSlice,
  invitation: InvitationSlice,
  request: RequestSlice,
  events: EventSlice,
  providerservice: ProviderServiceSlice,
  invitees: InviteesSlice,
  ratings: Rating,
  transactions: TransactionSlice,
  serviceRequests: RequestServiceSlice,
  changeEventRequests: ChangeEventRequestSlice,
  [baseApi.reducerPath]: baseApi.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  /**
   * Returns an array of middleware functions that combines the default middleware
   * with the base API middleware and the logger middleware.
   *
   * @param {function} getDefaultMiddleware - A function that returns an array of
   * default middleware functions.
   * @return {Array} An array of middleware functions.
   */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([baseApi.middleware, logger]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
