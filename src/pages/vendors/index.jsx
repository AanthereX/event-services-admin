/** @format */

import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/organisms/pageHeader";
import labels from "../../locale";
import { UserTypes } from "../../constants";
import { Icons } from "../../assets/icons";
import VendorsTable from "../../components/organisms/tables/vendorsTable";
import Modal from "../../components/molecules/modal";
import AddVendorForm from "../../components/molecules/forms/addAndEditVendorForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../../layout/container";
import { toast } from "sonner";
import {
  getAllServiceCategoriesList,
  getPageData,
  getVendorList,
  setServiceCategoriesList,
  setVendorList,
} from "../../store/slices/vendor.slice";
import {
  useAddVendorMutation,
  useLazyGetAllServiceWithoutPaginationQuery,
  useLazyGetVendorsQuery,
  useUpdateVendorsMutation,
  useUpdateVendorStatusMutation,
  useVendorVisibilityMutation,
} from "../../services/vendorService";
import DialogModal from "../../components/organisms/modals/confirmationDialog";

const Vendors = () => {
  const { PlusIcon, CrossConfirmationIcon, TickConfirmationIcon } = Icons;
  const { addNew, vendors, search } = labels;
  const dispatch = useDispatch();
  const vendorsDataList = useSelector(getVendorList);
  const serviceCategoriesList = useSelector(getAllServiceCategoriesList);
  const getVendorListings = useSelector(getVendorList);
  const pageData = useSelector(getPageData);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [addNewBadge, setAddNewBadge] = useState(false);
  const [editNewBadge, setEditNewBadge] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [allCheckBoxError, setAllCheckBoxError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVendorProviderOrService, setIsVendorProviderOrService] =
    useState(null);
  const [page, setPage] = useState(1);
  const [allVendors, setAllVendors] = useState([]);
  const [allServiceCategories, setAllServiceCategories] = useState([]);
  const [count, setCount] = useState(0);

  const [getAllVendors, { isLoading, isFetching, isError }] =
    useLazyGetVendorsQuery();

  const [
    getAllServiceWithoutPagination,
    {
      isLoading: loadingGetAllServiceCategories,
      isError: errorFetchingServiceCategories,
    },
  ] = useLazyGetAllServiceWithoutPaginationQuery();
  const [
    addVendor,
    {
      isLoading: isLoadingAddVendor,
      isFetching: addVendorFetching,
      isError: addVendorIsError,
    },
  ] = useAddVendorMutation();
  const [
    updateVendor,
    {
      isLoading: isLoadingEditVendor,
      isFetching: editVendorFetching,
      isError: editVendorIsError,
    },
  ] = useUpdateVendorsMutation();
  const [
    vendorVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useVendorVisibilityMutation();

  const [
    updateVendorStatus,
    {
      isLoading: isLoadingUpdateStatus,
      isFetching: updateStatusFetching,
      isError: updateStatusIsError,
    },
  ] = useUpdateVendorStatusMutation();

  const handlerGetAllServicesCategories = useCallback(async () => {
    try {
      const response = await getAllServiceWithoutPagination().unwrap();
      if (!response) return;
      setAllServiceCategories(response.data);
      setPage(response.data?.count);
    } catch (error) {
      console.log(error?.data?.message);
    }
  }, []);

  const getAllVendorsData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllVendors({
          page,
          search: searchInputValue,
        }).unwrap();
        setAllVendors(response.data?.user);
        setCount(response.data?.count);
        dispatch(
          setVendorList({
            data: response.data?.user,
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
    getAllVendorsData(1);
  }, [searchInputValue]);

  useEffect(() => {
    handlerGetAllServicesCategories();
  }, []);

  const handlerUpdateVendorStatus = useCallback(async (_id, _status) => {
    try {
      const payload = { status: _status };
      const response = await updateVendorStatus({
        id: _id,
        body: payload,
      }).unwrap();
      if (!!response) {
        toast.success(response?.message);
        setShowStatusUpdateModal(false);
        getAllVendorsData(1);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }, []);

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
        handlerUpdateVendorStatus(selected?.id, selected?.status);
      },
    },
  ];

  const handleVendorFormSubmissions = async (data, id = null, type = "add") => {
    try {
      const payload = {
        fullName: data?.fullName,
        email: data?.email?.toLocaleLowerCase(),
        phoneNumber: data?.phoneNumber,
        ...(type === "add" ? { password: data?.password } : {}),
        companyName: data?.companyName,
        comercialNumber: data?.comercialNumber,
        service: data?.service,
        venue: data?.venue,
        userType: UserTypes.VENDOR,
        serviceCategory: !!data?.service
          ? allServiceCategories
              .filter((elm) => elm?.type)
              .map((service) => ({
                type: !editNewBadge ? "add" : service?.type,
                ...(service?.type === "delete"
                  ? {}
                  : { serviceCategoryId: service?.id }),
                ...(!editNewBadge || service?.type === "add"
                  ? {}
                  : { companyServiceId: service?.companyServiceId }),
              }))
          : allServiceCategories
              .filter((elm) => elm?.companyServiceId)
              .map((service) => ({
                type: "delete",
                companyServiceId: service?.companyServiceId,
              })),
      };
      const response =
        type === "add"
          ? await addVendor(payload).unwrap()
          : await updateVendor({
              id: id,
              body: payload,
            }).unwrap();
      if (!!response) {
        toast.success(response?.message);
        getAllVendorsData(1);
        setEditNewBadge(false);
        setAddNewBadge(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const resetServicesData = () => {
    const resetData = allServiceCategories?.map((service) => ({
      ...service,
      isChecked: false,
      type: undefined,
    }));
    setAllServiceCategories(resetData);
  };

  const handleToggleVisibility = async (id) => {
    try {
      const response = await vendorVisibility({
        id: id,
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
        title={vendors}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => {
          resetServicesData();
          setAddNewBadge((prev) => !prev);
        }}
      />

      <VendorsTable
        pageData={pageData}
        loading={loading}
        setLoading={setLoading}
        setEdit={setEditNewBadge}
        search={searchInputValue}
        setSearch={setSearchInputValue}
        onStatusChange={handleToggleVisibility}
        vendors={vendorsDataList || allVendors}
        setVendors={setAllVendors}
        count={count}
        setCount={setCount}
        getData={getAllVendorsData}
        showStatusUpdateModal={showStatusUpdateModal}
        setShowStatusUpdateModal={setShowStatusUpdateModal}
        selected={selected}
        setSelected={setSelected}
      />

      {addNewBadge && (
        <Modal
          isOpen={addNewBadge}
          closeModal={() => setAddNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.addVendor}
          content={
            <AddVendorForm
              loading={isLoadingAddVendor || isLoadingEditVendor}
              onSubmission={handleVendorFormSubmissions}
              servicesData={allServiceCategories}
              setServicesData={setAllServiceCategories}
              isVendorProviderOrService={isVendorProviderOrService}
              setIsVendorProviderOrService={setIsVendorProviderOrService}
              allCheckBoxError={allCheckBoxError}
              setAllCheckBoxError={setAllCheckBoxError}
            />
          }
        />
      )}

      {editNewBadge && (
        <Modal
          isOpen={editNewBadge !== null ? true : false}
          closeModal={() => setEditNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.editVendor}
          content={
            <AddVendorForm
              isEdit
              editVendorObj={editNewBadge}
              loading={isLoadingAddVendor || isLoadingEditVendor}
              onSubmission={handleVendorFormSubmissions}
              servicesData={allServiceCategories}
              setServicesData={setAllServiceCategories}
              isVendorProviderOrService={isVendorProviderOrService}
              setIsVendorProviderOrService={setIsVendorProviderOrService}
              allCheckBoxError={allCheckBoxError}
              setAllCheckBoxError={setAllCheckBoxError}
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
              modalImgClassName={""}
              btnOptions={statusUpdateConfirmationOptions}
              title={labels.areYouSure}
              tagline={
                selected?.status === "accepted"
                  ? labels.youWantToAcceptTheVendorStatus
                  : labels.youWantToRejectTheVendorStatus
              }
            />
          }
        />
      )}
    </Container>
  );
};

export default Vendors;
