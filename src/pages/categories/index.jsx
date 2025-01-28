/** @format */

import { useCallback, useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import Modal from "../../components/molecules/modal";
import DeleteDialogActionForm from "../../components/molecules/deleteDialogActionForm";
import ServiceCategoryTable from "../../components/organisms/tables/serviceCategoryTable";
import AddEditServiceCategoryForm from "../../components/molecules/forms/addEditServiceCategoryForm";
import {
  getPageData,
  setCategoryList,
} from "../../store/slices/serviceCategories.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddServiceCategoryMutation,
  useLazyGetAllServiceCategoryQuery,
  useServiceCategoryVisibilityMutation,
  useUpdateServiceCategoryMutation,
} from "../../services/serviceCategories";
import { toast } from "sonner";

const Catogories = () => {
  const dispatch = useDispatch();
  const { addNew, search, servicesCategory, categories } = labels;
  const { PlusIcon } = Icons;
  const [addNewBadge, setAddNewBadge] = useState(false);
  const [editNewBadge, setEditNewBadge] = useState(false);
  const [count, setCount] = useState(0);
  const pageData = useSelector(getPageData);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [allServiceCategories, setAllServiceCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [
    getAllServiceCategory,
    {
      isLoading: loadingGetAllServiceCategories,
      isError: errorFetchingServiceCategories,
    },
  ] = useLazyGetAllServiceCategoryQuery();
  const [
    serviceCategoryVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useServiceCategoryVisibilityMutation();
  const [
    addServiceCategory,
    {
      isLoading: isLoadingAddCategory,
      isFetching: addCategoryFetching,
      isError: addCategoryIsError,
    },
  ] = useAddServiceCategoryMutation();
  const [
    updateServiceCategory,
    {
      isLoading: isLoadingEditCategory,
      isFetching: editCategoryFetching,
      isError: editCategoryIsError,
    },
  ] = useUpdateServiceCategoryMutation();

  const handlerGetAllServicesCategories = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllServiceCategory({
          page,
          search: searchInputValue,
        }).unwrap();
        dispatch(
          setCategoryList({
            data: response.data?.category,
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
        setAllServiceCategories(response.data?.category);
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
    handlerGetAllServicesCategories(1);
  }, [searchInputValue]);

  const handleToggleVisibility = async (id) => {
    try {
      const response = await serviceCategoryVisibility({
        id: id,
      }).unwrap();
      if (!response) return;
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleUserFormSubmissions = async (data, id = null, type = "add") => {
    try {
      const payload = {
        nameEn: data?.categoryNameEn,
        nameAr: data?.categoryNameAr,
      };
      const response =
        type === "add"
          ? await addServiceCategory(payload).unwrap()
          : await updateServiceCategory({
              id: id,
              body: payload,
            }).unwrap();
      if (!!response) {
        toast.success(response?.message);
        handlerGetAllServicesCategories(1);
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
        title={categories}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
      />

      <ServiceCategoryTable
        pageData={pageData}
        loading={loading}
        setLoading={setLoading}
        count={count}
        setCount={setCount}
        search={searchInputValue}
        onStatusChange={handleToggleVisibility}
        setSearch={setSearchInputValue}
        categories={allServiceCategories}
        getData={handlerGetAllServicesCategories}
        setCategories={setAllServiceCategories}
        setEdit={setEditNewBadge}
        setShowDeleteModal={setShowDeleteModal}
      />

      {addNewBadge && (
        <Modal
          isOpen={addNewBadge}
          closeModal={() => setAddNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.addCategory}
          content={
            <AddEditServiceCategoryForm
              loading={isLoadingAddCategory || isLoadingEditCategory}
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
          title={labels.editCategory}
          content={
            <AddEditServiceCategoryForm
              isEdit
              data={editNewBadge}
              editUserObj={editNewBadge}
              loading={isLoadingAddCategory || isLoadingEditCategory}
              onSubmission={handleUserFormSubmissions}
            />
          }
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
              title={labels.deleteCategory}
              description={labels.deleteCategoryDescription}
            />
          }
        />
      )}
    </Container>
  );
};

export default Catogories;
