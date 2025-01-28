/** @format */

import React from "react";
import Paragraph from "../../atoms/paragraph";
import DetailsFeild from "../../molecules/detailsFeild";
import labels from "../../../locale";
import Button from "../../atoms/button";
import Heading from "../../atoms/heading";
import ToggleSwitch from "../../atoms/toggleSwitch";
import { Icons } from "../../../assets/icons";
import ButtonBadgeList from "../../molecules/buttonBadgelist";
import { toast } from "sonner";
import { useVendorVisibilityMutation } from "../../../services/vendorService";
import { EntryStatus, ServiceRequestStatusType } from "../../../constants";
import Image from "../../atoms/image";
import { returnYesOrNo } from "../../../utils";

const VendorsDetailsHeader = ({
  data = {},
  selected,
  setSelected,
  setShowStatusUpdateModal,
}) => {
  const { CrossIcon, CheckIcon, DefaultAvatar } = Icons;
  const servicesData = data?.service?.map((item) => {
    return {
      ...item,
      label: item?.name || "",
    };
  });
  const [
    vendorVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useVendorVisibilityMutation();

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
    <div className={"flex flex-col gap-5"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"flex justify-between"}>
          <div className={"flex flex-row justify-between items-center"}>
            <Heading
              className={"text-fs_24 !font-outfit_semiBold md:text-fs_32"}
            >
              {labels?.vendorDetails}
            </Heading>
          </div>

          {data?.status === ServiceRequestStatusType.ACCEPTED ||
          data?.status === ServiceRequestStatusType.REJECTED ? (
            <div>
              <Paragraph
                className={
                  "font-outfit_regular text-fs_18  md:text-fs_18 leading-[40px]"
                }
              >
                {labels.visibility}
              </Paragraph>
              <ToggleSwitch
                status={!!data?.visibility ? true : false}
                onStatusChange={() => handleToggleVisibility(data?.id)}
              />
            </div>
          ) : data?.status === EntryStatus.PENDING ? (
            <div
              className={`min-w-20 px-3 py-2 font-outfit_regular capitalize`}
            >
              <div className={"flex items-center gap-1"}>
                <Button
                  onClick={() => {
                    setSelected({
                      ...data,
                      status: ServiceRequestStatusType.REJECTED,
                    });
                    setShowStatusUpdateModal(true);
                  }}
                  img={CrossIcon}
                  label={"Reject"}
                  className={`flex justify-center items-center !text-white !bg-c_EF394A !py-2 px-3`}
                />
                <Button
                  onClick={() => {
                    setSelected({
                      ...data,
                      status: ServiceRequestStatusType.ACCEPTED,
                    });
                    setShowStatusUpdateModal(true);
                  }}
                  img={CheckIcon}
                  label={"Accept"}
                  className={`flex justify-center items-center !text-white !bg-c_2CBD4D !py-2 px-3`}
                />
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-start lg:items-center gap-7 lg:flex-row flex-col">
          <div className="flex items-center gap-6">
            <Image
              src={data?.image ?? DefaultAvatar}
              alt={`${data?.image}` ?? `${data?.fullName}-avatar`}
              className={"!w-[92px] !h-[92px] rounded-full object-cover"}
            />
            {/* <Paragraph
              className={
                "font-outfit_semiBold text-fs_18 md:text-fs_18 leading-[20px]"
              }
            >
              {data?.fullName}
            </Paragraph>
            <div className="h-[73px] w-[1px] bg-c_DFDFDF hidden lg:block"></div> */}
          </div>
          <div className={"flex items-start gap-8 flex-wrap"}>
            <DetailsFeild
              title={labels.fullName}
              description={data?.fullName || labels.notAvailable}
            />
            <div
              className={"h-[65px] w-[1px] bg-c_DFDFDF sm:block hidden"}
            ></div>
            <DetailsFeild
              title={labels.emailAddress}
              description={data?.email || labels.notAvailable}
            />
            <div
              className={"h-[65px] w-[1px] bg-c_DFDFDF sm:block hidden"}
            ></div>
            <DetailsFeild
              title={labels.phoneNumber}
              description={data?.phoneNumber || labels.notAvailable}
            />
          </div>
        </div>
      </div>
      <DetailsFeild
        title={labels.providesVenues}
        description={returnYesOrNo(data?.company?.find((val) => val)?.venue)}
      />

      <div className="flex lg:items-center items-start lg:flex-row flex-col gap-10">
        <DetailsFeild
          title={labels.providesServices}
          description={returnYesOrNo(
            data?.company?.find((val) => val)?.service,
          )}
        />

        <ButtonBadgeList
          title={labels.services}
          data={servicesData || []}
          titleStyle={"!text-c_818181 !mb-3 !font-outfit_regular"}
        />
      </div>
    </div>
  );
};

export default VendorsDetailsHeader;
