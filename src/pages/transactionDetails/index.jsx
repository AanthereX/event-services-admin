/** @format */

import { useLocation, useParams } from "react-router-dom";
import Container from "../../layout/container";
import labels from "../../locale";
import BackArrowButton from "../../components/molecules/backArrowButton";
import Paragraph from "../../components/atoms/paragraph";
import TransactionDetailsHeader from "../../components/organisms/transactionDetailsHeader";
import TransactionTable from "../../components/organisms/tables/transactionTable";

const TransactionDetails = () => {
  const { transactionDetails } = labels;
  const location = useLocation();
  const params = useParams();

  return (
    <Container>
      <BackArrowButton />

      <div className={"px-6 pt-6"}>
        <div
          className={
            "w-full flex flex-row flex-wrap tems-center justify-between"
          }
        >
          <Paragraph
            className={
              "text-fs_28 md:text-fs_32 text-black font-outfit_semiBold leading-[14px]"
            }
          >
            {transactionDetails}
          </Paragraph>
        </div>

        <TransactionDetailsHeader
          status={location?.state?.status}
          transactionID={location?.state?.requestId}
          eventTitle={location?.state?.eventName}
          provider={location?.state?.provider}
          eventDates={location?.state?.slots}
          timeStamp={location?.state?.timeStamp}
          timeStampEnd={location?.state?.timeStampEnd}
        />

        <TransactionTable data={location?.state?.costing} />
      </div>
    </Container>
  );
};

export default TransactionDetails;
