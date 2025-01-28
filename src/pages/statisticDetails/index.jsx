/** @format */

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../layout/container";
import BackArrowButton from "../../components/molecules/backArrowButton";
import Heading from "../../components/atoms/heading";
import labels from "../../locale";
import DetailsFeild from "../../components/molecules/detailsFeild";
import Image from "../../components/atoms/image";
import { Icons } from "../../assets/icons";
import Paragraph from "../../components/atoms/paragraph";
import Divider from "../../components/atoms/divider";
import Button from "../../components/atoms/button";
import StatisticGraph from "../../components/organisms/statsGraphTab";
import CustomViewForm from "../../components/molecules/forms/customViewForm";
import Modal from "../../components/molecules/modal";
import DefaultViewForm from "../../components/molecules/forms/defaultViewForm";

const StatisticsDetails = ({ type }) => {
  const location = useLocation();
  const pageData = location.state;
  const [exportData, setExportData] = useState(false);
  const [profit, setProfit] = useState(true);
  const [selectedView, setSelectedView] = useState("none");
  const [selectedActivity, setSelectedAactivity] = useState({
    label: "Weekly",
    value: "weekly",
  });

  return (
    <Container>
      <BackArrowButton />
      <div className={"px-6 py-3"}>
        <div className={"flex items-center justify-between"}>
          <Heading className={"md:text-fs_32 text-fs_24"}>
            {`${pageData.type} ${labels.details}`}
          </Heading>
          <div className={"relative w-[120px] flex justify-end"}>
            <Button
              onClick={() => setExportData((prev) => !prev)}
              img={Icons.Download}
              label={"Export"}
              className={
                "flex justify-center !text-white items-center !w-auto !bg-c_primary !py-2 px-4"
              }
            />
            {exportData ? (
              <div
                className={
                  "border mt-1 absolute right-0 top-9 transition-all p-2 text-c_565656 rounded-[6px] text-[16px] w-full"
                }
              >
                <div
                  onClick={() => {
                    setSelectedView("default");
                    setExportData(false);
                  }}
                  className={"cursor-pointer"}
                >
                  <Paragraph className="md:!text-fs_16 text-fs_12 pt-1 py-3 text-center">
                    {labels.defaultView}
                  </Paragraph>
                </div>
                <Divider />
                <div
                  onClick={() => {
                    setSelectedView("custom");
                    setExportData(false);
                  }}
                  className={"cursor-pointer"}
                >
                  <Paragraph className="md:!text-fs_16 text-fs_12 pt-1 py-3 text-center">
                    {labels.customView}
                  </Paragraph>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-6">
          <Heading className="md:text-fs_24 text-fs_16 font-outfit_medium">
            {pageData?.data?.name}
          </Heading>

          <div className="flex items-center gap-8 flex-wrap py-4 mb-4">
            <DetailsFeild
              //   image={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
              title={labels.overallBookings}
              description={pageData?.data?.totalBookings}
              descriptionStyle="font-outfit_semiBold"
            />
            <div className="h-[50px] w-[1px] bg-c_DFDFDF sm:block hidden"></div>
            <DetailsFeild
              title={labels.totalRevenue}
              description={pageData?.data?.totalRevenue}
              descriptionStyle="font-outfit_semiBold"
            />
            <div className="h-[50px] w-[1px] bg-c_DFDFDF  sm:block hidden"></div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="bg-c_34C75929 flex items-center justify-center py-3 px-[2px] rounded">
                  <Image
                    src={!!profit ? Icons.ProfitStats : Icons.LossIcon}
                    alt={!!profit ? "profiticon" : "lossicon"}
                    className={"inline-block mx-2 select-none"}
                    draggable={false}
                  />
                </div>
                <Paragraph className="text-c_747474">
                  <span className="font-outfit_semiBold text-black">8.5% </span>{" "}
                  Up from Last Week
                </Paragraph>
              </div>{" "}
              <div className="flex items-center gap-2">
                <div className="bg-[#34C75929] flex items-center justify-center py-3 px-[2px] rounded">
                  <Image
                    src={!!profit ? Icons.ProfitStats : Icons.LossIcon}
                    alt={!!profit ? "profiticon" : "lossicon"}
                    className={"inline-block mx-2 select-none"}
                    draggable={false}
                  />
                </div>
                <Paragraph className="text-c_747474">
                  <span className="font-outfit_semiBold text-black">8.5% </span>{" "}
                  Up from Last Week
                </Paragraph>
              </div>
            </div>
            {/* <div className="h-[50px] w-[1px] bg-c_DFDFDF  sm:block hidden"></div> */}
          </div>

          <Divider />
          <div>
            <Button
              label={labels.weekly}
              onClick={() =>
                setSelectedAactivity({
                  label: "Weekly",
                  value: "weekly",
                })
              }
              className={`rounded-none rounded-bl-md   !w-fit !px-8 ${
                selectedActivity.value === "weekly"
                  ? "bg-c_primary text-white"
                  : "!text-c_818181 !bg-c_EAEAEA"
              }`}
            />
            <Button
              label={labels.monthly}
              onClick={() =>
                setSelectedAactivity({
                  label: "Monthly",
                  value: "monthly",
                })
              }
              className={`rounded-none !w-fit !px-8 ${
                selectedActivity.value === "monthly"
                  ? "bg-c_primary text-white"
                  : "!text-c_818181 !bg-c_EAEAEA"
              }`}
            />
            <Button
              onClick={() =>
                setSelectedAactivity({
                  label: "Yearly",
                  value: "yearly",
                })
              }
              label={labels.yearly}
              className={`rounded-none rounded-br-md  !w-fit !px-8 ${
                selectedActivity?.value === "yearly"
                  ? "bg-c_primary text-white"
                  : "!text-c_818181 !bg-c_EAEAEA"
              }`}
            />
          </div>

          <div className={"w-full mt-8 border border-c_D9D9D9 rounded-xl"}>
            <StatisticGraph
              selectedItem={selectedActivity}
              setSelectedItem={setSelectedAactivity}
            />
          </div>
        </div>

        {selectedView == "default" ? (
          <Modal
            isOpen={selectedView == "default"}
            closeModal={() => setSelectedView("none")}
            containerClassName={"!max-w-[700px] !w-[501px]"}
            title={labels.defaultView}
            content={<DefaultViewForm />}
          />
        ) : selectedView == "custom" ? (
          <Modal
            isOpen={selectedView == "custom"}
            closeModal={() => setSelectedView("none")}
            containerClassName={"!max-w-[700px] !w-[501px]"}
            title={labels.customView}
            //   containerClassName={"max-w-[600px]"}
            //   description={labels.sedUtPerspiciatis}
            content={<CustomViewForm />}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default StatisticsDetails;
