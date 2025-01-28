/** @format */

import { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../layout/container";
import labels from "../../locale";
import BackArrowButton from "../../components/molecules/backArrowButton";
import Paragraph from "../../components/atoms/paragraph";
import ToggleSwitch from "../../components/atoms/toggleSwitch";
import UserDetailsRowSection from "../../components/organisms/userDetailsRowComponent";
import Divider from "../../components/atoms/divider";
import UsersDetailEventsTable from "../../components/organisms/tables/usersDetailEventsTable";
import Button from "../../components/atoms/button";
import { toast } from "sonner";
import { invitationsData } from "../../constants/invitations.constants";
import InvitationsCard from "../../components/molecules/invitationsCard";
import {
  useLazyGetUserByIdQuery,
  useLazyGetUserEventsByIdQuery,
  useLazyGetUserInvitationsByIdQuery,
  useUserVisibilityMutation,
} from "../../services/userService";
import ApiLoader from "../../components/loaders/apiLoader";
import { useEventVisibilityMutation } from "../../services/eventService";
import {
  getEventsPageData,
  getInvitationsPageData,
  getUserEventList,
  getUserInvitationsList,
  setUserEventsList,
  setUserInvitationsList,
} from "../../store/slices/user.slice";
import { ThreeCircles } from "react-loader-spinner";
import Image from "../../components/atoms/image";
import LoadMoreData from "../../components/loaders/loadMoreDataPagination";

const UserDetails = () => {
  const { userDetails, visibility } = labels;
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const userId = params?.id || location.state?.id;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const eventsPageData = useSelector(getEventsPageData);
  const invitationsPageData = useSelector(getInvitationsPageData);
  const userEventsDataList = useSelector(getUserEventList);
  const userInvitationsDataList = useSelector(getUserInvitationsList);
  const [loaderGetEvents, setLoaderGetEvents] = useState(true);
  const [loaderGetInvitations, setLoaderGetInvitations] = useState(true);
  const [selectedActivity, setSelectedAactivity] = useState(false);
  const [events, setEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const [getUserById, { isLoading, isFetching, isError }] =
    useLazyGetUserByIdQuery();
  const [
    getUserEventsById,
    { isLoading: loadingGetEvents, isFetching: fetchingUserEvents },
  ] = useLazyGetUserEventsByIdQuery();
  const [
    getUserInvitationsById,
    { isLoading: loadingGetInvitations, isFetching: fetchingUserInvitations },
  ] = useLazyGetUserInvitationsByIdQuery();

  const [
    userVisibility,
    {
      isLoading: loadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useUserVisibilityMutation();
  const [
    toggleEventVisibility,
    { isLoading: loadingEventVisibility, isError: isErrorEventVisibility },
  ] = useEventVisibilityMutation();

  const handlerGetUserDetailsById = useCallback(async (_userId) => {
    try {
      const response = await getUserById({ id: _userId }).unwrap();
      if (!!response) {
        setUserData(response?.data);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handlerGetUserEventsById = useCallback(async (page, userId) => {
    try {
      setLoaderGetEvents(true);
      const response = await getUserEventsById({ page, id: userId }).unwrap();
      if (!!response) {
        dispatch(
          setUserEventsList({
            data: response.data?.events,
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
        setEvents(response?.data?.events);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoaderGetEvents(false);
    }
  }, []);

  const handlerGetUserInvitationsById = useCallback(async (page, userId) => {
    try {
      setLoaderGetInvitations(true);
      const response = await getUserInvitationsById({
        page,
        id: userId,
      }).unwrap();
      if (!!response) {
        dispatch(
          setUserInvitationsList({
            data: response.data?.invitationCards,
            meta: {
              totalItems: response.data?.count,
              itemCount: response.data?.count,
              itemsPerPage: 9,
              totalPages:
                (response.data?.count / 9) % 1 !== 0
                  ? parseInt(response.data?.count / 9) + 1
                  : parseInt(response.data?.count / 9),
              currentPage: page,
            },
          }),
        );
        setInvitations(response?.data?.invitationCards);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoaderGetInvitations(false);
    }
  }, []);

  const loadMoreHandler = () => {
    const nextPage = (invitationsPageData?.currentPage || 0) + 1;
    if (nextPage <= invitationsPageData?.totalPages) {
      handlerGetUserInvitationsById(nextPage, userId);
    }
  };

  const handleToggleEventVisibility = async (_id) => {
    try {
      const response = await toggleEventVisibility({
        id: _id,
      }).unwrap();
      if (!response) return;
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  useEffect(() => {
    handlerGetUserDetailsById(userId);
    handlerGetUserEventsById(1, userId);
    handlerGetUserInvitationsById(1, userId);
  }, [userId]);

  const handleToggleVisibility = async (_id) => {
    try {
      const response = await userVisibility({
        id: _id,
      }).unwrap();
      if (!!response) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Container>
      <BackArrowButton />

      <ApiLoader block={loading || loaderGetEvents}>
        <Fragment>
          <div className={"px-6 pt-6"}>
            <div
              className={
                "w-full flex flex-row flex-wrap tems-center justify-between"
              }
            >
              <Paragraph
                className={
                  "!text-fs_28 md:text-fs_32 text-black font-outfit_semiBold leading-[14px]"
                }
              >
                {userDetails}
              </Paragraph>

              <ToggleSwitch
                status={userData?.visibility}
                label={visibility}
                onStatusChange={() => handleToggleVisibility(userId)}
              />
            </div>

            <UserDetailsRowSection userDetails={userData} />
          </div>

          <div className={"w-full px-6"}>
            <Divider />
            <div className={"mb-2"}>
              <Button
                label={labels.events}
                onClick={() => setSelectedAactivity(false)}
                className={`rounded-none rounded-bl-md !w-fit !px-8 ${
                  !selectedActivity
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />

              <Button
                label={labels.invitationCard}
                onClick={() => setSelectedAactivity(true)}
                className={`rounded-none rounded-br-md !w-fit !px-8 ${
                  selectedActivity
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
            </div>
          </div>

          {!selectedActivity ? (
            <div className={"px-6 pt-6"}>
              <UsersDetailEventsTable
                onStatusChange={handleToggleEventVisibility}
                data={userEventsDataList || events}
                pageData={eventsPageData}
                loading={loaderGetEvents}
                setEvents={setEvents}
              />
            </div>
          ) : (
            <div className={"flex flex-col gap-2"}>
              <div
                className={
                  "grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-3 py-3 px-6"
                }
              >
                {!loaderGetInvitations &&
                userInvitationsDataList?.length === 0 ? (
                  <div
                    className={
                      "col-span-3 flex justify-center items-center mt-10 mb-5"
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
                        {labels.noInvitationCards}
                      </Paragraph>
                    </div>
                  </div>
                ) : !!userInvitationsDataList ? (
                  userInvitationsDataList?.map((invitation, idx) => {
                    return <InvitationsCard _unqkey={idx} data={invitation} />;
                  })
                ) : null}
              </div>

              {userInvitationsDataList?.length ? (
                <LoadMoreData
                  loading={loaderGetInvitations}
                  label={"Load More"}
                  labelClassName={""}
                  color={"#66A5C4"}
                  height={48}
                  width={48}
                  onClick={loadMoreHandler}
                  disabled={
                    invitationsPageData?.currentPage >=
                    invitationsPageData?.totalPages
                      ? true
                      : false
                  }
                />
              ) : null}
            </div>
          )}
        </Fragment>
      </ApiLoader>
    </Container>
  );
};

export default UserDetails;
