/** @format */

export const BreakPoints = Object.freeze({
  MOBILE: 425,
  TAB: 768,
  LAPTOP: 1024,
  DESKTOP: 1440,
});

export const DynamicRoutes = Object.freeze({
  USERDETAILS: "/user-details",
  VENDORDETAILS: "/vendors/details",
  TRANSACTIONDETAILS: "/transaction-details",
  VENUESDETAILS: "/venues/details",
  EVENTSDETAILS: "/events/details",
  EVENTSERVICEDETAILS: "/provider-services/details",
});

export const UserTypes = Object.freeze({
  USER: "User",
  VENDOR: "Vendor",
});

export const CardTypes = Object.freeze({
  CUSTOM: "custom",
  UPLOAD: "upload",
});

export const EventTypes = Object.freeze({
  PRIVATE: "private",
  GENERAL: "general",
});

export const EntryStatus = Object.freeze({
  PENDING: "pending",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
});

export const ServiceRequestStatusType = Object.freeze({
  PENDING: "pending",
  UNDERREVIEW: "underReview",
  ACCEPTED: "accepted",
  APPROVED: "approved",
  DECLINED: "declined",
  REJECTED: "rejected",
});

export const PaymentStatus = [
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Declined",
    value: "declined",
  },
];
