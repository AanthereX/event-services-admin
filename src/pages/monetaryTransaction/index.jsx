/** @format */

import { useState } from "react";
import { Icons } from "../../assets/icons";
import PageHeader from "../../components/organisms/pageHeader";
import Container from "../../layout/container";
import labels from "../../locale";
import { PaymentStatus } from "../../constants";
import TransactionHistoryTable from "../../components/organisms/tables/transactionHistoryTable";
import MonetaryTransactionHistoryTable from "../../components/organisms/tables/monetaryTransactionHistoryTable";

const MonetaryTransaction = () => {
  const { addNew, search, monetaryTransactionHistory } = labels;
  const { PlusIcon } = Icons;
  const [searchInputValue, setSearchInputValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("services");
  const [dateSelected, setDateSelected] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <Container>
      <PageHeader
        title={monetaryTransactionHistory}
        titleClassName={"!text-fs_24"}
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

      <MonetaryTransactionHistoryTable
        pageData={null}
        // setEdit={setEditNewBadge}
        // setShowDeleteModal={setShowDeleteModal}
      />
    </Container>
  );
};

export default MonetaryTransaction;
