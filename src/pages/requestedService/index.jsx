/** @format */

import { useCallback, useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import Modal from "../../components/molecules/modal";
import AddEditUserForm from "../../components/molecules/forms/addEditUserForm";
import DeleteDialogActionForm from "../../components/molecules/deleteDialogActionForm";
import RequestServicesTable from "../../components/organisms/tables/requestServicesTable";
import RequestVendorsTable from "../../components/organisms/tables/requestVendorsTable";
import {
  getPageData,
  getRequestList,
  setRequestList,
} from "../../store/slices/request.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazyGetAllServiceRequestsQuery,
  useUpdateRequestStatusMutation,
} from "../../services/requestService";
import DialogModal from "../../components/organisms/modals/confirmationDialog";
import { toast } from "sonner";

const RequestedServices = () => {
  const dispatch = useDispatch();
  const { serviceRequests, addNew, search, venueRequests } = labels;
  const { PlusIcon, CrossConfirmationIcon, TickConfirmationIcon } = Icons;
  const [searchInputValue, setSearchInputValue] = useState("");
  const pageData = useSelector(getPageData);
  const requestDataList = useSelector(getRequestList);
  const [addNewBadge, setAddNewBadge] = useState(false);
  const [editNewBadge, setEditNewBadge] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [showRequestedServicesModal, setShowRequestedServicesModal] =
    useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("service");
  const [allRequests, setAllRequests] = useState([]);
  const [count, setCount] = useState(0);

  const [getAllServiceRequests, { isLoading, isFetching, isError }] =
    useLazyGetAllServiceRequestsQuery();

  const [
    updateRequestStatus,
    {
      isLoading: isLoadingUpdateStatus,
      isFetching: fetchingUpdateStatus,
      isError: isErrorUpdateStatus,
    },
  ] = useUpdateRequestStatusMutation();

  const getAllRequestsData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllServiceRequests({
          page,
          search: searchInputValue,
          type: selectedTab,
        }).unwrap();
        if (!!response?.data) {
          setAllRequests(response.data?.requests);
          setCount(response.data?.count);
          dispatch(
            setRequestList({
              data: response.data?.requests,
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
        }
      } catch (error) {
        console.log(error?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [searchInputValue, selectedTab],
  );

  useEffect(() => {
    getAllRequestsData(1);
  }, [searchInputValue, selectedTab]);

  const handlerUpdateRequestStatus = useCallback(async (_id, _status) => {
    try {
      const payload = { status: _status };
      const response = await updateRequestStatus({
        id: _id,
        body: payload,
      }).unwrap();
      if (!!response?.data) {
        toast.success(response?.message);
        setShowStatusUpdateModal(false);
        getAllRequestsData(1);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }, []);

  const statusUpdateConfirmationOptions = [
    {
      id: 1,
      label: labels.cancel,
      variant: "primary-outline",
      size: "md",
      loader: null,
      action: () => {
        setShowStatusUpdateModal(false);
      },
    },
    {
      id: 2,
      label: labels.confirm,
      variant: "primary",
      size: "md",
      loader: isLoadingUpdateStatus,
      action: () => {
        handlerUpdateRequestStatus(selected?.id, selected?.status);
      },
    },
  ];

  const deleteDialogOptions = [
    {
      id: 1,
      title: labels.cancel,
      variant: "primary-outline",
      size: "md",
      action: () => {},
    },
    {
      id: 2,
      title: labels.yesDelete,
      variant: "primary",
      size: "md",
      action: () => {},
    },
  ];

  const headerActionButtons = [
    {
      id: 1,
      title: "services",
      value: "service",
      icon: null,
      variant: "primary",
      size: "md",
      action: () => {
        setSelectedTab("service");
      },
    },
    {
      id: 2,
      title: "venues",
      value: "venue",
      icon: null,
      variant: "primary-outline",
      size: "md",
      action: () => {
        setSelectedTab("venue");
      },
    },
  ];

  return (
    <Container>
      <PageHeader
        title={selectedTab === "service" ? serviceRequests : venueRequests}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
        actions={headerActionButtons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {selectedTab === "service" ? (
        <RequestServicesTable
          pageData={pageData}
          setEdit={setEditNewBadge}
          setShowDeleteModal={setShowDeleteModal}
          selectedTab={selectedTab}
          loading={loading || isFetching}
          setLoading={setLoading}
          search={searchInputValue}
          setSearch={setSearchInputValue}
          requests={requestDataList || allRequests}
          setRequests={setAllRequests}
          count={count}
          setCount={setCount}
          getData={getAllRequestsData}
          setShowStatusUpdateModal={setShowStatusUpdateModal}
          selected={selected}
          setSelected={setSelected}
          setShowRequestedServicesModal={setShowRequestedServicesModal}
        />
      ) : (
        <RequestVendorsTable
          pageData={pageData}
          setEdit={setEditNewBadge}
          setShowDeleteModal={setShowDeleteModal}
          selectedTab={selectedTab}
          loading={loading || isFetching}
          setLoading={setLoading}
          search={searchInputValue}
          setSearch={setSearchInputValue}
          requests={requestDataList || allRequests}
          setRequests={setAllRequests}
          count={count}
          setCount={setCount}
          getData={getAllRequestsData}
          setShowStatusUpdateModal={setShowStatusUpdateModal}
          selected={selected}
          setSelected={setSelected}
          setShowRequestedServicesModal={setShowRequestedServicesModal}
        />
      )}

      {addNewBadge && (
        <Modal
          isOpen={addNewBadge}
          closeModal={() => setAddNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.addUser}
          description={labels.sedUtPerspiciatis}
          content={<AddEditUserForm />}
        />
      )}

      {editNewBadge && (
        <Modal
          isOpen={editNewBadge !== null ? true : false}
          closeModal={() => setEditNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.editUser}
          description={labels.sedUtPerspiciatis}
          content={<AddEditUserForm isEdit data={editNewBadge} />}
        />
      )}

      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          closeModal={() => setShowDeleteModal((prev) => !prev)}
          containerClassName={"!w-[461px]"}
          title={null}
          maxWidth={"max-w-[580px]"}
          description={null}
          content={
            <DeleteDialogActionForm
              actions={deleteDialogOptions}
              title={labels.deleteUser}
              description={labels.deleteUserDescription}
            />
          }
        />
      )}

      {showStatusUpdateModal && (
        <Modal
          isOpen={showStatusUpdateModal}
          closeModal={() => setShowStatusUpdateModal(false)}
          containerClassName={"!w-[461px]"}
          title={null}
          content={
            <DialogModal
              modalImg={
                selected?.status === "accepted"
                  ? TickConfirmationIcon
                  : CrossConfirmationIcon
              }
              modalImgAlt={
                selected?.status === "accepted" ? "tickIcon" : "crossIcon"
              }
              btnOptions={statusUpdateConfirmationOptions}
              title={labels.areYouSure}
              tagline={
                selectedTab === "service"
                  ? selected?.status === "accepted"
                    ? labels.youWantToAcceptTheServiceStatus
                    : labels.youWantToRejectTheServiceStatus
                  : selected?.status === "accepted"
                  ? labels.youWantToAcceptTheVenueStatus
                  : labels.youWantToRejectTheVenueStatus
              }
            />
          }
        />
      )}

      {showRequestedServicesModal && (
        <Modal
          isOpen={showRequestedServicesModal}
          closeModal={() => setShowRequestedServicesModal(null)}
          containerClassName={"!w-[440px]"}
          title={null}
          content={
            <DialogModal
              title={labels.allRequestedServices}
              showContentList={showRequestedServicesModal?.services || []}
            />
          }
        />
      )}
    </Container>
  );
};

export default RequestedServices;
