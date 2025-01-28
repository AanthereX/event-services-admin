/** @format */

import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./index.css";
import moment from "moment/moment";
import Button from "../button";
import { Icons } from "../../../assets/icons";
import Paragraph from "../paragraph";

const Calender = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  availabilities = [],
  callBackGetBookedDetail = () => {},
}) => {
  const { ChevronLeftLight, ChevronRightLight } = Icons;
  const [viewDate, setViewDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  // console.log(viewDate, "viewDate");

  // console.log(availabilities, "availabilities");

  // const dateData = {
  //   "2024-10-05": { booked: true, details: "Event A" },
  //   "2024-10-07": { available: true },
  //   "2024-10-15": { available: true, details: "Event B" },
  // };

  const dateData = availabilities.reduce(
    (acc, { date, venueBookingDetails, ...rest }) => {
      const formattedDate = date?.split("T")[0];
      const isBooked = venueBookingDetails?.length > 0;

      acc[formattedDate] = {
        ...rest,
        booked: isBooked,
        available: !isBooked,
      };

      return acc;
    },
    {},
  );

  const handlePrevMonth = () => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  };

  // Update startDate and endDate whenever viewDate changes
  useEffect(() => {
    const newStartDate = moment(viewDate).startOf("month").format("YYYY-MM-DD");
    const newEndDate = moment(viewDate).endOf("month").format("YYYY-MM-DD");
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  }, [viewDate]);

  const tileContent = ({ date }) => {
    const dateKey = moment(date).format("YYYY-MM-DD");
    const dayData = dateData[dateKey];

    if (!!dayData) {
      return (
        <div className={"flex justify-center"}>
          {dayData.booked && (
            <div className={"!w-[8px] !h-[8px] rounded-full bg-c_FF9500"}></div>
          )}
          {dayData.available && (
            <div className={"!w-[8px] !h-[8px] rounded-full bg-c_34C759"}></div>
          )}
        </div>
      );
    }
  };

  return (
    <div className={"flex-1"}>
      <div className={"flex justify-between items-center"}>
        <h1
          className={"font-outfit_semiBold text-xl leading-[32px] text-black"}
        >
          {moment(viewDate).format("YYYY")}
        </h1>
        <div className={"flex items-center gap-4"}>
          {/* <Button
            onClick={handlePrevMonth}
            // title={<ChevronLeftIcon width={20} height={20} strokeWidth={3} />}
            className={"!w-9 !h-9 flex items-center justify-center"}
          /> */}
          <Button
            onClick={handlePrevMonth}
            title={<img src={ChevronLeftLight} alt='Delete Icon' />}
            img={ChevronLeftLight}
            imgClassName={"!w-[20px] !h-[20px]"}
            className={`!w-9 !h-9 flex items-center bg-c_primary justify-center`}
          />
          <Button
            onClick={handleNextMonth}
            title={<img src={ChevronRightLight} alt='Delete Icon' />}
            img={ChevronRightLight}
            imgClassName={"!w-[20px] !h-[20px]"}
            className={`!w-9 !h-9 flex items-center bg-c_primary justify-center`}
          />
          {/* <Button
            onClick={handleNextMonth}
            img={}
            className={"!w-9 !h-9 flex items-center justify-center"}
          /> */}
        </div>
      </div>
      <p
        className={
          "font-outfit_semiBold text-fs_16 text-base leading-[32px] text-c_3C4045"
        }
      >
        {moment(viewDate).format("MMMM YYYY")}
      </p>
      <div
        className={
          "flex justify-end text-fs_14 font-outfit_medium items-center"
        }
      >
        <div className={"flex items-center gap-2"}>
          <div className={"flex items-center gap-2"}>
            <div className={"w-[13px] h-[13px] rounded-full bg-c_FF9500"}></div>
            <Paragraph>Booked</Paragraph>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-[13px] h-[13px] rounded-full bg-c_34C759'></div>
            <Paragraph>Available</Paragraph>
          </div>
        </div>
      </div>
      <Calendar
        calendarType={"gregory"}
        next2Label={null}
        onChange={setDate}
        value={date}
        showNeighboringMonth={false}
        className={"!w-full !h-full !bg-transparent !border-none"}
        onActiveStartDateChange={({ activeStartDate }) => {
          setViewDate(activeStartDate);
        }}
        onClickDay={(value, event) => {
          const clickedDate = moment(value).format("YYYY-MM-DD");
          const dayData = dateData[clickedDate];
          callBackGetBookedDetail(dayData?.id);
        }}
        activeStartDate={viewDate}
        tileContent={tileContent}
      />
    </div>
  );
};

export default Calender;
