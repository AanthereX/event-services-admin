/** @format */

import Divider from "../../atoms/divider";
import Heading from "../../atoms/heading";
import Paragraph from "../../atoms/paragraph";
import ButtonBadgeList from "../buttonBadgelist";
import DetailsField from "../detailsFeild";
import labels from "../../../locale";
import Image from "../../atoms/image";
import { Icons } from "../../../assets/icons";
import moment from "moment";
import Button from "../../atoms/button";
import { useNavigate } from "react-router-dom";
import { DynamicRoutes } from "../../../constants";
import SeeMoreButton from "../../atoms/seeMoreButton";

const VenueDateAndTimeDetails = ({
  loading = false,
  data,
  title,
  hostName,
}) => {
  const navigate = useNavigate();
  const { DefaultAvatar } = Icons;
  const venueBooking = data?.event?.venueBookingDetails?.find(
    (val) => val,
  )?.venueBooking;

  const bookingDates = data?.eventBookingDates?.map((item) => {
    return {
      ...item,
      label: moment(item?.createdAt).format("DD-MM-YYYY"),
    };
  });

  return (
    <div className={"w-full flex flex-col gap-3 bg-c_FCFCFC p-3 rounded-md"}>
      <div className={"w-full flex items-center justify-between"}>
        <Heading className={"!w-fit !whitespace-nowrap"}>{title}</Heading>
      </div>

      <div className="flex items-center gap-4">
        <Paragraph className="!text-c_818181 text-fs_14 font-outfit_regular">
          Host Name:
        </Paragraph>
        <Image
          src={venueBooking?.event?.user?.image || DefaultAvatar}
          alt={`${venueBooking?.event?.user?.fullName}-avatar` || "host-avatar"}
          className={"!h-[30px] !w-[30px] rounded-full object-cover"}
        />
        <Paragraph className={"text-fs_14 !font-outfit_medium"}>
          {hostName}
        </Paragraph>
      </div>
      <Divider />
      <div>
        <ButtonBadgeList
          title={labels?.eventDate}
          data={data?.event?.date}
          titleStyle={
            "!text-c_818181 md:!text-fs_14 font-outfit_regular pb-1 leading-[20px]"
          }
        />
      </div>
      <div className={"flex items-center gap-6"}>
        <div className={"border-r border-c_F0F0F0 pr-6"}>
          <DetailsField
            title={labels.eventTime}
            titleStyle={
              "text-fs_14 !text-c_818181 font-outfit_regular md:!text-fs_14 !leading-[30px]"
            }
            descriptionStyle={
              "text-fs_14 font-outfit_regular md:!text-fs_14 !leading-[30px]"
            }
            description={`${venueBooking?.event?.startTime}-${venueBooking?.event?.endTime}`}
          />
        </div>
        <DetailsField
          title={labels.numberOfGuests}
          titleStyle={
            "text-fs_14 !text-c_818181 !whitespace-nowrap font-outfit_regular md:!text-fs_14 !leading-[30px]"
          }
          descriptionStyle={
            "text-fs_14 font-outfit_regular md:!text-fs_14 !leading-[30px]"
          }
          description={"200"}
        />
        <div className={"flex-1"}>
          <SeeMoreButton
            label={labels.seeMore}
            onClick={() => {
              navigate(
                `${DynamicRoutes.EVENTSDETAILS}/${venueBooking?.event?.id}`,
                {
                  state: {
                    ...venueBooking,
                  },
                },
              );
            }}
          />
        </div>
      </div>
      {/* <div className="flex items-center gap-6 flex-wrap ">
        {data.map((detail, index) => {
          return (
            <React.Fragment key={index}>
              <DetailsField
                title={detail.title}
                titleStyle="text-fs_14 font-outfit_regular md:!text-fs_14 !leading-[30px]"
                descriptionStyle="text-fs_14 font-outfit_regular md:!text-fs_14 !leading-[10px]"
                description={detail.description}
              />
              {index < data.length - 1 && (
                <div className="h-[30px] w-[1px] self-center bg-c_DFDFDF sm:block hidden"></div>
              )}
            </React.Fragment>
          );
        })}
      </div> */}
    </div>
  );
};

export default VenueDateAndTimeDetails;
