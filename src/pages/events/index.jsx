/** @format */

import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/organisms/pageHeader";
import labels from "../../locale";
import EventsTable from "../../components/organisms/tables/eventsTable";
import Container from "../../layout/container";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventList,
  getPageData,
  setEventList,
} from "../../store/slices/events.slice";
import {
  useEventVisibilityMutation,
  useLazyGetAllEventsQuery,
} from "../../services/eventService";
import { toast } from "sonner";

const { events, search } = labels;

const Events = () => {
  const dispatch = useDispatch();
  const pageData = useSelector(getPageData);
  const eventsDataList = useSelector(getEventList);
  const [loading, setLoading] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [count, setCount] = useState(0);

  const [getAllEvents, { isLoading, isFetching, isError }] =
    useLazyGetAllEventsQuery();
  const [
    toggleEventVisibility,
    { isLoading: loadingToggleVisibility, isError: isErrorToggleVisibility },
  ] = useEventVisibilityMutation();

  const getAllEventsData = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const response = await getAllEvents({
          page,
          search: searchInputValue,
        }).unwrap();
        setAllEvents(response.data?.events);
        setCount(response.data?.count);
        dispatch(
          setEventList({
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
      } catch (error) {
        console.log(error?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [searchInputValue],
  );

  useEffect(() => {
    getAllEventsData(1);
  }, [searchInputValue]);

  const handleToggleVisibility = async (_id) => {
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

  return (
    <Container>
      <PageHeader
        title={events}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        badgeVisible={false}
        placeholderText={search}
      />
      <EventsTable
        pageData={pageData}
        loading={loading}
        setLoading={setLoading}
        search={searchInputValue}
        setSearch={setSearchInputValue}
        events={eventsDataList || allEvents}
        onStatusChange={handleToggleVisibility}
        setEvents={setAllEvents}
        count={count}
        setCount={setCount}
        getData={getAllEventsData}
      />
    </Container>
  );
};

export default Events;
