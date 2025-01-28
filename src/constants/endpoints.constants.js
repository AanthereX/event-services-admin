/** @format */

export const endpoints = Object.freeze({
  // Authentication
  login: () => "auth/admin/log-in",

  // Forget Password
  forgetPassword: () => "auth/forget-password",

  // Dashboard
  getAllDashboardData: ({ type = "", filter = "" }) =>
    `user/admin-dashboard${type ? "?type=" + type : ""}${
      filter ? "&filter=" + filter : ""
    }`,
  getAllUpcomingEvents: ({ page = 1 }) =>
    `event/upcomming?${page ? "&page=" + page : ""}`,

  // Users
  getAllUsers: ({ page = 1, search = "" }) =>
    `user/?${page ? "&page=" + page : ""}${search ? "&search=" + search : ""}`,
  addUser: () => `user`,
  updateUser: (id) => `user/edit/${id}`,
  userVisibility: (id) => `user/visibility/${id}`,
  getUserDetailById: (id) => `user/${id}`,
  getUserEventsById: ({ page = 1, id = "" }) =>
    `user/events/${id ? id : ""}?${page ? "&page=" + page : ""}`,
  getUserInvitationsById: ({ page = 1, id = "" }) =>
    `user/invitation-cards/${id ? id : ""}?${page ? "&page=" + page : ""}`,

  // Vendors
  getAllVendors: ({ page = 1, search = "" }) =>
    `user/vendor-by-admin/?${page ? "&page=" + page : ""}${
      search ? "&search=" + search : ""
    }`,
  addVendor: () => `user/vendor`,
  updateVendor: (id) => `user/edit-vendor/${id}`,
  updateVendorStatus: (id) => `user/vendor-status/${id}`,
  vendorVisibility: (id) => `user/visibility/${id}`,
  getAllServiceCategory: ({ page = 1, search = "" }) =>
    `service/category/?${page ? "&page=" + page : ""}${
      search ? "&search=" + search : ""
    }`,
  getVendorDetailById: (id) => `user/vendor-detail/${id}`,
  getVendorVenuesById: ({ page = 1, id = "" }) =>
    `user/vendor-venues/${id}?${page ? "&page=" + page : ""}`,
  getVendorServicesById: ({ page = 1, id = "" }) =>
    `user/vendor-service/${id}?${page ? "&page=" + page : ""}`,

  // Service Categories
  serviceCategoryVisibility: (id) => `service/category/visibility/${id}`,
  addCategory: () => `service/category`,
  updateCategoryById: (id) => `service/category/${id}`,
  getAllServiceCategoryWithoutPage: () => `service/all-category`,

  // Venue Facilities
  getAllFacilities: ({ page = 1, search = "" }) =>
    `venue-facilities/fetch-facility?${page ? "&page=" + page : ""}${
      search ? "&search=" + search : ""
    }`,
  facilityVisibility: (id) => `venue-facilities/visibility/${id}`,
  addVenueFacility: () => `venue-facilities/add-facility`,
  updateVenueFacility: (id) => `venue-facilities/facility/${id}`,

  // Venues
  getAllVenues: ({ page = 1, search = "" }) =>
    `venues?${page ? "&page=" + page : ""}${search ? "&search=" + search : ""}`,
  venueVisibility: (id) => `venues/visibility/${id}`,
  getVenueDetailById: (id) => `venues/detail/${id}`,
  getVenueAvailabilitiesById: ({ id, startDate, endDate }) =>
    `venues/availability/${id}?${endDate ? "&endDate=" + endDate : ""}${
      startDate ? "&startDate=" + startDate : ""
    }`,
  getBookingDetailsByAvailabilityId: (id) => `venues/booked-event/${id}`,
  getVenueReviewsById: ({ id = "", page = 1 }) =>
    `venues/reviews/${id}${page ? "?&page=" + page : ""}`,
  getServiceReviewsById: ({ id = "", page = 1 }) =>
    `service/reviews/${id}${page ? "?&page=" + page : ""}`,
  getServiceDetailsById: (id) => `service/detail/${id}`,

  // Rating And Reviews
  getReviewsByType: ({ page = 1, search = "", type = "" }) =>
    `review?${page ? "&page=" + page : ""}${search ? "&search=" + search : ""}${
      type ? "&type=" + type : ""
    }`,

  // Invitations
  getAllInvitations: ({ page = 1 }) =>
    `invitation?${page ? "&page=" + page : ""}`,
  getEventInvitationInvitees: ({ page = 1, id = "" }) =>
    `invitation/invitees/${id}${page ? "?&page=" + page : ""}`,
  getInvitationMonetaryGiftsById: ({ page = 1, id = "" }) =>
    `invitation/monetary-gift/${id}${page ? "?&page=" + page : ""}`,

  // Service Request
  getAllServiceRequests: ({ page = 1, search = "", type = "" }) =>
    `request?${page ? "&page=" + page : ""}${
      search ? "&search=" + search : ""
    }${type ? "&type=" + type : ""}`,
  updateRequestStatusById: (id) => `request/${id}`,
  getServiceRequestListById: ({ page = 1, id = "" }) =>
    `service/booking-request/${id}${page ? "?&page=" + page : ""}`,

  // Events
  getAllEvents: ({ page = 1, search = "" }) =>
    `event/all-events?${page ? "&page=" + page : ""}${
      search ? "&search=" + search : ""
    }`,
  eventVisibility: (id) => `event/visibility/${id}`,
  getEventDetailById: (id) => `event/detail/${id}`,
  getEventServiceRequests: ({ page = 1 }) =>
    `event/request${page ? "?&page=" + page : ""}`,

  // Provider Services
  getAllProviderServices: ({ page = 1, search = "" }) =>
    `service?${page ? "&page=" + page : ""}${
      search ? "&search=" + search : ""
    }`,
  providerServiceVisibility: (id) => `service/visibility/${id}`,

  // Transactions
  getAllTransactions: ({ page = 1, id = "", payment = "" }) =>
    `event/transaction-history/${id ? id : ""}${
      payment ? "?payment=" + payment : ""
    }${page ? "&page=" + page : ""}`,

  // Event Change Requests
  getAllChangeEventRequest: ({ page = 1 }) =>
    `event/request/${page ? "?page=" + page : ""}`,
  changeEventRequestDetailById: (id) => `event/request-detail/${id}`,

  // Statistics
  getAllStatisticsData: () => `stats/admin`,
});
