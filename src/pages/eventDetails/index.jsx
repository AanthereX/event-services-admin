/** @format */

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Heading from "../../components/atoms/heading";
import Paragraph from "../../components/atoms/paragraph";
import labels from "../../locale";
import { useLocation, useParams } from "react-router-dom";
import DetailsFeild from "../../components/molecules/detailsFeild";
import Divider from "../../components/atoms/divider";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import ButtonBadgeList from "../../components/molecules/buttonBadgelist";
import Container from "../../layout/container";
import BackArrowButton from "../../components/molecules/backArrowButton";
import TransactionHistoryTable from "../../components/organisms/tables/transactionHistoryTableEventDetail";
import CountUp from "react-countup";
import { kFormatter } from "../../utils";
import Image from "../../components/atoms/image";
import {
  getInviteesList,
  getPageData,
  setInviteesList,
} from "../../store/slices/invitees.slice";
import {
  getTransactionList,
  transactionPageData,
  setTransactionsList,
} from "../../store/slices/transaction.slice";
import StarRating from "../../components/molecules/starRating";
import PeopleInvitedSection from "../../components/organisms/peopleInvitedSection";
import { useLazyGetEventDetailByIdQuery } from "../../services/eventService";
import moment from "moment";
import ApiLoader from "../../components/loaders/apiLoader";
import { useLazyGetEventInvitationInviteesQuery } from "../../services/invitationService";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAllTransactionsQuery } from "../../services/transactionSevice";
import { EventTypes } from "../../constants";
import BadgePill from "../../components/atoms/badgePill";
import MonetaryGiftCard from "../../components/molecules/monetaryGiftCard";

const { Download, DefaultAvatar } = Icons;

