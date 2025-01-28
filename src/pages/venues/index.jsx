/** @format */

import React, { useCallback, useEffect, useState } from "react";
import labels from "../../locale";
import VenuesPageTable from "../../components/organisms/tables/venuesPageTable";
import Container from "../../layout/container";
import PageHeader from "../../components/organisms/pageHeader";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  getPageData,
  getVenuesList,
  setVenuesList,
} from "../../store/slices/venues.slice";
import {
  useLazyGetAllVenuesQuery,
  useVenueVisibilityMutation,
} from "../../services/venues";
import { removeRatingList } from "../../store/slices/ratings.slice";

const Venues = () => {
  const dispatch = useDispatch();
  const pageData = useSelector(getPageData);
  const { venues, search } = labels;
  const venuesDataList = useSelector(getVenuesList);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [allVenues, setAllVenues] = useState([]);
  const [count, setCount] = useState(0);
  const [getAllVenues, { isLoading, isFetching, isError }] =
    useLazyGetAllVenuesQuery();
  const [
    venueVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useVenueVisibilityMutation();

  const getAllVenuesData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllVenues({
          page,
          search: searchInputValue,
        }).unwrap();
        setAllVenues(response.data?.venue);
        setCount(response.data?.count);
        dispatch(removeRatingList());
        dispatch(
          setVenuesList({
            data: response.data?.venue,
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
    getAllVenuesData(1);
  }, [searchInputValue]);

  const handleToggleVisibility = async (_id) => {
    try {
      const response = await venueVisibility({
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
      <PageHeader
        title={venues}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        badgeVisible={false}
        placeholderText={search}
      />

      <VenuesPageTable
        pageData={pageData}
        loading={loading}
        setLoading={setLoading}
        search={searchInputValue}
        setSearch={setSearchInputValue}
        onStatusChange={handleToggleVisibility}
        venues={venuesDataList || allVenues}
        setVenues={setAllVenues}
        count={count}
        setCount={setCount}
        getData={getAllVenuesData}
      />
    </Container>
  );
};

export default Venues;
