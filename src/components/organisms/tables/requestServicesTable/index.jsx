/** @format */

import { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import Table from "../../../organisms/table";
import { useNavigate } from "react-router-dom";
import { DynamicRoutes, ServiceRequestStatusType } from "../../../../constants";
import moment from "moment";
import {
  checkRequestServiceStatus,
  returnStatusColor,
} from "../../../../utils";
import BadgePill from "../../../atoms/badgePill";
import Paragraph from "../../../atoms/paragraph";

const RequestServicesTable = ({
  selectedTab,
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  requests,
  setRequests,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
  setShowStatusUpdateModal = () => {},
  selected,
  setSelected,
  setShowRequestedServicesModal = () => {},
}) => {
  const navigate = useNavigate();
  const {
    ChevronRight,
    EditIcon,
    CrossIcon,
    CheckIcon,
    deleteIconRed,
    deleteIconRedWithoutBg,
  } = Icons;

  return (
    <div>
      <Table
        headers={labels?.requestsHeader}
        notFoundTitle={labels?.noRequestFound}
        notFoundDescription={labels?.noRequestDescription}
        listData={requests}
        loading={loading}
        getData={getData}
        pageData={pageData}
        paddingFirstCell={"px-8"}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className={
                "!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0"
              }
              key={item?.id}
            >
              <td className={"min-w-40 px-8 py-2"}>
                <div
                  className={
                    "flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span className={"font-outfit_regular truncate text-black"}>
                    {item?.name ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={`px-3 py-2 font-outfit_regular text-c_202224 !min-w-40`}
              >
                <div className={"flex items-center justify-start gap-2"}>
                  <UserImage image={item?.user?.image} />
                  <span className={"whitespace-nowrap"}>
                    {item?.user?.fullName ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td className={"min-w-40 px-3 py-2"}>
                <div
                  className={
                    "flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span className={"font-outfit_regular truncate text-black"}>
                    {item?.user?.email ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={
                  "!min-w-24 flex flex-wrap items-center justify-start gap-2 px-3 truncate py-4 font-outfit_regular text-c_202224"
                }
              >
                {!!item?.serviceRequest?.find((val) => val)?.category ? (
                  item?.serviceRequest?.length > 1 ? (
                    <Fragment>
                      {item?.serviceRequest?.slice(0, 1)?.map((item, idx) => {
                        return (
                          <BadgePill
                            key={idx}
                            className={"!px-[15px] !py-[4px]"}
                            rounded={"rounded-full"}
                            size={"sm"}
                            variant={"secondary"}
                            label={item?.category?.nameEn}
                          />
                        );
                      })}
                      <Paragraph
                        onClick={() => {
                          setShowRequestedServicesModal((prev) => ({
                            ...prev,
                            services: item?.serviceRequest,
                          }));
                        }}
                        className={
                          "!text-c_0E73D0 !cursor-pointer !underline !font-outfit_regular md:text-fs_14 text-fs_14"
                        }
                      >{`${
                        item?.serviceRequest?.length - 1
                      }+ View More`}</Paragraph>
                    </Fragment>
                  ) : (
                    item?.serviceRequest?.map((item, idx) => {
                      return (
                        <BadgePill
                          key={idx}
                          className={"!px-[15px] !py-[4px]"}
                          rounded={"rounded-full"}
                          size={"sm"}
                          variant={"secondary"}
                          label={item?.category?.nameEn}
                        />
                      );
                    })
                  )
                ) : (
                  labels.notAvailable
                )}
              </td>
              <td
                className={
                  "min-w-20 px-3 truncate py-2 font-outfit_regular text-c_202224"
                }
              >
                {moment(item?.createdAt).format("DD-MM-YYYY")}
              </td>
              <td
                className={`min-w-20 px-3 truncate py-2 font-outfit_regular ${returnStatusColor(
                  item?.status,
                )}`}
              >
                {checkRequestServiceStatus(item?.status, labels)}
              </td>

              <td
                className={`min-w-20 px-3 py-2 font-outfit_regular capitalize`}
              >
                <div className={"flex items-center gap-1"}>
                  {["underReview", "pending"].includes(item?.status) ? (
                    <Fragment>
                      <Button
                        onClick={() => {
                          setSelected({
                            ...item,
                            status: ServiceRequestStatusType.REJECTED,
                            index,
                          });
                          setShowStatusUpdateModal(true);
                        }}
                        img={CrossIcon}
                        imgClassName={"!w-[10px] !h-[10px]"}
                        className={`flex !w-[30px] !h-[30px] justify-center  items-center !rounded-[100px]  !bg-c_EF394A !p-2`}
                      />
                      <Button
                        onClick={() => {
                          setSelected({
                            ...item,
                            status: ServiceRequestStatusType.ACCEPTED,
                            index,
                          });
                          setShowStatusUpdateModal(true);
                        }}
                        img={CheckIcon}
                        imgClassName={"!w-3 !h-3"}
                        className={`flex !w-[30px] !h-[30px] justify-center  items-center !rounded-[100px]  !bg-c_2CBD4D !p-2`}
                      />
                    </Fragment>
                  ) : (
                    <Button
                      onClick={() => handleNavigate(item)}
                      img={ChevronRight}
                      imgClassName={"!w-[12px] !h-[12px]"}
                      className={`!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0`}
                    />
                  )}
                </div>
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default RequestServicesTable;
