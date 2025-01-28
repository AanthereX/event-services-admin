/** @format */

import { Suspense, lazy } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../pages/login/index.jsx";
import { useSelector } from "react-redux";
import LayoutWrapper from "../layout/wrapperContainer";
import PageLoader from "../components/loaders/pageLoader";
import { getToken, getUserData } from "../store/slices/auth.slice.js";

const routes = [
  {
    id: "1",
    path: "/dashboard",
    component: lazy(() => import("../pages/dashboard")),
  },
  {
    id: "2",
    path: "/vendors",
    component: lazy(() => import("../pages/vendors")),
  },
  {
    id: "3",
    path: "/users",
    component: lazy(() => import("../pages/users")),
  },
  {
    id: "4",
    path: "/vendors/details/:id",
    component: lazy(() => import("../pages/vendorDetails")),
  },
  {
    id: "5",
    path: "/venues",
    component: lazy(() => import("../pages/venues")),
  },
  {
    id: "6",
    path: "/venues/details/:id",
    component: lazy(() => import("../pages/venueDetails")),
  },
  {
    id: "7",
    path: "/provider-services",
    component: lazy(() => import("../pages/eventServices")),
  },
  {
    id: "8",
    path: "/facilities",
    component: lazy(() => import("../pages/facilities")),
  },
  {
    id: "9",
    path: "/categories",
    component: lazy(() => import("../pages/categories")),
  },
  {
    id: "10",
    path: "/provider-request",
    component: lazy(() => import("../pages/requestedService")),
  },
  {
    id: "11",
    path: "/user-details/:id",
    component: lazy(() => import("../pages/userDetails")),
  },
  {
    id: "12",
    path: "/provider-services/details/:id",
    component: lazy(() => import("../pages/eventServiceDetails")),
  },
  {
    id: "13",
    path: "/events",
    component: lazy(() => import("../pages/events")),
  },
  {
    id: "14",
    path: "/transaction-history",
    component: lazy(() => import("../pages/transactionHistory")),
  },
  {
    id: "15",
    path: "/events/details/:id",
    component: lazy(() => import("../pages/eventDetails")),
  },
  {
    id: "16",
    path: "/rating-and-reviews",
    component: lazy(() => import("../pages/reviewsAndRatings")),
  },
  {
    id: "17",
    path: "/transaction-details/:id",
    component: lazy(() => import("../pages/transactionDetails")),
  },
  {
    id: "18",
    path: "/stats",
    component: lazy(() => import("../pages/statistics")),
  },
  {
    id: "19",
    path: "/stats/details",
    component: lazy(() => import("../pages/statisticDetails")),
  },
  {
    id: "20",
    path: "/invitations",
    component: lazy(() => import("../pages/invitations")),
  },
  {
    id: "21",
    path: "/change-request",
    component: lazy(() => import("../pages/changeRequest")),
  },
  {
    id: "22",
    path: "/change-request/detils",
    component: lazy(() => import("../pages/changeRequestDetails")),
  },
  {
    id: "23",
    path: "/transaction-history/venue-transaction",
    component: lazy(() => import("../pages/venueTransactions")),
  },
  {
    id: "24",
    path: "/transaction-history/service-transaction",
    component: lazy(() => import("../pages/serviceTransaction")),
  },
  {
    id: "25",
    path: "/transaction-history/monetary-transaction",
    component: lazy(() => import("../pages/monetaryTransaction")),
  },
];

const PublicRoute = ({ component }) => {
  const token = useSelector(getToken);
  const user = useSelector(getUserData);
  if (!token) {
    return component;
  }
  return <Navigate to={"/dashboard"} replace />;
};

const PrivateRoute = ({ component, routeName }) => {
  const token = useSelector(getToken);
  const userData = useSelector(getUserData);
  const role = userData?.userRole?.role;

  if (!!token?.accessToken) {
    if (role == "Admin") return component;
    else if (
      userData?.["access-modules"]?.some(
        (item) => item?.feature == routeName && item?.read,
      )
    ) {
      return component;
    } else {
      let readAccessModule = userData?.["access-modules"]?.find(
        (value) => value?.read,
      );
      let route = routes.find(
        (value) => value?.value == readAccessModule?.feature,
      );

      return <Navigate to={route.path} replace />;
    }
  }
  return <Navigate to={"/login"} replace />;
};

const Layout = () => {
  return (
    <LayoutWrapper>
      <Outlet />
    </LayoutWrapper>
  );
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace />} />
      <Route path="/login" element={<PublicRoute component={<Login />} />} />

      <Route element={<Layout />}>
        {routes?.map((item) => {
          return (
            <Route
              key={item?.id}
              path={item?.path}
              element={
                <Suspense fallback={<PageLoader />}>
                  <PrivateRoute
                    component={<item.component />}
                    routeName={item.value}
                  />
                </Suspense>
              }
            ></Route>
          );
        })}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
