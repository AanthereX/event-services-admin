/** @format */

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import labels from "../../locale";
import Heading from "../../components/atoms/heading";
import Paragraph from "../../components/atoms/paragraph";
import DetailsFeild from "../../components/molecules/detailsFeild";
import { Icons } from "../../assets/icons";
import Divider from "../../components/atoms/divider";
import Button from "../../components/atoms/button";
import ServiceRequestTable from "../../components/organisms/tables/serviceRequestTable";
import Container from "../../layout/container";
import BackArrowButton from "../../components/molecules/backArrowButton";
import StatisticGraph from "../../components/organisms/statsGraphTab";
import ToggleSwitch from "../../components/atoms/toggleSwitch";
import Image from "../../components/atoms/image";
import { useProviderServiceVisibilityMutation } from "../../services/providerService";
import { toast } from "sonner";
import { useLazyGetServiceReviewsByIdQuery } from "../../services/venues";
import CountUp from "react-countup";
import { ThreeCircles } from "react-loader-spinner";
import {
  useLazyGetEventServiceRequestsQuery,
  useLazyGetServiceDetailByIdQuery,
  useLazyGetServiceRequestListByIdQuery,
} from "../../services/eventService";
import ApiLoader from "../../components/loaders/apiLoader";
import {
  getServiceRequestList,
  setServiceRequestList,
  getPageData,
} from "../../store/slices/servicesRequest.slice";
import { useDispatch, useSelector } from "react-redux";

const EventServicesDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const serviceId = params?.id || location?.state?.data?.id;
  const [selectedActivity, setSelectedAactivity] = useState("services");
  const [allReviewsLoader, setAllReviewsLoader] = useState(false);
  const [allReviews, setAllReviews] = useState([]);
  const serviceRequestDataList = useSelector(getServiceRequestList);
  const pageData = useSelector(getPageData);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingGetServiceRequest, setLoadingGetServiceRequest] =
    useState(true);
  const [services, setServices] = useState([]);
  const data = location?.state?.data;
  const avGRating =
    allReviews?.reduce((acc, item) => acc + item.rating, 0) /
    allReviews?.length;

  const bookedServices = 102;

  const [
    providerServiceVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useProviderServiceVisibilityMutation();
  const [
    getServiceDetailById,
    {
      isLoading: isLoadingGetDetails,
      isFetching: fetchingGetDetails,
      isError: isErrorGetDetails,
    },
  ] = useLazyGetServiceDetailByIdQuery();
  const [
    getServiceReviewsById,
    {
      isLoading: loadingGetReviews,
      isFetching: isFetchingGetReviews,
      isError: isErrorGetReviews,
    },
  ] = useLazyGetServiceReviewsByIdQuery();
  const [
    getServiceRequestListById,
    {
      isLoading: loadingGetRequestServices,
      isFetching: isFetchingGetRequestServices,
      isError: isErrorGetRequestServices,
    },
  ] = useLazyGetServiceRequestListByIdQuery();

  const handleToggleVisibility = async (id) => {
    try {
      const response = await providerServiceVisibility({
        id: id,
      }).unwrap();
      if (!response) return;
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handlerGetServicesRequestById = useCallback(async (_serviceId) => {
    try {
      setLoading(true);
      const response = await getServiceDetailById(_serviceId).unwrap();
      if (!!response) {
        setServices(response?.data);
      }
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlerGetAllServicesRequests = useCallback(async (page, _id) => {
    try {
      setLoadingGetServiceRequest(true);
      const response = await getServiceRequestListById({
        page,
        id: _id,
      }).unwrap();
      if (!response?.data) return;
      setCount(response.data?.count);
      dispatch(
        setServiceRequestList({
          data: response.data?.serviceRequest,
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
      setLoadingGetServiceRequest(false);
    }
  }, []);

  useEffect(() => {
    handlerGetAllServicesRequests(1, serviceId);
  }, []);

  useEffect(() => {
    handlerGetServicesRequestById(serviceId);
  }, [serviceId]);

  const handlerGetAllReviews = useCallback(async (_id = "", page = 1) => {
    try {
      setAllReviewsLoader(true);
      const response = await getServiceReviewsById({
        id: _id,
        page,
      }).unwrap();
      if (!response) return;
      setAllReviews(response.data?.reviews);
    } catch (error) {
      console.log(error?.data?.message);
    } finally {
      setAllReviewsLoader(false);
    }
  }, []);

  useEffect(() => {
    if (selectedActivity === "reviews") {
      handlerGetAllReviews(serviceId, 1);
    }
  }, [selectedActivity]);

  return (
    <Container>
      <ApiLoader block={loading}>
        <Fragment>
          <BackArrowButton />
          <div className={"px-6 pb-1 flex items-center justify-between"}>
            <Heading className={"md:text-fs_32 text-fs_24"}>
              {labels?.serviceDetails}
            </Heading>

            <div>
              <Paragraph
                className={
                  "font-outfit_regular text-fs_18 md:text-fs_18 leading-[40px]"
                }
              >
                {labels.visibility}
              </Paragraph>
              <ToggleSwitch
                status={services?.find((val) => val)?.visibility}
                onStatusChange={() => handleToggleVisibility(serviceId)}
              />
            </div>
          </div>

          <div className={"mt-5 px-6"}>
            <Heading className={"md:text-fs_24 text-fs_16"}>
              {services?.find((val) => val)?.name || labels.notAvailable}
            </Heading>
            <Paragraph className={"text-c_818181 mt-2"}>
              {services?.find((val) => val)?.description || labels.notAvailable}
            </Paragraph>
            <div className={"flex items-center gap-6 flex-wrap py-4"}>
              <DetailsFeild
                image={
                  services?.find((val) => val)?.user?.image ||
                  Icons.DefaultAvatar
                }
                title={labels.provider}
                description={
                  services?.find((val) => val)?.user?.fullName ||
                  labels.notAvailable
                }
                descriptionStyle={"!font-outfit_medium md:text-fs_14"}
              />
              <div
                className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
              ></div>
              <DetailsFeild
                title={labels.serviceCategory}
                description={
                  services?.find((val) => val)?.category?.nameEn ||
                  labels.notAvailable
                }
                descriptionStyle={"!font-outfit_medium md:text-fs_14"}
              />
              <div
                className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
              ></div>
              <DetailsFeild
                title={labels.ratings}
                description={`(${services?.find((val) => val)?.user?.avgRate})`}
                image={Icons.starIcon}
                descriptionStyle={"!font-outfit_medium md:text-fs_14"}
              />
              <div
                className={"h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"}
              ></div>
              <DetailsFeild
                title={labels.totalBookedServices}
                description={bookedServices}
                descriptionStyle={"!font-outfit_medium md:text-fs_14"}
              />
            </div>
          </div>
          <Divider />
          <div className={"mt-6 px-6"}>
            <Divider />
            <div>
              <Button
                label={labels.serviceRequests}
                onClick={() => setSelectedAactivity("services")}
                className={`rounded-none rounded-bl-md !w-fit !px-8 ${
                  selectedActivity == "services"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
              <Button
                label={labels.stats}
                onClick={() => setSelectedAactivity("stats")}
                className={`rounded-none !w-fit !px-8 ${
                  selectedActivity === "stats"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
              <Button
                onClick={() => setSelectedAactivity("reviews")}
                label={labels.reviews}
                className={`rounded-none rounded-br-md !w-fit !px-8 ${
                  selectedActivity == "reviews"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
            </div>
          </div>

          {selectedActivity === "reviews" ? (
            <div className={"px-4 py-3"}>
              <div className={"py-5 !text-fs_20 flex items-center gap-4"}>
                <Heading>{labels?.overallRatings}</Heading>
                <div className="flex items-center gap-1">
                  <Image src={Icons.starIcon} alt="staricon" />
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
                ) : allReviews?.length === 0 && !allReviewsLoader ? (
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
                  allReviews?.map((ele, idx) => {
                    return (
                      <div
                        key={ele?.id}
                        className={
                          "flex sm:col-span-6 col-span-12 lg:col-span-4  gap-3 p-3 bg-white rounded-[14px] boxShadow"
                        }
                        style={{ boxShadow: "0px 5px 12px 0px #00000014" }}
                      >
                        <Image
                          src={ele?.user?.image || Icons.DefaultAvatar}
                          alt={`${ele?.user?.fullName}-avatar`}
                          className={"h-[60px] w-[60px] rounded-full"}
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
                              {ele?.user?.fullName || labels.notAvailable}
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
                                end={ele?.rating}
                                formattingFn={(val) => `(${val})`}
                              />
                            </div>
                          </div>

                          <Paragraph
                            className={
                              "text-c_8C8C8C text-fs_14 font-outfit_regular line-clamp-3 leading-4"
                            }
                          >
                            {ele?.description}
                          </Paragraph>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : selectedActivity == "services" ? (
            <div
              className={"py-4 mt-6 mx-6 border border-c_D1D1D1 rounded-[16px]"}
            >
              <div className={"px-4"}>
                <Paragraph
                  className={
                    "font-outfit_semiBold text-fs_24 md:text-fs_32 leading-[40px]"
                  }
                >
                  {labels.serviceRequests}
                </Paragraph>
              </div>

              <ApiLoader block={loadingGetServiceRequest}>
                <ServiceRequestTable
                  count={count}
                  setCount={setCount}
                  serviceId={serviceId}
                  pageData={pageData}
                  listData={serviceRequestDataList}
                  handlerGetAllServicesRequests={handlerGetAllServicesRequests}
                />
              </ApiLoader>
            </div>
          ) : selectedActivity === "stats" ? (
            <div className={"w-full mt-8 border border-c_D9D9D9 rounded-xl"}>
              <StatisticGraph />
            </div>
          ) : null}
        </Fragment>
      </ApiLoader>
    </Container>
  );
};

export default EventServicesDetails;
