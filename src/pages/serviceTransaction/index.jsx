/** @format */

import { useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import { PaymentStatus } from "../../constants";
import TransactionHistoryTable from "../../components/organisms/tables/transactionHistoryTable";
import ServiceTransactionHistoryTable from "../../components/organisms/tables/serviceTransactionHistoryTable";

const ServiceTransaction = () => {
  const { addNew, search, serviceTransactionHistory } = labels;
  const { PlusIcon } = Icons;
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("services");
  const [dateSelected, setDateSelected] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <Container>
      <PageHeader
        title={serviceTransactionHistory}
        titleClassName={"!text-fs_24"}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        count={223}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
        badgeVisible={false}
        selectedTab={selectedTab}
        searchWidthFixed={false}
        setSelectedTab={setSelectedTab}
        showTransactionFilterOptions
        paymentStatusOptions={PaymentStatus}
        filter={filter}
        setFilter={setFilter}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />

      <ServiceTransactionHistoryTable
        pageData={null}
        // setEdit={setEditNewBadge}
        // setShowDeleteModal={setShowDeleteModal}
      />
    </Container>
  );
};

export default ServiceTransaction;
