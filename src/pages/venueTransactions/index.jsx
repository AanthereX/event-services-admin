/** @format */

import { useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import { PaymentStatus } from "../../constants";
import TransactionHistoryTable from "../../components/organisms/tables/transactionHistoryTable";
import VenueTransactionHistoryTable from "../../components/organisms/tables/venueTransactionHistoryTable";

const VenueTransaction = () => {
  const { addNew, search, venueTransactionHistory } = labels;
  const { PlusIcon } = Icons;
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("services");
  const [dateSelected, setDateSelected] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <Container>
      <PageHeader
        title={venueTransactionHistory}
        titleClassName={"!text-fs_24"}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
        firstBadgeAction={addNew}
        placeholderText={search}
        badgeIcon={PlusIcon}
        setFirstBadgeAction={() => setAddNewBadge((prev) => !prev)}
        badgeVisible={false}
        searchWidthFixed={false}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        showTransactionFilterOptions
        paymentStatusOptions={PaymentStatus}
        filter={filter}
        setFilter={setFilter}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />

      <VenueTransactionHistoryTable
        pageData={null}
        // setEdit={setEditNewBadge}
        // setShowDeleteModal={setShowDeleteModal}
      />
    </Container>
  );
};

export default VenueTransaction;
