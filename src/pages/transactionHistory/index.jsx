/** @format */

import { useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import { PaymentStatus } from "../../constants";
import TransactionHistoryTable from "../../components/organisms/tables/transactionHistoryTable";

const TransactionHistory = () => {
  const { addNew, search, transactionHistory } = labels;
  const { PlusIcon } = Icons;
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("services");
  const [dateSelected, setDateSelected] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <Container>
      <PageHeader
        title={transactionHistory}
        badgeTitle={addNew}
        searchValue={searchInputValue}
        setSearchValue={setSearchInputValue}
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

      <TransactionHistoryTable
        pageData={null}
        // setEdit={setEditNewBadge}
        // setShowDeleteModal={setShowDeleteModal}
      />
    </Container>
  );
};

export default TransactionHistory;
