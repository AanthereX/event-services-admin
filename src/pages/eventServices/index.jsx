/** @format */

import React, { useCallback, useEffect, useState } from "react";
import labels from "../../locale";
import EventServicesTable from "../../components/organisms/tables/eventServicesTable";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import {
  useLazyGetAllProviderServicesQuery,
  useProviderServiceVisibilityMutation,
} from "../../services/providerService";
import { useDispatch, useSelector } from "react-redux";
import {
  getPageData,
  getServiceProviderList,
  setProviderServiceList,
} from "../../store/slices/providerService.slice";
import { toast } from "sonner";

const EventServices = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const pageData = useSelector(getPageData);
  const serviceProviderDataList = useSelector(getServiceProviderList);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [allProviderServices, setAllProviderServices] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { eventServices, search, providerServices } = labels;
  const [
    getAllProviderServices,
    {
      isLoading: loadingGetAllProviderServices,
      isError: errorFetchingProviderServices,
    },
  ] = useLazyGetAllProviderServicesQuery();
  const [
    providerServiceVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useProviderServiceVisibilityMutation();

  const handlerGetAllProviderServices = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllProviderServices({
          page,
          search: searchInputValue,
        }).unwrap();
        if (!response) return;
        dispatch(
          setProviderServiceList({
            data: response.data?.services,
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
        setCount(response.data?.count);
        setAllProviderServices(response.data?.category);
        setPage(response.data?.count);
      } catch (error) {
        console.log(error?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [searchInputValue],
  );

  useEffect(() => {
    handlerGetAllProviderServices(1);
  }, [searchInputValue]);

  const handleToggleVisibility = async (id) => {
    try {
      const response = await providerServiceVisibility({
        id: id,
      }).unwrap();
      if (!response) return;
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  return (
    <Container>
      <PageHeader
        title={providerServices}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        badgeVisible={false}
        placeholderText={search}
        containerClassname={"!px-7"}
      />

      <EventServicesTable
        pageData={pageData}
        loading={loading}
        setLoading={setLoading}
        count={count}
        setCount={setCount}
        search={searchInputValue}
        onStatusChange={handleToggleVisibility}
        setSearch={setSearchInputValue}
        getData={handlerGetAllProviderServices}
        providerServices={serviceProviderDataList || allProviderServices}
        setProviderServices={setAllProviderServices}
        setShowDeleteModal={setShowDeleteModal}
      />
    </Container>
  );
};

export default EventServices;
