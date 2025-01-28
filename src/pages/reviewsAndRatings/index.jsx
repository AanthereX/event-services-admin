/** @format */

import { useCallback, useEffect, useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import Modal from "../../components/molecules/modal";
import AddEditUserForm from "../../components/molecules/forms/addEditUserForm";
import DeleteDialogActionForm from "../../components/molecules/deleteDialogActionForm";
import ReviewsAndRatingTableServices from "../../components/organisms/tables/reviewsAndRatingTableServices";
import ReviewsAndRatingTableVenues from "../../components/organisms/tables/reviewsAndRatingTableVenues";
import { useLazyGetAllReviewsQuery } from "../../services/ratingAndReviews";
import { useDispatch, useSelector } from "react-redux";
import {
  getPageData,
  getReviewsList,
  setReviewList,
} from "../../store/slices/ratingAndReview.slice";

const { addNew, search, ratingsAndReviews } = labels;
const { PlusIcon } = Icons;

const ReviewsAndRatings = () => {
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [addNewBadge, setAddNewBadge] = useState(false);
  const pageData = useSelector(getPageData);
  const reviewsDataList = useSelector(getReviewsList);
  const [editNewBadge, setEditNewBadge] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("service");
  const [allReviews, setAllReviews] = useState([]);
  const [count, setCount] = useState(0);

  const [getAllReviews, { isLoading, isFetching, isError }] =
    useLazyGetAllReviewsQuery();

  const getAllReviewsData = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await getAllReviews({
          page,
          search: searchInputValue,
          type: selectedTab,
        }).unwrap();
        if (!!response?.data) {
          setAllReviews(response.data?.review);
          setCount(response.data?.count);
          dispatch(
            setReviewList({
              data: response.data?.review,
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
    getAllReviewsData(1);
  }, [searchInputValue, selectedTab]);

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
        title={
          selectedTab === "service" ? ratingsAndReviews : ratingsAndReviews
        }
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        count={223}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
        actions={headerActionButtons}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {selectedTab === "service" ? (
        <ReviewsAndRatingTableServices
          pageData={pageData}
          setEdit={setEditNewBadge}
          setShowDeleteModal={setShowDeleteModal}
          selectedTab={selectedTab}
          loading={loading || isFetching}
          setLoading={setLoading}
          search={searchInputValue}
          setSearch={setSearchInputValue}
          reviews={reviewsDataList || allReviews}
          setReviews={setAllReviews}
          count={count}
          setCount={setCount}
          getData={getAllReviewsData}
        />
      ) : (
        <ReviewsAndRatingTableVenues
          pageData={pageData}
          setEdit={setEditNewBadge}
          setShowDeleteModal={setShowDeleteModal}
          selectedTab={selectedTab}
          loading={loading}
          setLoading={setLoading}
          search={searchInputValue}
          setSearch={setSearchInputValue}
          reviews={reviewsDataList || allReviews}
          setReviews={setAllReviews}
          count={count}
          setCount={setCount}
          getData={getAllReviewsData}
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
    </Container>
  );
};

export default ReviewsAndRatings;
