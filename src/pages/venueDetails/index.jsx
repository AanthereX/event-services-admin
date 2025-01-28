/** @format */

import { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Image from "../../components/atoms/image";
import Heading from "../../components/atoms/heading";
import labels from "../../locale";
import Paragraph from "../../components/atoms/paragraph";
import DetailsFeild from "../../components/molecules/detailsFeild";
import Divider from "../../components/atoms/divider";
import Button from "../../components/atoms/button";
import ButtonBadgeList from "../../components/molecules/buttonBadgelist";
import { Icons } from "../../assets/icons";
import DatePicker from "../../components/atoms/datePicker";
import VenueDateAndTimeDetails from "../../components/molecules/shiftDividers";
import Carousel from "../../components/molecules/carousel";
import Container from "../../layout/container";
import BackArrowButton from "../../components/molecules/backArrowButton";
import StatisticGraphTab from "../../components/organisms/statsGraphTab";
import {
  useLazyGetBookingDetailsByIdQuery,
  useLazyGetVenueAvailabilitiesQuery,
  useLazyGetVenueReviewsByIdQuery,
  useLazyGetVenuesDetailByIdQuery,
} from "../../services/venues";
import ApiLoader from "../../components/loaders/apiLoader";
import { ThreeCircles } from "react-loader-spinner";
import moment from "moment";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import {
  getPageData,
  getRatingsList,
  setRatingList,
} from "../../store/slices/ratings.slice";
import LoadMoreData from "../../components/loaders/loadMoreDataPagination";

const VenueDetails = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const data = location.state?.data;
  const pageData = useSelector(getPageData);
  const ratingsDataList = useSelector(getRatingsList);
  const [loading, setLoading] = useState(true);
  const [loadingGetBookedDetail, setLoadingGetBookedDetail] = useState(false);
  const [allReviewsLoader, setAllReviewsLoader] = useState(false);
  const [loadingGetAvailabilities, setLoadingGetAvailabilities] =
    useState(true);
  const [venueData, setVenueData] = useState([]);
  const [bookedData, setBookedData] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState("availability");
  const [availabilities, setAvailabilities] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").toDate(),
  );
  const [endDate, setEndDate] = useState(moment().endOf("month").toDate());
  const venueId = location.state?.data?.id || params?.id;
  const avGRating =
    ratingsDataList?.reduce((acc, item) => acc + item.rating, 0) /
    ratingsDataList?.length;
  const venueFacilities = venueData?.venueFacilities?.map((item) => {
    return {
      label: !!item?.facility ? item?.facility?.nameEn : null,
    };
  });

  const sliderPhotos = [venueData?.image];

  const [getVenuesDetailById, { isLoading, isFetching, isError }] =
    useLazyGetVenuesDetailByIdQuery();
  const [
    getVenueReviewsById,
    {
      isLoading: loadingGetReviews,
      isFetching: isFetchingGetReviews,
      isError: isErrorGetReviews,
    },
  ] = useLazyGetVenueReviewsByIdQuery();
  const [
    getBookingDetailsById,
    {
      isLoading: apiLoadingGetBookedDetail,
      isFetching: fetchingBookedDetail,
      isError: isErrorBookedDetail,
    },
  ] = useLazyGetBookingDetailsByIdQuery();
  const [
    getVenueAvailabilities,
    {
      isLoading: loadingGetVenueAvailabilities,
      isFetching: fetchingAvailabilities,
      isError: isErrorAvailabilities,
    },
  ] = useLazyGetVenueAvailabilitiesQuery();

  const handlerGetSingleBookedDetail = useCallback(async (_availabilityId) => {
    try {
      if (!_availabilityId) return;
      setLoadingGetBookedDetail(true);
      const response = await getBookingDetailsById({
        id: _availabilityId,
      }).unwrap();
      if (!!response) {
        setBookedData(response?.data);
      }
    } catch (error) {
      console.log(error?.data?.message);
    } finally {
      setLoadingGetBookedDetail(false);
    }
  }, []);

  const handlerGetVenueDetailsById = useCallback(async (_venueId) => {
    try {
      const response = await getVenuesDetailById({ id: _venueId }).unwrap();
      if (!!response) {
        setVenueData(response?.data);
      }
    } catch (error) {
      console.log(error?.data?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlerGetVenuesAvailabilities = useCallback(
    async (_venueId, _startDate, _endDate) => {
      try {
        setLoadingGetAvailabilities(true);
        const response = await getVenueAvailabilities({
          id: _venueId,
          startDate: moment(_startDate).format("YYYY-MM-DD"),
          endDate: moment(_endDate).format("YYYY-MM-DD"),
        }).unwrap();
        if (!!response) {
          setAvailabilities(response?.data);
        }
      } catch (error) {
        console.log(error?.data?.message);
      } finally {
        setLoadingGetAvailabilities(false);
      }
    },
    [],
  );

  const loadMoreRatingsHandler = () => {
    const nextPage = (pageData?.currentPage || 0) + 1;
    if (nextPage <= pageData?.totalPages) {
      handlerGetAllReviews(venueId, nextPage);
    }
  };

  const handlerGetAllReviews = useCallback(async (_id = "", page = 1) => {
    try {
      setAllReviewsLoader(true);
      const response = await getVenueReviewsById({
        id: _id,
        page,
      }).unwrap();
      if (!response) return;
      dispatch(
        setRatingList({
          data: response.data?.reviews,
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
      console.log(error?.data?.message);
    } finally {
      setAllReviewsLoader(false);
    }
  }, []);

  useEffect(() => {
    if (selectedActivity === "reviews") {
      handlerGetAllReviews(venueId, 1);
    }
  }, [selectedActivity]);

  useEffect(() => {
    handlerGetVenueDetailsById(venueId);
  }, []);

  useEffect(() => {
    handlerGetVenuesAvailabilities(venueId, startDate, endDate);
  }, [venueId, startDate, endDate]);

  return (
    <Container>
      <ApiLoader block={loading}>
        <BackArrowButton />
        <Fragment>
          <div className={"px-6 py-3"}>
            <Heading
              className={"text-fs_24 !font-outfit_semiBold md:text-fs_32"}
            >
              {labels?.venueDetial}
            </Heading>
            <Carousel data={sliderPhotos} />
            <Heading
              className={"text-fs_16 mb-2 !font-outfit_medium md:text-fs_24"}
            >
              {venueData?.name ?? labels.notAvailable}
            </Heading>
            <Paragraph className={"text-c_818181 mt-2"}>
              {venueData?.description ?? labels.notAvailable}
            </Paragraph>
            <div className={"py-5"}>
              <Paragraph
                className={"font-outfit_medium text-fs_18 md:text-fs_20"}
              >
                {labels?.moreInformation}
              </Paragraph>
              <div className={"flex items-center gap-6 flex-wrap pt-4"}>
                <DetailsFeild
                  title={labels.ownerName}
                  description={venueData?.user?.fullName ?? labels.notAvailable}
                  descriptionStyle={"font-outfit_regular"}
                />
                <div
                  className={"!h-[50px] !w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.companyName}
                  description={
                    venueData?.user?.company?.find((val) => val)?.name ??
                    labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_regular"}
                />
                <div
                  className={"!h-[50px] !w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.commercialNumber}
                  description={
                    venueData?.user?.company?.find((val) => val)
                      ?.commercialNumber ?? labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_regular"}
                />
                <div
                  className={"!h-[50px] !w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.emailAddress}
                  description={venueData?.user?.email ?? labels.notAvailable}
                  descriptionStyle={"font-outfit_regular"}
                />
                <div
                  className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.phoneNumber}
                  description={
                    venueData?.user?.phoneNumber ?? labels.notAvailable
                  }
                  descriptionStyle={"font-outfit_regular"}
                />
                <div
                  className={"!h-[50px] !w-[1px] bg-c_DFDFDF sm:block hidden"}
                ></div>
                <DetailsFeild
                  title={labels.address}
                  description={venueData?.location ?? labels.notAvailable}
                  descriptionStyle={"font-outfit_regular"}
                />
              </div>
            </div>
            <Divider />

            <div className={"pt-4 pb-6"}>
              <ButtonBadgeList
                data={venueFacilities}
                title={labels.facilities}
                titleStyle={"text-fs_18 md:text-fs_20"}
                badgesContainerClassName={"mt-3"}
              />
            </div>

            <Divider />
            <div>
              <Button
                label={labels.availability}
                onClick={() => setSelectedActivity("availability")}
                className={`rounded-none rounded-bl-md !w-fit !px-8 ${
                  selectedActivity === "availability"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
              <Button
                label={labels.stats}
                onClick={() => setSelectedActivity("stats")}
                className={`rounded-none !w-fit !px-8 ${
                  selectedActivity === "stats"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
              <Button
                onClick={() => setSelectedActivity("reviews")}
                label={labels.reviews}
                className={`rounded-none rounded-br-md !w-fit !px-8 ${
                  selectedActivity === "reviews"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
            </div>

            <Fragment>
              {selectedActivity === "availability" ? (
                <div className={"py-5"}>
                  <Heading
                    className={"text-fs_18 md:text-fs_20 !font-outfit_medium"}
                  >
                    {labels?.availability}
                  </Heading>
                </div>
              ) : selectedActivity === "reviews" &&
                ratingsDataList?.length > 0 ? (
                <div className={"py-5 !text-fs_20 flex items-center gap-4"}>
                  <Heading>{labels?.overallRatings}</Heading>
                  <div className={"flex items-center gap-1"}>
                    <Image src={Icons.starIcon} alt={"staricon"} />
                    <CountUp
                      className={"text-fs_16 font-outfit_medium"}
                      duration={1}
                      preserveValue={false}
                      start={0}
                      end={avGRating}
                      formattingFn={(val) => `(${val})`}
                    />
                  </div>
                </div>
              ) : null}

              {selectedActivity === "availability" ? (
                <div
                  className={
                    "flex md:flex-row flex-col border rounded-[14px] p-3 border-c_primary"
                  }
                >
                  <div className={"flex-1 pl-3 pr-5"}>
                    <DatePicker
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      availabilities={availabilities}
                      callBackGetBookedDetail={handlerGetSingleBookedDetail}
                    />
                  </div>
                  <div
                    className={
                      "md:border-l md:border-c_F0F0F0 flex-1 flex justify-start flex-col gap-6 md:pl-5"
                    }
                  >
                    {!!loadingGetBookedDetail ? (
                      <div
                        className={
                          "min-h-full w-full flex justify-center items-center cursor-loading"
                        }
                      >
                        <ThreeCircles
                          height={160}
                          width={50}
                          color={"#66A5C4"}
                          ariaLabel={"three-circles-loading"}
                          wrapperStyle={{}}
                          wrapperClass={""}
                          visible={true}
                        />
                      </div>
                    ) : bookedData?.event?.venueBookingDetails?.length > 0 ? (
                      <Fragment>
                        <VenueDateAndTimeDetails
                          loading={loadingGetBookedDetail}
                          data={bookedData}
                          title={
                            bookedData?.event?.venueBookingDetails?.find(
                              (val) => val,
                            )?.venueBooking?.event?.name
                          }
                          hostName={
                            bookedData?.event?.venueBookingDetails?.find(
                              (val) => val,
                            )?.venueBooking?.event?.user?.fullName
                          }
                        />
                        {/* <div className={"bg-c_FCFCFC p-3 rounded-md"}>
                          <Heading>{data?.eventName}</Heading>
                          <div className={"flex items-center gap-4 mb-5"}>
                            <Paragraph
                              className={
                                "!text-c_818181 text-fs_14 font-outfit_regular"
                              }
                            >
                              Host Name:
                            </Paragraph>
                            <Image
                              src={
                                "https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg"
                              }
                              alt={"Event Host Image"}
                              className={"!h-[30px] !w-[30px] object-cover"}
                            />
                            <Paragraph
                              className={"text-fs_14 !font-outfit_medium"}
                            >
                              {data?.OwnerName}
                            </Paragraph>
                          </div>
                          <Divider />
                        </div> */}
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div
                          className={
                            "h-full w-full flex flex-col items-center justify-center gap-2"
                          }
                        >
                          <Image
                            draggable={false}
                            alt={"calandericon"}
                            width={140}
                            height={140}
                            src={Icons.CalanderAvailabilitySvgIcon}
                            className={"select-none !h-[140px] !w-[140px]"}
                          />
                          <Paragraph
                            className={
                              "text-c_818181 !text-fs_20 !font-outfit_regular"
                            }
                          >
                            {labels.noBookingAtThisDate}
                          </Paragraph>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </div>
              ) : selectedActivity === "reviews" ? (
                <div className={"grid grid-cols-12 gap-5"}>
                  {!!allReviewsLoader ? (
                    <div
                      className={
                        "min-h-[200px] col-span-12 flex justify-center items-center cursor-loading"
                      }
                    >
                      <ThreeCircles
                        height={160}
                        width={50}
                        color={"#66A5C4"}
                        ariaLabel={"three-circles-loading"}
                        wrapperStyle={{}}
                        wrapperClass={""}
                        visible={true}
                      />
                    </div>
                  ) : ratingsDataList?.length === 0 && !allReviewsLoader ? (
                    <div
                      className={
                        "col-span-12 flex justify-center items-center mt-10 mb-5"
                      }
                    >
                      <div
                        className={
                          "w-full flex flex-col justify-center items-center"
                        }
                      >
                        <Image
                          src={Icons.NotFound}
                          alt={"List is Empty Image"}
                          className={"h-[135px] w-[256px]"}
                        />
                        <Paragraph
                          className={
                            "!font-outfit_medium !text-c_202224 !leading-[30px] !text-fs_24 !mt-8 !mb-7"
                          }
                        >
                          {labels.noRatingsFound}
                        </Paragraph>
                      </div>
                    </div>
                  ) : (
                    ratingsDataList?.map((item, idx) => {
                      return (
                        <div
                          key={item?.id}
                          className={
                            "flex sm:col-span-6 col-span-12 lg:col-span-4 gap-3 p-3 bg-white rounded-[14px] boxShadow"
                          }
                          style={{ boxShadow: "0px 5px 12px 0px #00000014" }}
                        >
                          <Image
                            src={item?.user?.image || Icons.DefaultAvatar}
                            alt={"Review Image"}
                            className={"!h-[60px] !w-[60px] rounded-full"}
                          />
                          <div className={"w-full"}>
                            <div
                              className={
                                "flex flex-1 justify-between items-start"
                              }
                            >
                              <Heading
                                className={"text-fs_16 font-outfit_semiBold"}
                              >
                                {item?.user?.fullName || labels.notAvailable}
                              </Heading>{" "}
                              <div
                                className={"flex items-center gap-1 -mt-[5px]"}
                              >
                                <Image src={Icons.starIcon} alt={"staricon"} />
                                <CountUp
                                  className={"text-fs_14 font-outfit_medium"}
                                  duration={2}
                                  preserveValue={false}
                                  start={0}
                                  end={item?.rating}
                                  formattingFn={(val) => `(${val})`}
                                />
                              </div>
                            </div>

                            <Paragraph
                              className={
                                "!text-c_8C8C8C text-fs_14 font-outfit_regular line-clamp-3 leading-4"
                              }
                            >
                              {!!item?.description?.length > 15
                                ? `${item?.description?.slice(0, 14)}...`
                                : item?.description}
                            </Paragraph>
                          </div>
                        </div>
                      );
                    })
                  )}
                  {ratingsDataList?.length ? (
                    <div className={"col-span-12 !mx-auto"}>
                      <LoadMoreData
                        loading={allReviewsLoader}
                        label={"Load More"}
                        labelClassName={""}
                        color={"#66A5C4"}
                        height={48}
                        width={48}
                        onClick={loadMoreRatingsHandler}
                        disabled={
                          pageData?.currentPage >= pageData?.totalPages
                            ? true
                            : false
                        }
                      />
                    </div>
                  ) : null}
                </div>
              ) : selectedActivity === "stats" ? (
                <div
                  className={"w-full mt-8 border border-c_D9D9D9 rounded-xl"}
                >
                  <StatisticGraphTab />
                </div>
              ) : (
                <></>
              )}
            </Fragment>
          </div>
        </Fragment>
      </ApiLoader>
    </Container>
  );
};

export default VenueDetails;
