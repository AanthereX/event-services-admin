/** @format */

import React from "react";
import Table from "../../../organisms/table";
import labels from "../../../../locale";
import Button from "../../../atoms/button";
import { changeRequestsData } from "../../../../constants/ChangeRequests.constants";
import { Icons } from "../../../../assets/icons";
import UserImage from "../../../atoms/userImage";
import moment from "moment";
import Image from "../../../atoms/image";
import { Circles, ThreeCircles } from "react-loader-spinner";
import { EntryStatus } from "../../../../constants";
const { CrossIcon, CheckIcon, ChevronRight, DefaultAvatar, LoaderSimple } =
  Icons;

const ChangeRequestTable = ({
  pageData = {},
  setEdit = () => {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  loaderGetDetails,
  setLoaderGetDetails,
  requests,
  setEvents,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
  openRequestModal,
  setOpenRequestModal = () => {},
  handlerGetChangeEventRequestDetailById = () => {},
}) => {
  return (
    <div>
      <Table
        headers={labels?.changeRequestHeader}
        notFoundTitle={labels?.noRequestMadeYet}
        notFoundDescription={labels?.vendorNotFoundDescription}
        loading={loading}
        listData={requests}
        pageData={pageData}
        getData={getData}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              key={item?.id}
              className="cursor-pointer min-w-48 text-c_121212 text-[14px] font-outfit_regular border-b-[0.6px] border-c_D4D4D4 last:border-0"
            >
              <td
                className={
                  "!min-w-24 pl-8 py-2 font-outfit_regular text-c_202224"
                }
              >
                <div className={"flex items-center gap-2"}>
                  <span className={"whitespace-nowrap"}>
                    {item?.id ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td className={"min-w-20 px-3 py-2"}>
                <div className={"flex items-center gap-2"}>
                  <span className={"whitespace-nowrap"}>
                    {item?.event?.name ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={
                  "min-w-20 px-3 py-2 whitespace-nowrap font-outfit_regular text-c_202224"
                }
              >
                {item?.event?.eventType ?? labels.notAvailable}
              </td>
              <td
                className={
                  "min-w-36 px-3 py-2 font-outfit_regular text-c_202224"
                }
              >
                <div className={"flex items-center gap-2"}>
                  <UserImage
                    width={40}
                    height={40}
                    className={"!h-[40px] !w-[40px]"}
                    image={item?.event?.user?.image || DefaultAvatar}
                  />
                  <span className={"whitespace-nowrap"}>
                    {item?.event?.user?.fullName ?? labels.notAvailable}
                  </span>
                </div>
              </td>

              <td
                className={"min-w-fit px-3 py-2 font-outfit_regular capitalize"}
              >
                <span className={"whitespace-nowrap"}>
                  {moment(item?.createdAt).format("DD-MM-YYYY - hh:mm A") ??
                    labels.notAvailable}
                </span>
              </td>
              <td
                className={"min-w-20 px-3 py-2 font-outfit_medium capitalize"}
              >
                <span
                  className={`${
                    item.status?.toLowerCase() == "accepted"
                      ? "text-c_2CBD4D"
                      : item?.status?.toLowerCase() == "cancelled"
                      ? "text-c_EF394A"
                      : "text-c_FF9500"
                  }`}
                >
                  {item?.status}
                </span>
              </td>

              <td
                className={
                  "min-w-20 px-3 min-h-[100%] py-4 gap-2 flex items-center"
                }
              >
                {item?.status?.toLowerCase() !== "pending" ? (
                  <div>
                    <Button
                      img={ChevronRight}
                      imgClassName={"!w-[14px] !h-[14px]"}
                      className={`!w-6 !h-6 flex justify-center items-center !bg-transparent !p-0`}
                    />
                  </div>
                ) : (
                  <div className={"flex items-center gap-1"}>
                    <Button
                      disabled={loaderGetDetails}
                      onClick={() => {
                        setOpenRequestModal({
                          ...item,
                          localStatus: EntryStatus.REJECTED,
                        });
                        handlerGetChangeEventRequestDetailById(item?.id);
                      }}
                      img={CrossIcon}
                      imgClassName={"!w-[10px] !h-[10px]"}
                      className={`flex !w-[30px] !h-[30px] justify-center items-center !rounded-full !bg-c_EF394A !p-2`}
                    />
                    <Button
                      disabled={loaderGetDetails}
                      onClick={() => {
                        setOpenRequestModal({
                          ...item,
                          localStatus: EntryStatus.ACCEPTED,
                        });
                        handlerGetChangeEventRequestDetailById(item?.id);
                      }}
                      img={CheckIcon}
                      imgClassName={"!w-3 !h-3"}
                      className={`flex !w-[30px] !h-[30px] justify-center items-center !rounded-full !bg-c_2CBD4D !p-2`}
                    />
                  </div>
                )}
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default ChangeRequestTable;
