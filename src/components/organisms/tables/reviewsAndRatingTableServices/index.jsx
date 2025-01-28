/** @format */

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import Table from "../../../organisms/table";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import StarRating from "../../../molecules/starRating";
import { Icons } from "../../../../assets/icons";

const ReviewsAndRatingTableServices = ({
  selectedTab,
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  reviews,
  setReviews,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
}) => {
  const navigate = useNavigate();
  const { DefaultAvatar } = Icons;
  return (
    <div>
      <Table
        headers={
          selectedTab === "service"
            ? labels.ratingsHeaderForServices
            : labels?.ratingsHeaderForVenues
        }
        notFoundTitle={labels?.noReviewsFound}
        notFoundDescription={labels?.noReviewsDescription}
        listData={reviews}
        loading={loading}
        getData={getData}
        pageData={pageData}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className={
                "!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0"
              }
              key={item?.id}
            >
              <td
                className={`px-8 py-2 font-outfit_regular text-c_202224 !min-w-24`}
              >
                <div className={"flex items-center gap-2"}>
                  <span className={"whitespace-nowrap"}>{`${
                    item?.id ?? labels.notAvailable
                  }`}</span>
                </div>
              </td>
              <td
                className={
                  "min-w-20 whitespace-nowrap px-3 py-2 font-outfit_regular text-c_202224"
                }
              >
                {item?.events?.name ?? labels.notAvailable}
              </td>
              <td
                className={
                  "min-w-20 whitespace-nowrap px-3 py-2 font-outfit_regular text-c_202224"
                }
              >
                {item?.events?.name ?? labels.notAvailable}
              </td>
              <td className={"px-3 py-2"}>
                <div
                  className={
                    "flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span
                    className={
                      "font-outfit_regular whitespace-nowrap text-black"
                    }
                  >
                    {item?.service?.category?.nameEn ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={
                  "min-w-20 px-3 whitespace-nowrap py-2 font-outfit_regular text-c_202224"
                }
              >
                {item?.service?.user?.fullName ?? labels.notAvailable}
              </td>
              <td
                className={`px-3 py-2 font-outfit_regular text-c_202224 !min-w-36`}
              >
                <div className={"flex items-center gap-2"}>
                  <UserImage
                    image={item?.events?.user?.image ?? DefaultAvatar}
                  />
                  <span className={"whitespace-nowrap"}>{`${
                    item?.events?.user?.fullName ?? labels.notAvailable
                  }`}</span>
                </div>
              </td>
              <td className={`py-2 font-outfit_regular`}>
                <StarRating
                  totalStar={1}
                  rating={item?.rating ?? 0}
                  readOnly={true}
                  ratingFraction={2}
                />
              </td>

              <td
                className={`min-w-20 whitespace-nowrap px-3 py-2 font-outfit_medium text-c_121212 capitalize`}
              >
                {moment(item?.createdAt).format("DD-MM-YYYY")}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default ReviewsAndRatingTableServices;
