/** @format */

import React, { useState } from "react";
import Table from "../../../organisms/table";
import Button from "../../../atoms/button";
import { Icons } from "../../../../assets/icons";
import ToggleSwitch from "../../../atoms/toggleSwitch";
import labels from "../../../../locale";
import UserImage from "../../../atoms/userImage";
import { useNavigate } from "react-router-dom";
import {
  DynamicRoutes,
  EntryStatus,
  ServiceRequestStatusType,
} from "../../../../constants";
import { returnYesOrNo } from "../../../../utils";
import SelectInput from "../../../molecules/selectInputDropdown";
const { ChevronRight, EditIcon, CrossIcon, CheckIcon } = Icons;

const VendorsTable = ({
  setEdit = () => {},
  GoToDetailsPage = () => {},
  pageData = {},
  setShowDeleteModal = () => {},
  search,
  setSearch,
  loading,
  setLoading,
  vendors,
  setVendors,
  count,
  setCount,
  value,
  getData = () => {},
  onStatusChange = () => {},
  showStatusUpdateModal = false,
  setShowStatusUpdateModal = () => {},
  selected,
  setSelected,
  handlerUpdateVendorStatus,
}) => {
  const navigate = useNavigate();
  const { DefaultAvatar } = Icons;
  return (
    <div>
      <Table
        headers={labels?.vendorHeader}
        notFoundTitle={labels?.noVendorsAddedYet}
        notFoundDescription={labels?.vendorNotFoundDescription}
        loading={loading}
        listData={vendors}
        pageData={pageData}
        getData={getData}
        headerClassName={"!text-c_454545 !font-outfit_light"}
        renderItem={(item, index, pageNumber) => {
          return (
            <tr
              className={
                "!rounded-md min-w-48 text-c_121212 text-[14px] font-outfit_medium border-b-[0.6px] border-c_D4D4D4 last:border-0"
              }
              key={item?.id}
            >
              <td
                className={
                  "min-w-24 pl-8 pr-14 py-2 font-outfit_medium text-c_202224"
                }
              >
                <div className={"flex items-center gap-2"}>
                  <UserImage image={item?.image ?? DefaultAvatar} />
                  <span className={"whitespace-nowrap"}>{item?.fullName}</span>
                </div>
              </td>
              <td className={"min-w-24 px-3 py-2"}>
                <div
                  className={
                    "flex justify-start items-center gap-3 font-medium text-c_202224"
                  }
                >
                  <span className={"font-outfit_medium truncate text-black"}>
                    {item?.email ?? labels.notAvailable}
                  </span>
                </div>
              </td>
              <td
                className={
                  "min-w-24 px-3 truncate py-2 font-outfit_medium text-c_202224"
                }
              >
                {item?.phoneNumber ?? labels.notAvailable}
              </td>
              <td
                className={
                  "min-w-24 px-3 py-2 font-outfit_medium text-c_202224"
                }
              >
                {returnYesOrNo(item?.company?.find((val) => val)?.service)}
              </td>
              <td
                className={"min-w-24 px-3 py-2 font-outfit_medium capitalize"}
              >
                {returnYesOrNo(item?.company?.find((val) => val)?.venue)}
              </td>
              <td
                className={"min-w-24 px-3 py-2 font-outfit_medium capitalize"}
              >
                <ToggleSwitch
                  status={!!item?.visibility ? true : false}
                  onStatusChange={() => onStatusChange(item?.id)}
                />
              </td>
              <td
                className={"min-w-24 px-3 py-2 font-outfit_medium capitalize"}
              >
                {item?.status?.toLowerCase() === EntryStatus.REJECTED ? (
                  <div>
                    <SelectInput
                      options={[
                        {
                          label: ServiceRequestStatusType.ACCEPTED,
                          value: ServiceRequestStatusType.ACCEPTED,
                        },
                        {
                          label: ServiceRequestStatusType.REJECTED,
                          value: ServiceRequestStatusType.REJECTED,
                        },
                      ]}
                      isMulti={false}
                      placeholder={null}
                      isOptionDisabled={false}
                      onChange={(e) => {
                        handlerUpdateVendorStatus(item?.id, e?.value);
                      }}
                      value={{
                        label: item?.status,
                        value: item?.status,
                      }}
                    />
                  </div>
                ) : item?.status?.toLowerCase() === EntryStatus.ACCEPTED ? (
                  <div>
                    <span
                      className={`${
                        item.status?.toLowerCase() == EntryStatus.ACCEPTED
                          ? "text-c_2CBD4D"
                          : item?.status?.toLowerCase() == EntryStatus.REJECTED
                          ? "text-c_EF394A"
                          : "text-c_FF9500"
                      }`}
                    >
                      {item?.status ?? labels.notAvailable}
                    </span>
                  </div>
                ) : (
                  <div className={"flex items-center gap-1"}>
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
                      className={`flex !p-2 !w-[30px] !h-[30px] justify-center items-center !rounded-[100px] !bg-c_EF394A`}
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
                      className={`flex !p-2 !w-[30px] !h-[30px] justify-center items-center !rounded-[100px] !bg-c_2CBD4D`}
                    />
                  </div>
                )}
              </td>
              <td
                className={
                  "min-w-24 px-3 min-h-[100%] py-4 gap-2 flex items-center"
                }
              >
                <Button
                  onClick={() => setEdit({ ...item, index })}
                  img={EditIcon}
                  imgClassName={"!w-4 !h-4"}
                  className={`flex !p-2 !w-8 justify-center  items-center rounded-[4px] !bg-c_5669FF33`}
                />
                <Button
                  onClick={() =>
                    navigate(`${DynamicRoutes.VENDORDETAILS}/${item?.id}`, {
                      state: {
                        data: item,
                      },
                    })
                  }
                  img={ChevronRight}
                  imgClassName={"!w-[12px] !h-[12px]"}
                  className={`!w-6 !h-6 !p-0 flex justify-center items-center !bg-transparent`}
                />
              </td>
            </tr>
          );
        }}
      />
    </div>
  );
};

export default VendorsTable;
