/** @format */

import React, { useCallback, useEffect, useState } from "react";
import Heading from "../../components/atoms/heading";
import Container from "../../layout/container";
import labels from "../../locale";
import ChangeRequestTable from "../../components/organisms/tables/changeRequestTable/index";
import Modal from "../../components/molecules/modal";
import ChangeRequestModal from "../../components/organisms/modals/changeRequestModal";
import {
  useLazyChangeEventRequestDetailByIdQuery,
  useLazyGetAllChangeEventRequestQuery,
} from "../../services/changeEventRequestService";
import { useDispatch, useSelector } from "react-redux";
import {
  getChangeEventRequestList,
  getPageData,
  setChangeEventRequestList,
} from "../../store/slices/changeEventRequest.slice";

const ChangeRequest = () => {
  const dispatch = useDispatch();
  const [openRequestModal, setOpenRequestModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [allChangeEventRequest, setAllChangeEventRequest] = useState([]);
  const pageData = useSelector(getPageData);
  const [count, setCount] = useState(0);
  const [details, setDetails] = useState(null);
  const changeEventRequestDataList = useSelector(getChangeEventRequestList);
  const [getAllChangeEventRequest, { isLoading, isFetching, isError }] =
    useLazyGetAllChangeEventRequestQuery();
  const [
    changeEventRequestDetailById,
    {
      isLoading: loadingGetDetails,
      isFetching: isFetchingGetDetails,
      isError: isErrorGetDetails,
    },
  ] = useLazyChangeEventRequestDetailByIdQuery();

  console.log(openRequestModal, "openRequestModal");

  const getAllChangeEventRequestData = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await getAllChangeEventRequest({
        page,
      }).unwrap();
      if (!response?.data) return;
      setAllChangeEventRequest(response.data?.request);
      setCount(response.data?.count);
      dispatch(
        setChangeEventRequestList({
          data: response.data?.request,
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

  const handlerGetChangeEventRequestDetailById = useCallback(async (_id) => {
    try {
      setLoader(true);
      const response = await changeEventRequestDetailById(_id).unwrap();
      if (!response) return;
      console.log(response?.data, "hello");
      setDetails(response?.data);
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getAllChangeEventRequestData(1);
  }, []);

  return (
    <Container>
      <Heading className="md:text-fs_32 text-fs_24 px-[30px] pt-[30px]">
        {labels.changeRequest}
      </Heading>

      <ChangeRequestTable
        pageData={pageData}
        loading={loading}
        loaderGetDetails={loader}
        setLoading={setLoading}
        setLoaderGetDetails={setLoader}
        count={count}
        setCount={setCount}
        requests={changeEventRequestDataList || allChangeEventRequest}
        setRequests={setAllChangeEventRequest}
        getData={getAllChangeEventRequestData}
        openRequestModal={openRequestModal}
        setOpenRequestModal={setOpenRequestModal}
        handlerGetChangeEventRequestDetailById={
          handlerGetChangeEventRequestDetailById
        }
      />

      <Modal
        isOpen={
          openRequestModal && !!details && !loader && !isFetchingGetDetails
        }
        closeModal={() => setOpenRequestModal(false)}
        containerClassName={"!w-[461px]"}
        title={labels.request}
        content={
          <ChangeRequestModal
            data={details}
            setOpenModal={setOpenRequestModal}
          />
        }
      />
    </Container>
  );
};

export default ChangeRequest;
