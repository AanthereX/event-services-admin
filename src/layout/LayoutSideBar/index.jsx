/** @format */
import React, { Fragment, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { classNames } from "../../utils/ClassNames";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import { useDispatch } from "react-redux";
import { Icons } from "../../assets/icons";
import labels from "../../locale";
import Image from "../../components/atoms/image";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import UsersIcon from "../../assets/icons/UsersIcon";
import VendorsIcon from "../../assets/icons/VendorsIcon";
import VenuesIcon from "../../assets/icons/VenuesIcon";
import VenuesFacilitiesIcon from "../../assets/icons/VenuesFacilitiesIcon";
import ServiceCategoriesIcon from "../../assets/icons/ServiceCategoriesIcon";
import ServicesIcon from "../../assets/icons/ServicesIcon";
import EventServicesIcon from "../../assets/icons/EventServicesIcon";
import EventsIcon from "../../assets/icons/EventsIcon";
import PayoutsIcon from "../../assets/icons/PayoutsIcon";
import TransactionHistoryIcon from "../../assets/icons/TransactionHistoryIcon";
import RequestedServicesIcon from "../../assets/icons/RequestedServicesIcon";
import RatingAndReviewsIcon from "../../assets/icons/RatingAndReviewsIcon";
import StatisticsActive from "../../assets/icons/StatisticsActive";
import { removeLoginData } from "../../store/slices/auth.slice";

const { logo, Close, Logout, Settings, ChevronRight, ChevronDown, ChevronUp } =
  Icons;
const {
  changeRequest,
  dashboard,
  logout,
  providerRequest,
  users,
  vendors,
  invitations,
  venues,
  venueFacilities,
  serviceCategories,
  services,
  eventServices,
  requestedServices,
  servicesRequest,
  ratingAndReviews,
  events,
  payouts,
  transactionHistory,
  settings,
  statistics,
  venueTransactions,
  serviceTransactions,
  monetaryTransactions,
  categories,
  facilities,
  providerServices,
} = labels;

const Sidebar = ({
  onClose,
  isOpen = false,
  setSidebarOpen = () => {},
  user = null,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckNavigationCondition = (value, href, exact = false) => {
    // Get the current pathname
    const currentPath = location.pathname.toLowerCase();

    // If exact match is required
    if (exact) {
      return currentPath === href.toLowerCase();
    }

    // Check if the current path matches the base href or contains the value
    return (
      currentPath.startsWith(href.toLowerCase()) || // Matches exact or nested paths
      (value && currentPath.includes(value.toLowerCase())) // Matches based on value
    );
  };

  const sidebarNavigationList = [
    {
      icon: DashboardIcon,
      name: dashboard,
      href: "/dashboard",
      current: true,
      dropdown: false,
      value: "dashboard",
    },
    {
      icon: UsersIcon,
      name: users,
      href: "/users",
      current: false,
      dropdown: false,
      value: "user",
    },
    {
      icon: VendorsIcon,
      name: vendors,
      href: "/vendors",
      current: false,
      dropdown: false,
      value: "vendors",
    },
    {
      icon: ServiceCategoriesIcon,
      name: categories,
      href: "/categories",
      current: false,
      dropdown: false,
      value: "categories",
    },
    {
      icon: VenuesFacilitiesIcon,
      name: facilities,
      href: "/facilities",
      current: false,
      dropdown: false,
      value: "facilities",
    },
    {
      icon: VenuesIcon,
      name: venues,
      href: "/venues",
      current: false,
      dropdown: false,
      value: "venues",
    },
    {
      icon: EventServicesIcon,
      name: providerServices,
      href: "/provider-services",
      current: false,
      dropdown: false,
      value: "provider-services",
    },
    {
      icon: RequestedServicesIcon,
      name: providerRequest,
      href: "/provider-request",
      current: false,
      dropdown: false,
      value: "provider-request",
    },
    {
      icon: EventsIcon,
      name: events,
      href: "/events",
      current: false,
      dropdown: false,
      value: "events",
    },
    {
      icon: RatingAndReviewsIcon,
      name: ratingAndReviews,
      href: "/rating-and-reviews",
      current: false,
      dropdown: false,
      value: "ratingandreviews",
    },
    {
      icon: RatingAndReviewsIcon,
      name: invitations,
      href: "/invitations",
      current: false,
      dropdown: false,
      value: "invitations",
    },
    {
      icon: RatingAndReviewsIcon,
      name: changeRequest,
      href: "/change-request",
      current: false,
      dropdown: false,
      value: "changerequest",
    },
    // {
    //   icon: PayoutsIcon,
    //   name: payouts,
    //   href: "/payout",
    //   current: true,
    //   dropdown: false,
    //   value: "payouts",
    // },
    {
      icon: TransactionHistoryIcon,
      name: transactionHistory,
      href: "/transaction-history",
      current: false,
      dropdown: true,
      value: "transactions",
      dropdownItems: [
        {
          icon: null,
          name: venueTransactions,
          href: "/venue-transaction",
          value: "venue-transaction",
        },
        {
          icon: null,
          name: serviceTransactions,
          href: "/service-transaction",
          value: "service-transaction",
        },
        {
          icon: null,
          name: monetaryTransactions,
          href: "/monetary-transaction",
          value: "monetary-transaction",
        },
      ],
    },
    {
      icon: StatisticsActive,
      name: statistics,
      href: "/stats",
      current: false,
      dropdown: false,
      value: "stats",
    },
  ];

  const handleLogout = () => {
    dispatch(removeLoginData());
    navigate("/login");
  };

  const sideBarBottomOptions = [
    // {
    //   id: 1,
    //   title: settings,
    //   icon: Settings,
    //   iconAlt: "settingicon",
    //   action: () => {
    //     navigate("/setting");
    //   },
    // },
    {
      id: 2,
      title: logout,
      icon: Logout,
      iconAlt: "logouticon",
      action: handleLogout,
    },
  ];

  return (
    <Fragment>
      {/* Mobile sidebar */}
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </TransitionChild>

          <div className="fixed inset-0 flex">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="bg-white relative mr-16 flex w-full max-w-xs flex-1">
                <div
                  className={
                    "w-full relative min-h-full overflow-hidden px-2 py-2"
                  }
                >
                  {/* Logo Section */}
                  <div className={"fixed top-4 w-auto md:!w-full !h-fit ml-4"}>
                    <Image
                      src={logo}
                      alt={"logo"}
                      width={64}
                      height={64}
                      onClick={() => navigate("/")}
                      className={"!w-[64px] !h-[64px] cursor-pointer"}
                    />
                  </div>

                  <div className={"pt-[90px] flex flex-col h-full"}>
                    <nav
                      className={"overflow-y-auto flex-1 px-2 "}
                      style={{ maxHeight: "100%", minHeight: "100%" }}
                    >
                      <div className={"w-full mx-0 px-0 space-y-2"}>
                        {sidebarNavigationList.map((item) => (
                          <li
                            key={item.name}
                            className={classNames(
                              handleCheckNavigationCondition(
                                item?.value,
                                item.href,
                              )
                                ? "bg-c_primary text-white"
                                : "bg-c_F3F5F8 text-c_5F6165",
                              "overflow-hidden mx-2 list-none rounded-lg",
                            )}
                          >
                            <div className="flex items-center">
                              <Link
                                onClick={() => setSidebarOpen(false)}
                                to={
                                  item?.dropdown &&
                                  item?.dropdownItems?.length > 0
                                    ? item.href + item?.dropdownItems[0]?.href
                                    : item?.href
                                }
                                className={classNames(
                                  handleCheckNavigationCondition(
                                    item?.value,
                                    item.href,
                                  )
                                    ? "bg-c_primary text-white"
                                    : "bg-c_F3F5F8 text-c_5F6165",
                                  "h-[42px] w-full capitalize flex items-center gap-x-3 py-[17px] px-2 text-fs_16 font-outfit-regular leading-[18px] tracking-[-0.25px] rounded-lg",
                                )}
                              >
                                <item.icon
                                  color={
                                    handleCheckNavigationCondition(
                                      item?.value,
                                      item.href,
                                    )
                                      ? "#FFFFFF"
                                      : "#5F6165"
                                  }
                                />

                                {item.name}
                                {item?.dropdown && (
                                  <Image
                                    src={
                                      handleCheckNavigationCondition(
                                        item?.value,
                                        item.href,
                                      )
                                        ? ChevronUp
                                        : ChevronDown
                                    }
                                    alt={item.name}
                                    className="w-[10px] h-[10px]"
                                  />
                                )}
                              </Link>
                            </div>
                            {item?.dropdown &&
                              handleCheckNavigationCondition(
                                item?.value,
                                item.href,
                              ) &&
                              item?.dropdownItems?.length > 0 && (
                                <div
                                  className={
                                    "bg-c_F5F6FA mt-0 rounded-[8px] grid gap-2 py-2 px-[10px] w-full"
                                  }
                                >
                                  {item?.dropdownItems?.map((dropdownItem) => (
                                    <Link
                                      key={dropdownItem.name}
                                      to={item.href + dropdownItem.href}
                                      className={classNames(
                                        handleCheckNavigationCondition(
                                          item?.value,
                                          item.href + dropdownItem.href,
                                          true,
                                        )
                                          ? "bg-c_66A5C4 text-white"
                                          : "bg-white text-primary",
                                        "h-[44px] w-full flex items-center gap-x-3 py-[10px] px-[14px] rounded font-outfit-regular text-sm leading-[18px]",
                                      )}
                                    >
                                      {!!dropdownItem?.icon && (
                                        <Image
                                          src={dropdownItem.icon}
                                          alt={dropdownItem.name}
                                          className={`"w-6 h-6 ${
                                            handleCheckNavigationCondition(
                                              item?.value,
                                              item.href + dropdownItem.href,
                                              true,
                                            )
                                              ? ""
                                              : "hidden"
                                          }`}
                                        />
                                      )}

                                      {!!dropdownItem?.icon && (
                                        <Image
                                          src={dropdownItem.icon}
                                          alt={dropdownItem.name}
                                          className={`w-6 h-6 ${
                                            handleCheckNavigationCondition(
                                              item?.value,
                                              item.href + dropdownItem.href,
                                              true,
                                            )
                                              ? "hidden"
                                              : ""
                                          }`}
                                        />
                                      )}
                                      {dropdownItem.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                          </li>
                        ))}
                      </div>
                    </nav>

                    {/* Bottom Section */}
                    {/* <div
                      className={
                        "w-auto   fixed bottom-0  py-6 px-4 flex flex-col items-start justify-start gap-y-1"
                      }
                    >
                      {sideBarBottomOptions?.map((item) => {
                        return (
                          <Button
                            label={item?.title}
                            variant={"none"}
                            size={"md"}
                            btnTextClassName={""}
                            img={item?.icon}
                            imgAlt={item?.iconAlt}
                            onClick={item?.action}
                            className={
                              "font-outfit-regular w-full h-fit text-fs_16 leading-[14px] tracking-[-0.25px]"
                            }
                          />
                        );
                      })}
                    </div> */}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div
        className={
          "hidden lg:fixed lg:inset-y-6 lg:inset-l-4 lg:z-5 lg:flex lg:w-[280px] lg:flex-col"
        }
      >
        <div className={"w-full relative min-h-full overflow-hidden px-2 py-2"}>
          {/* Logo Section */}
          <div className={"fixed top-4 !w-full !h-fit ml-4"}>
            <Image
              src={logo}
              alt={"logo"}
              width={64}
              height={64}
              onClick={() => navigate("/")}
              className={"!w-[64px] !h-[64px] cursor-pointer"}
            />
          </div>

          <div className={"pt-[72px] flex flex-col h-full"}>
            <nav
              className={"overflow-y-auto flex-1 px-2"}
              style={{ maxHeight: "100%", minHeight: "100%" }}
            >
              <div className={"w-full mx-0 px-0 space-y-2"}>
                {sidebarNavigationList.map((item) => (
                  <li
                    key={item.name}
                    className={classNames(
                      handleCheckNavigationCondition(item?.value, item.href)
                        ? "bg-c_primary text-white"
                        : "bg-c_F3F5F8 text-black",
                      "overflow-hidden mx-2 list-none rounded-lg",
                    )}
                  >
                    <div className="flex items-center">
                      <Link
                        to={
                          item?.dropdown && item?.dropdownItems?.length > 0
                            ? item.href + item?.dropdownItems[0]?.href
                            : item?.href
                        }
                        className={classNames(
                          handleCheckNavigationCondition(item?.value, item.href)
                            ? "bg-c_primary text-white"
                            : "bg-c_F3F5F8 text-c_5F6165",
                          "h-[42px] w-full capitalize flex items-center gap-x-3 py-[17px] px-2 text-fs_16 font-outfit-regular leading-[18px] tracking-[-0.25px] rounded-lg",
                        )}
                      >
                        <item.icon
                          color={
                            handleCheckNavigationCondition(
                              item?.value,
                              item.href,
                            )
                              ? "#FFFFFF"
                              : "#5F6165"
                          }
                        />

                        {item.name}
                        {item?.dropdown && (
                          <Image
                            src={
                              handleCheckNavigationCondition(
                                item?.value,
                                item.href,
                              )
                                ? ChevronUp
                                : ChevronDown
                            }
                            alt={item.name}
                            className={"w-[10px] h-[10px]"}
                          />
                        )}
                      </Link>
                    </div>
                    {item?.dropdown &&
                      handleCheckNavigationCondition(item?.value, item.href) &&
                      item?.dropdownItems?.length > 0 && (
                        <div
                          className={
                            "bg-c_F5F6FA text-c_5F6165 mt-0 rounded-[8px] grid gap-2 py-2 px-[10px] w-full"
                          }
                        >
                          {item?.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={item.href + dropdownItem.href}
                              className={classNames(
                                handleCheckNavigationCondition(
                                  item?.value,
                                  item.href + dropdownItem.href,
                                  true,
                                )
                                  ? "bg-c_66A5C4 text-white"
                                  : "bg-white text-primary",
                                "h-[44px] w-full flex items-center gap-x-3 py-[10px] px-[14px] rounded font-outfit-regular text-sm leading-[18px]",
                              )}
                            >
                              {!!dropdownItem?.icon && (
                                <Image
                                  src={dropdownItem.icon}
                                  alt={dropdownItem.name}
                                  className={`"w-6 h-6 ${
                                    handleCheckNavigationCondition(
                                      item?.value,
                                      item.href + dropdownItem.href,
                                      true,
                                    )
                                      ? ""
                                      : "hidden"
                                  }`}
                                />
                              )}

                              {!!dropdownItem?.icon && (
                                <Image
                                  src={dropdownItem.icon}
                                  alt={dropdownItem.name}
                                  className={`w-6 h-6 ${
                                    handleCheckNavigationCondition(
                                      item?.value,
                                      item.href + dropdownItem.href,
                                      true,
                                    )
                                      ? "hidden"
                                      : ""
                                  }`}
                                />
                              )}
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </li>
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            {/* <div
              className={
                "w-auto pt-24 fixed bottom-0 h-[150px] py-6 px-4 flex flex-col items-start justify-start gap-y-1"
              }
            >
              {sideBarBottomOptions?.map((item) => {
                return (
                  <Button
                    label={item?.title}
                    variant={"none"}
                    size={"md"}
                    btnTextClassName={""}
                    img={item?.icon}
                    imgAlt={item?.iconAlt}
                    onClick={item?.action}
                    className={
                      "font-outfit-regular text-c_5F6165 w-full h-fit text-fs_16 leading-[14px] tracking-[-0.25px]"
                    }
                  />
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(Sidebar);
