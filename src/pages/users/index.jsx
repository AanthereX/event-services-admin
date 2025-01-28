/** @format */

import { useCallback, useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import { toast } from "sonner";
import UsersTable from "../../components/organisms/tables/usersTable";
import Modal from "../../components/molecules/modal";
import AddEditUserForm from "../../components/molecules/forms/addEditUserForm";
import DeleteDialogActionForm from "../../components/molecules/deleteDialogActionForm";
import {
  useAddUserMutation,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
  useUserVisibilityMutation,
} from "../../services/userService";
import {
  getPageData,
  getUserList,
  removeUserInvitationsList,
  setUserList,
} from "../../store/slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { UserTypes } from "../../constants";

const Users = () => {
  const { users, addNew, search } = labels;
  const { PlusIcon } = Icons;
  const dispatch = useDispatch();
  const pageData = useSelector(getPageData);
  const usersDataList = useSelector(getUserList);
  const [addNewBadge, setAddNewBadge] = useState(false);
  const [editNewBadge, setEditNewBadge] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [count, setCount] = useState(0);

  const [getAllUsers, { isLoading, isFetching, isError }] =
    useLazyGetUsersQuery();
  const [
    addUser,
    {
      isLoading: isLoadingAddUser,
      isFetching: addUserFetching,
      isError: addUserIsError,
    },
  ] = useAddUserMutation();
  const [
    updateUser,
    {
      isLoading: isLoadingEditUser,
      isFetching: editUserFetching,
      isError: editUserIsError,
    },
  ] = useUpdateUserMutation();
  const [
    userVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useUserVisibilityMutation();

  const getAllUsersData = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const response = await getAllUsers({
          page,
          search: searchInputValue,
        }).unwrap();
        if (!response) return;
        dispatch(removeUserInvitationsList());
        setAllUsers(response.data?.users);
        setCount(response.data?.count);
        dispatch(
          setUserList({
            data: response.data?.users,
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
    getAllUsersData(1);
  }, [searchInputValue]);

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

  const handleUserFormSubmissions = async (data, id = null, type = "add") => {
    try {
      const payload = {
        email: data?.email?.toLocaleLowerCase(),
        fullName: data?.fullName,
        ...(data?.phoneNumber ? { phoneNumber: data?.phoneNumber } : {}),
        password: data?.password,
        userType: UserTypes.USER,
      };
      const response =
        type === "add"
          ? await addUser(payload).unwrap()
          : await updateUser({
              id: id,
              body: payload,
            }).unwrap();
      if (!!response) {
        toast.success(
          type === "edit" ? response?.message : "User added successfully!",
        );
        getAllUsersData(1);
        setEditNewBadge(false);
        setAddNewBadge(false);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleToggleVisibility = async (_id) => {
    try {
      const response = await userVisibility({
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
        title={users}
        badgeTitle={addNew}
        setSearchValue={setSearchInputValue}
        searchValue={searchInputValue}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
      />

      <UsersTable
        pageData={pageData}
        setEdit={setEditNewBadge}
        setShowDeleteModal={setShowDeleteModal}
        loading={loading}
        setLoading={setLoading}
        search={searchInputValue}
        setSearch={setSearchInputValue}
        onStatusChange={handleToggleVisibility}
        users={usersDataList || allUsers}
        setUsers={setAllUsers}
        count={count}
        setCount={setCount}
        getData={getAllUsersData}
      />

      {addNewBadge && (
        <Modal
          isOpen={addNewBadge}
          closeModal={() => setAddNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.addUser}
          content={
            <AddEditUserForm
              onSubmission={handleUserFormSubmissions}
              loading={isLoadingAddUser || isLoadingEditUser}
            />
          }
        />
      )}

      {editNewBadge && (
        <Modal
          isOpen={editNewBadge !== null ? true : false}
          closeModal={() => setEditNewBadge(false)}
          containerClassName={"!w-[461px]"}
          title={labels.editUser}
          content={
            <AddEditUserForm
              isEdit
              data={editNewBadge}
              editUserObj={editNewBadge}
              loading={isLoadingAddUser || isLoadingEditUser}
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
              title={labels.deleteUser}
              description={labels.deleteUserDescription}
            />
          }
        />
      )}
    </Container>
  );
};

export default Users;
