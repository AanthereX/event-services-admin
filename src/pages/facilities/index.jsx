/** @format */

import { useCallback, useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import UsersTable from "../../components/organisms/tables/usersTable";
import Modal from "../../components/molecules/modal";
import AddEditUserForm from "../../components/molecules/forms/addEditUserForm";
import DeleteDialogActionForm from "../../components/molecules/deleteDialogActionForm";
import VenuesFacilitiesTable from "../../components/organisms/tables/venuesFacilitiesTable";
import AddEditVenueFacilityForm from "../../components/molecules/forms/addEditVenueFacilityForm";
import {
  getPageData,
  setVenueFacilityList,
} from "../../store/slices/venueFacility.slice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddVenueFacilityMutation,
  useFacilityVisibilityMutation,
  useLazyGetAllFacilitiesQuery,
  useUpdateVenueFacilityMutation,
} from "../../services/venueFacilities";

const Facilities = () => {
  const dispatch = useDispatch();
  const { addNew, search, venueFacilities, facilities } = labels;
  const { PlusIcon } = Icons;
  const [searchInputValue, setSearchInputValue] = useState("");
  const [addNewBadge, setAddNewBadge] = useState(false);
  const [editNewBadge, setEditNewBadge] = useState(false);
  const [count, setCount] = useState(0);
  const pageData = useSelector(getPageData);
  const [allVenueFacilities, setAllVenueFacilities] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [
    getAllFacilities,
    { isLoading: loadingGetAllFacilities, isError: isErrorAllFacilities },
  ] = useLazyGetAllFacilitiesQuery();
  const [
    facilityVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useFacilityVisibilityMutation();
  const [
    addVenueFacility,
    { isLoading: isLoadingAddFacility, isError: addFacilityIsError },
  ] = useAddVenueFacilityMutation();
  const [
    updateVenueFacility,
    { isLoading: isLoadingEditFacility, isError: editFacilityIsError },
  ] = useUpdateVenueFacilityMutation();

  const handlerGetAllVenueFacilities = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllFacilities({
          page,
          search: searchInputValue,
        }).unwrap();
        dispatch(
          setVenueFacilityList({
            data: response.data?.facility,
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
        setAllVenueFacilities(response.data?.facility);
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
    handlerGetAllVenueFacilities(1);
  }, [searchInputValue]);

  const handleToggleVisibility = async (_id) => {
    try {
      const response = await facilityVisibility({
        id: _id,
      }).unwrap();
      if (!!response) {
        toast.success(response?.message);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleUserFormSubmissions = async (data, id = null, type = "add") => {
    try {
      const payload = {
        nameEn: data?.facilityNameEn,
        nameAr: data?.facilityNameAr,
      };
      const response =
        type === "add"
          ? await addVenueFacility(payload).unwrap()
          : await updateVenueFacility({
              id: id,
              body: payload,
            }).unwrap();
      if (!!response) {
        toast.success(response?.message);
        handlerGetAllVenueFacilities(1);
        setEditNewBadge(false);
        setAddNewBadge(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

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

  return (
    <Container>
      <PageHeader
        title={facilities}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
      />

      <VenuesFacilitiesTable
        pageData={pageData}
        loading={loading}
        setLoading={setLoading}
        count={count}
        setCount={setCount}
        onStatusChange={handleToggleVisibility}
        search={searchInputValue}
        setSearch={setSearchInputValue}
        setEdit={setEditNewBadge}
        facilities={allVenueFacilities}
        getData={handlerGetAllVenueFacilities}
        setFacilities={setAllVenueFacilities}
        setShowDeleteModal={setShowDeleteModal}
      />

      {addNewBadge && (
        <Modal
          isOpen={addNewBadge}
          closeModal={() => setAddNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.addFacility}
          content={
            <AddEditVenueFacilityForm
              loading={isLoadingAddFacility || isLoadingEditFacility}
              onSubmission={handleUserFormSubmissions}
            />
          }
        />
      )}

      {editNewBadge && (
        <Modal
          isOpen={editNewBadge !== null ? true : false}
          closeModal={() => setEditNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.editFacility}
          content={
            <AddEditVenueFacilityForm
              isEdit
              data={editNewBadge}
              editUserObj={editNewBadge}
              loading={isLoadingAddFacility || isLoadingEditFacility}
              onSubmission={handleUserFormSubmissions}
            />
          }
        />
      )}

      {/* {showDeleteModal && (
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
              title={labels.deleteFacility}
              description={labels.deleteFacilityDescription}
            />
          }
        />
      )} */}
    </Container>
  );
};

export default Facilities;
