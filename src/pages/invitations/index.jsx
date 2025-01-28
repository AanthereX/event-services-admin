/** @format */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../layout/container";
import labels from "../../locale";
import InvitationsCard from "../../components/molecules/invitationsCard";
import Heading from "../../components/atoms/heading";
import Button from "../../components/atoms/button";
import { Icons } from "../../assets/icons";
import Modal from "../../components/molecules/modal";
import InvitationModal from "../../components/organisms/modals/invitationModal/InvitationModal";
import {
  useLazyGetAllInvitationsQuery,
  useLazyGetInvitationMonetaryGiftsQuery,
} from "../../services/invitationService";
import { useDispatch, useSelector } from "react-redux";
import {
  getInvitationList,
  getPageData,
  removeInvitationsList,
  setInvitationList,
  setMonetaryGiftsList,
  removeMonetaryGiftsList,
  getMonetaryGiftPageData,
  getMonetaryGiftsList,
} from "../../store/slices/invitation.slice";
import ApiLoader from "../../components/loaders/apiLoader";
import LoadMoreData from "../../components/loaders/loadMoreDataPagination";
import MonetaryGiftCard from "../../components/molecules/monetaryGiftCard";
const { invitations } = labels;

const Invitations = () => {
  const dispatch = useDispatch();
  const [sendInvitation, setSendInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loaderGetMonetaryGifts, setLoaderGetMonetaryGifts] = useState(false);
  const [allInvitations, setAllInvitations] = useState([]);
  const [allMonetaryGifts, setAllMonetaryGifts] = useState([]);
  const [count, setCount] = useState(0);
  const [countMonetaryGifts, setCountMonetaryGifts] = useState(0);
  const [selected, setSelected] = useState(null);
  const pageData = useSelector(getPageData);
  const pageDataMonetaryGift = useSelector(getMonetaryGiftPageData);
  const invitationDataList = useSelector(getInvitationList);
  const monetaryDataList = useSelector(getMonetaryGiftsList);
  const [showMonetaryGiftModal, setShowMonetaryGiftModal] = useState(null);

  const [getAllInvitations, { isLoading, isFetching, isError }] =
    useLazyGetAllInvitationsQuery();
  const [
    getInvitationMonetaryGifts,
    {
      isLoading: loadingGetMonetaryGifts,
      isFetching: isFetchingGetMonetaryGifts,
      isError: isErrorGetMonetaryGifts,
    },
  ] = useLazyGetInvitationMonetaryGiftsQuery();

  const monetaryGiftData = useMemo(() => {
    return {
      listing: monetaryDataList || [],
      countEnd: monetaryDataList?.length || 0,
      loading: loaderGetMonetaryGifts,
    };
  }, [monetaryDataList, loaderGetMonetaryGifts]);

  const handlerGetMonetaryGiftsById = useCallback(async (page, _id) => {
    try {
      setLoaderGetMonetaryGifts(true);
      if (page === 1) {
        dispatch(removeMonetaryGiftsList());
      }
      const response = await getInvitationMonetaryGifts({
        page,
        id: _id,
      }).unwrap();
      if (!!response) {
        setCountMonetaryGifts(response.data?.count);
        setAllMonetaryGifts(response?.data?.monetaryGift);
        dispatch(
          setMonetaryGiftsList({
            data: response.data?.monetaryGift,
            meta: {
              currentPage: page,
              totalItems: response.data?.count,
              itemCount: response.data?.count,
              itemsPerPage: 9,
              totalPages:
                (response.data?.count / 9) % 1 !== 0
                  ? parseInt(response.data?.count / 9) + 1
                  : parseInt(response.data?.count / 9),
            },
          }),
        );
      }
    } catch (error) {
      console.log(error?.message || error?.data?.message);
    } finally {
      setLoaderGetMonetaryGifts(false);
    }
  }, []);

  const getAllInvitationsData = useCallback(async (page) => {
    try {
      setLoading(true);
      if (page === 1) {
        dispatch(removeInvitationsList());
      }
      const response = await getAllInvitations({
        page,
      }).unwrap();
      setAllInvitations(response.data?.invitationCards);
      setCount(response.data?.count);
      dispatch(
        setInvitationList({
          data: response.data?.invitationCards,
          meta: {
            totalItems: response.data?.count,
            itemCount: response.data?.count,
            itemsPerPage: 9,
            totalPages:
              (response.data?.count / 9) % 1 !== 0
                ? parseInt(response.data?.count / 9) + 1
                : parseInt(response.data?.count / 9),
            currentPage: page,
          },
        }),
      );
    } catch (error) {
      console.log(error?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreHandler = () => {
    const nextPage = (pageData?.currentPage || 0) + 1;
    if (nextPage <= pageData?.totalPages) {
      getAllInvitationsData(nextPage);
    }
  };

  const loadMoreMonetaryGiftHandler = (_id) => {
    const nextPage = (pageDataMonetaryGift?.currentPage || 0) + 1;
    if (nextPage <= pageDataMonetaryGift?.totalPages) {
      handlerGetMonetaryGiftsById(nextPage, _id);
    }
  };

  useEffect(() => {
    getAllInvitationsData(1);
  }, []);

  return (
    <Container>
      <div className={"mb-6 flex justify-between items-center pt-5 px-5"}>
        <Heading className={"md:text-fs_32 text-fs_24"}>{invitations}</Heading>
        <Button
          img={Icons.Download}
          disabled={loading}
          label={"Export"}
          className={`flex justify-center !text-white  items-center !w-auto !bg-c_primary !py-2 px-4`}
        />
      </div>
      {/* <ApiLoader block={false}> */}
      <div
        className={
          "grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-3 p-3 mb-5"
        }
      >
        {invitationDataList?.map((invitation, idx) => {
          return (
            <InvitationsCard
              key={idx}
              data={invitation}
              pageData={pageDataMonetaryGift}
              isLoading={loaderGetMonetaryGifts}
              currentId={invitation?.invitation_id}
              onNextClick={handlerGetMonetaryGiftsById}
              showMonetaryGiftModal={showMonetaryGiftModal}
              setShowMonetaryGiftModal={setShowMonetaryGiftModal}
              totalMonetaryGiftCount={monetaryGiftData?.countEnd}
            />
          );
        })}
      </div>
      {/* </ApiLoader> */}

      {pageData?.currentPage >= pageData?.totalPages
        ? null
        : pageData?.itemCount > 9 && (
            <LoadMoreData
              loading={loading}
              label={"Load More"}
              labelClassName={""}
              color={"#66A5C4"}
              height={48}
              width={48}
              onClick={loadMoreHandler}
              disabled={
                pageData?.currentPage >= pageData?.totalPages ? true : false
              }
            />
          )}

      {showMonetaryGiftModal ? (
        <Modal
          isOpen={showMonetaryGiftModal}
          closeModal={() => setShowMonetaryGiftModal(false)}
          containerClassName={"!w-[440px]"}
          title={null}
          content={
            <MonetaryGiftCard
              showBorder={false}
              selected={showMonetaryGiftModal}
              listing={monetaryGiftData?.listing}
              countEnd={monetaryGiftData?.countEnd}
              loading={loaderGetMonetaryGifts}
              pageData={pageDataMonetaryGift}
              loadMoreMonetaryGiftHandler={loadMoreMonetaryGiftHandler}
            />
          }
        />
      ) : null}

      <Modal
        isOpen={sendInvitation !== null ? true : false}
        closeModal={() => setSendInvitation(null)}
        containerClassName={"!w-[461px]"}
        title={invitations}
        content={
          <InvitationModal
            data={sendInvitation}
            setSendInvitation={setSendInvitation}
          />
        }
      />
    </Container>
  );
};

export default Invitations;