const EventDetails = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const data = location?.state?.data;
  const eventId = location.state?.data?.id || params?.id;
  const pageData = useSelector(getPageData);
  const pageDataTransaction = useSelector(transactionPageData);
  const transactionsDataList = useSelector(getTransactionList);
  const inviteesDataList = useSelector(getInviteesList);
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [loaderGetEvents, setLoaderGetEvents] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedActivity, setSelectedAactivity] = useState(false);
  const [allInvitees, setAllInvitees] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [count, setCount] = useState("");
  const [countTransactions, setCountTransactions] = useState("");
  const [paymentType, setPaymentType] = useState("service");

  const bookingDates = eventsData
    ?.find((val) => val)
    ?.venueBooking?.find((val) => val)
    ?.venueBookingDetails?.map((item) => {
      return {
        ...item,
        label: moment(item?.venueAvailability?.date).format("DD-MM-YYYY"),
      };
    });

  const monetaryGiftData = useMemo(() => {
    const card = eventsData
      ?.find((val) => val)
      ?.invitationCards?.find((val) => val);

    return {
      listing: card?.monetaryGift || [],
      countEnd: card?.monetaryGift?.length || 0,
    };
  }, [eventsData]);

  const [getEventDetailById, { isLoading, isFetching, isError }] =
    useLazyGetEventDetailByIdQuery();
  const [
    getEventInvitationInvitees,
    {
      isLoading: loadingGetInvitationInitees,
      isFetching: isFetchingGetInvitationInitees,
      isError: isErrorGetInvitationInitees,
    },
  ] = useLazyGetEventInvitationInviteesQuery();
  const [
    getAllTransactions,
    {
      isLoading: loadingGetTransactions,
      isFetching: isFetchingGetTransactions,
      isError: isErrorGetTransactions,
    },
  ] = useLazyGetAllTransactionsQuery();

  const handlerGetEventInvitees = useCallback(async (page, _id) => {
    setLoading(true);
    try {
      const response = await getEventInvitationInvitees({
        page,
        id: _id,
      }).unwrap();
      setAllInvitees(response.data?.invitees);
      setCount(response.data?.count);
      dispatch(
        setInviteesList({
          data: response.data?.invitees,
          meta: {
            totalItems: response.data?.count,
            itemCount: response.data?.count,
            itemsPerPage: 10,
            totalPages:
              (response.data?.count / 10) % 1 !== 0
                ? parseInt(response.data?.count / 10) + 1
                : parseInt(response.data?.count / 10),
            currentPage: page,
          },
        }),
      );
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlerGetAllTransactions = useCallback(
    async (page, _id, _paymentType) => {
      setLoadingTransactions(true);
      try {
        const response = await getAllTransactions({
          page,
          id: _id,
          payment: _paymentType,
        }).unwrap();
        if (!response?.data) return;
        setAllTransactions(
          response.data?.transactionHistory?.transactionHistory,
        );
        setCountTransactions(response.data?.count);
        dispatch(
          setTransactionsList({
            data: response.data?.transactionHistory?.transactionHistory,
            meta: {
              totalItems: response.data?.count,
              itemCount: response.data?.count,
              itemsPerPage: 10,
              totalPages:
                (response.data?.count / 10) % 1 !== 0
                  ? parseInt(response.data?.count / 10) + 1
                  : parseInt(response.data?.count / 10),
              currentPage: page,
            },
          }),
        );
      } catch (error) {
        console.log(error?.data?.message || error?.message);
      } finally {
        setLoadingTransactions(false);
      }
    },
    [],
  );

  const handlerGetEventDetailsById = useCallback(async (_eventId) => {
    try {
      setLoading(true);
      const response = await getEventDetailById({ id: _eventId }).unwrap();
      if (!response) return;
      setEventsData(response?.data);
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handlerGetEventDetailsById(eventId);
    if (eventsData?.find((val) => val)?.eventType === EventTypes.PRIVATE) {
      handlerGetEventInvitees(1, eventId);
    }
  }, []);

  useEffect(() => {
    handlerGetAllTransactions(1, eventId, paymentType);
  }, [paymentType]);

  const paymentStatusTabs = [
    {
      id: 1,
      title: labels.service,
      type: "service",
      action: () => {
        setPaymentType("service");
      },
    },

    {
      id: 2,
      title: labels.venue,
      type: "venue",
      action: () => {
        setPaymentType("venue");
      },
    },
    {
      id: 3,
      title: labels.monetaryGift,
      type: "monetaryGift",
      action: () => {
        setPaymentType("monetaryGift");
      },
    },
  ];

  return (
    <Container>
      <BackArrowButton />

      <ApiLoader block={loading}>
        <Fragment>
          <div className={"px-6 py-3"}>
            <Heading className={"md:text-fs_32 text-fs_24"}>
              {labels?.eventServiceDetails}
            </Heading>
          </div>

          <div className={"py-5 px-6 flex flex-col gap-4"}>
            <div className={"flex flex-col gap-4"}>
              <Heading className={"md:text-fs_24 text-fs_18"}>
                {eventsData?.find((val) => val)?.name ?? labels.notAvailable}
              </Heading>
              <Paragraph className={"!text-c_818181"}>
                {eventsData?.find((val) => val)?.description ??
                  labels.notAvailable}
              </Paragraph>
            </div>
            <div
              className={
                "flex capitalize items-center md:gap-16 gap-4 flex-wrap py-3"
              }
            >
              <DetailsFeild
                title={labels.eventType}
                description={
                  eventsData?.find((val) => val)?.eventType ??
                  labels.notAvailable
                }
                descriptionStyle={"font-outfit_medium"}
              />
              <div className={"flex flex-col gap-3"}>
                <ButtonBadgeList
                  title={labels?.date}
                  data={bookingDates || []}
                  isEventDetailsPage
                  titleStyle={
                    "text-c_818181 font-outfit_medium md:!text-fs_18 font-outfit_regular mb-3 leading-[20px]"
                  }
                  btnClassName={"!min-h-[24px] !text-fs_14 !px-[6px] !py-[4px]"}
                />
              </div>
              <DetailsFeild
                title={labels.time}
                description={`${eventsData?.find((val) => val)?.startTime} - ${
                  eventsData?.find((val) => val)?.endTime
                }`}
                descriptionStyle={"font-outfit_medium"}
              />
            </div>

            <Divider />
            <div className={"py-5"}>
              <Paragraph
                className={"font-outfit_semiBold md:text-fs_20 text-fs_18"}
              >
                {labels?.eventOwnerInformation}
              </Paragraph>
              <div className={"flex items-center gap-8 flex-wrap pt-4"}>
                <DetailsFeild
                  image={
                    eventsData?.find((val) => val)?.user?.image ?? DefaultAvatar
                  }
                  title={labels.eventOwner}
                  description={
                    eventsData?.find((val) => val)?.user?.fullName ??
                    labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_semiBold"}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.emailAddress}
                  description={
                    eventsData?.find((val) => val)?.user?.email ??
                    labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_semiBold"}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.phoneNumber}
                  description={
                    eventsData?.find((val) => val)?.user?.phoneNumber ??
                    labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_semiBold"}
                />
              </div>
            </div>
            <Divider />
            <div className={"py-5"}>
              <Paragraph
                className={"font-outfit_semiBold md:text-fs_20 text-fs_18"}
              >
                {labels?.eventServices}
              </Paragraph>
              <div className={""}>
                {eventsData
                  ?.find((val) => val)
                  ?.serviceBooking?.map((service, index) => {
                    return (
                      <Fragment key={index}>
                        <div
                          className={`flex items-center gap-8 flex-wrap ${
                            index == 0 ? "py-4" : "py-6"
                          }`}
                        >
                          <DetailsFeild
                            title={labels.serviceName}
                            description={
                              service?.service?.name ?? labels.notAvailable
                            }
                            descriptionStyle={"font-outfit_semiBold"}
                          />
                          <div
                            className={
                              "h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"
                            }
                          ></div>
                          <DetailsFeild
                            title={labels.serviceCategory}
                            description={
                              service?.service?.category?.nameEn ??
                              labels.notAvailable
                            }
                            descriptionStyle={"font-outfit_semiBold"}
                          />
                          <div
                            className={
                              "h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"
                            }
                          ></div>
                          <DetailsFeild
                            image={
                              service?.service?.user?.image ?? DefaultAvatar
                            }
                            title={labels.provider}
                            description={
                              service?.service?.user?.fullName ??
                              labels.notAvailable
                            }
                            descriptionStyle={"font-outfit_semiBold"}
                          />
                          <div
                            className={
                              "h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"
                            }
                          ></div>
                          <DetailsFeild
                            title={labels.status}
                            description={service?.status}
                            descriptionStyle={`font-outfit_semiBold capitalize ${
                              service?.status?.toLowerCase() == "accepted"
                                ? "text-c_2CBD4D"
                                : service?.status?.toLowerCase() == "rejected"
                                ? "text-c_EF394A"
                                : "text-c_FF9500"
                            }`}
                          />
                          <div
                            className={
                              "h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"
                            }
                          ></div>
                          <DetailsFeild
                            title={labels.paymentStatus}
                            description={service?.paymentStatus}
                            descriptionStyle={`font-outfit_semiBold capitalize ${
                              service?.paymentStatus?.toLowerCase() ==
                              "accepted"
                                ? "text-c_2CBD4D"
                                : service?.paymentStatus?.toLowerCase() ==
                                  "rejected"
                                ? "text-c_EF394A"
                                : "text-c_FF9500"
                            }`}
                          />
                        </div>
                        <Divider />
                        {!!data?.rating ? (
                          <Fragment>
                            <div
                              className={
                                "flex flex-col items-start justify-center gap-1 mt-5 mb-7"
                              }
                            >
                              <Heading
                                className={
                                  "text-black font-outfit_medium leading-[22px] md:text-fs_18 text-fs_16"
                                }
                              >
                                {labels.review}
                              </Heading>
                              <StarRating
                                rating={data?.rating?.value}
                                containerPadding={"px-0"}
                                showBracketsAroundValue={false}
                                valueClassname={"text-fs_14 mb-[2px]"}
                              />
                              <Paragraph
                                className={
                                  "!text-c_8C8C8C font-outfit_regular tracking-[-0.3px] pt-1 leading-[16px] md:text-fs_14 text-fs_14"
                                }
                              >
                                {data?.rating?.description}
                              </Paragraph>
                            </div>
                            <Divider />
                          </Fragment>
                        ) : null}
                      </Fragment>
                    );
                  })}
              </div>
            </div>
            <div>
              <Paragraph
                className={"font-outfit_semiBold md:text-fs_20 text-fs_18"}
              >
                {labels?.eventVenue}
              </Paragraph>

              <div className={`flex items-center gap-8 flex-wrap py-4`}>
                <DetailsFeild
                  title={labels.venueName}
                  description={
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)?.venues?.name ??
                    labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_semiBold"}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.venueLocation}
                  description={
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)?.venues?.location ??
                    labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_semiBold"}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.guestCapacity}
                  description={
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)?.venues
                      ?.guestCapacity ?? labels.notAvailable
                  }
                  descriptionStyle={`font-outfit_semiBold`}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  image={
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)?.venues?.user?.image ??
                    DefaultAvatar
                  }
                  title={labels.provider}
                  description={
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)?.venues?.user
                      ?.fullName ?? labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_semiBold"}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>

                <DetailsFeild
                  title={labels.status}
                  description={
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)?.venues?.user?.status
                  }
                  descriptionStyle={`font-outfit_semiBold capitalize ${
                    eventsData
                      ?.find((val) => val)
                      ?.venueBooking?.find((val) => val)
                      ?.venues?.user?.status?.toLowerCase() == "accepted"
                      ? "text-c_2CBD4D"
                      : eventsData
                          ?.find((val) => val)
                          ?.venueBooking?.find((val) => val)
                          ?.venues?.user?.status?.toLowerCase() == "rejected"
                      ? "text-c_EF394A"
                      : "text-c_FF9500"
                  }`}
                />
              </div>

              <Divider />
            </div>

            {eventsData?.find((val) => val)?.eventType ===
            EventTypes.PRIVATE ? (
              <PeopleInvitedSection
                pageData={pageData}
                loading={loadingGetInvitationInitees}
                data={inviteesDataList || allInvitees}
              />
            ) : null}

            {/* !!eventsData?.find((val) => val)?.invitationCards[0]?.image */}

            <div className={"grid grid-cols-3 gap-5 py-5"}>
              <div
                className={
                  "md:col-span-2 col-span-3 border border-c_D1D1D1 rounded-[21px] max-h-[450px]"
                }
              >
                <div className={"flex items-center justify-between px-8 py-5"}>
                  <Heading
                    className={"md:text-fs_24 text-fs_16 font-outfit_semiBold"}
                  >
                    {labels?.invitationCard}
                  </Heading>
                  <Button
                    imageUrl={
                      eventsData?.find((val) => val)?.invitationCards[0]?.image
                    }
                    img={Download}
                    label={"Download"}
                    className={`flex justify-between items-center !w-[110px] !bg-c_primary text-white !py-2 !rounded-[6px]  `}
                  />
                </div>
                <Divider />
                <div className={"p-6 flex items-center justify-center"}>
                  <Image
                    src={
                      eventsData?.find((val) => val)?.invitationCards[0]?.image
                    }
                    className={"!w-full !h-[320px] !rounded-xl !object-cover"}
                  />
                </div>
              </div>

              {!!eventsData
                ?.find((val) => val)
                ?.invitationCards?.find((val) => val)?.sendMonetaryGift ? (
                <MonetaryGiftCard
                  listing={monetaryGiftData.listing}
                  countEnd={monetaryGiftData.countEnd}
                />
              ) : null}
            </div>

            {/* Payment Details Section */}
            {/* <div
              className={"p-6 bg-c_F6F6F69E rounded-2xl flex flex-col gap-7"}
            >
              <Heading className={"md:text-fs_20 font-outfit_semiBold"}>
                {labels?.paymentDetails}
              </Heading>
              <div className={"flex items-center justify-between"}>
                <Paragraph className={"text-c_818181 md:text-fs_20"}>
                  {labels?.fullAmountRequiredForTheEvent}
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
              <Divider />
              <div className={"flex items-center justify-between"}>
                <Paragraph
                  className={"md:text-fs_20 flex font-outfit_semiBold"}
                >
                  {labels?.subTotal}&nbsp;
                  <Paragraph className={"md:text-fs_14 font-outfit_semiBold"}>
                    {`(${labels?.costsByServices}) `}
                  </Paragraph>
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
              <div className={"flex items-center justify-between"}>
                <Paragraph className={"text-c_818181  md:text-fs_20"}>
                  {labels?.venue}
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
              <div className={"flex items-center justify-between"}>
                <Paragraph className={"text-c_818181  md:text-fs_20"}>
                  {labels?.catering}
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
              <div className={"flex items-center justify-between"}>
                <Paragraph className={"text-c_818181 md:text-fs_20"}>
                  {labels?.photography}
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
              <Divider />
              <div className={"flex items-center justify-between"}>
                <Paragraph className={"text-c_818181 md:text-fs_20"}>
                  {labels?.downPayment}
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
              <div className={"flex items-center justify-between"}>
                <Paragraph className={"text-c_818181 md:text-fs_20"}>
                  {`${labels?.finalPaymentDue}: "${labels.twentyFourHrsBeforeEvents}"`}
                </Paragraph>
                <Paragraph className={"md:text-fs_20 font-outfit_semiBold"}>
                  10,000 OMR
                </Paragraph>
              </div>
            </div> */}

            <div className={"border border-c_D1D1D1 pt-5 rounded-[24px]"}>
              <div className={"w-full flex items-center justify-between"}>
                <Heading className={"md:text-fs_32 text-fs_24 px-5"}>
                  {labels?.transactionHistory}
                </Heading>
                <div className={"flex items-center justify-start gap-2 pr-6"}>
                  {paymentStatusTabs?.map((item, idx) => {
                    return (
                      <Button
                        key={idx}
                        className={
                          "!px-[15px] !whitespace-nowrap !py-[4px] !rounded-full"
                        }
                        size={"sm"}
                        variant={
                          item?.type === paymentType
                            ? "primary"
                            : "secondary-outline"
                        }
                        label={item?.title}
                        onClick={item?.action}
                      />
                    );
                  })}
                </div>
              </div>

              <TransactionHistoryTable
                loading={loadingTransactions}
                paymentType={paymentType}
                transactions={transactionsDataList || allTransactions}
                pageData={pageDataTransaction}
              />
            </div>
          </div>
        </Fragment>
      </ApiLoader>
    </Container>
  );
};

export default EventDetails;
