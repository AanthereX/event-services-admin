/** @format */

import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Paragraph from "../../components/atoms/paragraph";
import labels from "../../locale";
import VendorsDetailsHeader from "../../components/organisms/vendorsDetailsHeader";
import Divider from "../../components/atoms/divider";
import VenueTable from "../../components/organisms/tables/venueTable";
import ServiceTable from "../../components/organisms/tables/servicesTable";
import Container from "../../layout/container";
import BackArrowButton from "../../components/molecules/backArrowButton";
import Button from "../../components/atoms/button";
import StatisticGraph from "../../components/organisms/statsGraphTab";
import {
  useLazyGetVendorByIdQuery,
  useLazyGetVendorServicesByIdQuery,
  useLazyGetVendorVenuesByIdQuery,
  useUpdateVendorStatusMutation,
} from "../../services/vendorService";
import ApiLoader from "../../components/loaders/apiLoader";
import { toast } from "sonner";
import { Icons } from "../../assets/icons";
import DialogModal from "../../components/organisms/modals/confirmationDialog";
import Modal from "../../components/molecules/modal";
import { useVenueVisibilityMutation } from "../../services/venues";
import { useProviderServiceVisibilityMutation } from "../../services/providerService";

const VendorDetail = () => {
  const { TickConfirmationIcon, CrossConfirmationIcon } = Icons;
  const location = useLocation();
  const params = useParams();
  const vendorId = location.state?.data?.id || params?.id;
  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState([]);
  const [page, setPage] = useState(1);
  const [venues, setVenues] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedActivity, setSelectedAactivity] = useState("venues");
  const [loaderGetVenues, setLoaderGetVenues] = useState(true);
  const [loaderGetServices, setLoaderGetServices] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);

  const [getVendorById, { isLoading, isFetching, isError }] =
    useLazyGetVendorByIdQuery();
  const [
    updateVendorStatus,
    {
      isLoading: isLoadingUpdateStatus,
      isFetching: updateStatusFetching,
      isError: updateStatusIsError,
    },
  ] = useUpdateVendorStatusMutation();
  const [
    getVendorVenuesById,
    { isLoading: loadingGetVendorVenues, isFetching: fetchingVendorVenues },
  ] = useLazyGetVendorVenuesByIdQuery();
  const [
    getVendorServicesById,
    { isLoading: loadingGetVendorServices, isFetching: fetchingVendorServices },
  ] = useLazyGetVendorServicesByIdQuery();
  const [
    venueVisibility,
    {
      isLoading: isLoadingToggleVisibility,
      isFetching: toggleVisibilityFetching,
      isError: toggleVisibilityIsError,
    },
  ] = useVenueVisibilityMutation();
  const [
    providerServiceVisibility,
    {
      isLoading: isLoadingToggleVisibilityForService,
      isFetching: toggleVisibilityFetchingForService,
      isError: toggleVisibilityIsErrorForService,
    },
  ] = useProviderServiceVisibilityMutation();

  const statusUpdateConfirmationOptions = [
    {
      id: 1,
      label: labels.cancel,
      variant: "primary-outline",
      size: "md",
      loader: null,
      action: () => {
        setShowStatusUpdateModal(false);
      },
    },
    {
      id: 2,
      label: labels.confirm,
      variant: "primary",
      size: "md",
      loader: isLoadingUpdateStatus,
      action: () => {
        handlerUpdateVendorStatus(selected?.id, selected?.status);
      },
    },
  ];

  const handlerGetVendorDetailsById = useCallback(async (_vendorId) => {
    try {
      const response = await getVendorById({ id: _vendorId }).unwrap();
      if (!!response) {
        setVendorData(response?.data);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleVisibilityForVenue = async (_id) => {
    try {
      const response = await venueVisibility({
        id: _id,
      }).unwrap();
      if (!response) return;
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleToggleVisibilityForService = async (_id) => {
    try {
      const response = await providerServiceVisibility({
        id: _id,
      }).unwrap();
      if (!response) return;
      toast.success(response?.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  const handlerUpdateVendorStatus = useCallback(async (_id, _status) => {
    try {
      const payload = { status: _status };
      const response = await updateVendorStatus({
        id: _id,
        body: payload,
      }).unwrap();
      if (!!response) {
        toast.success(response?.message);
        setShowStatusUpdateModal(false);
        handlerGetVendorDetailsById(vendorId);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  }, []);

  const handlerGetVendorVenuesById = useCallback(async (page, _vendorId) => {
    try {
      const response = await getVendorVenuesById({
        page,
        id: _vendorId,
      }).unwrap();
      if (!!response) {
        setVenues(response?.data?.venues);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoaderGetVenues(false);
    }
  }, []);

  const handlerGetVendorServicesById = useCallback(async (page, _vendorId) => {
    try {
      const response = await getVendorServicesById({
        page,
        id: _vendorId,
      }).unwrap();
      if (!!response) {
        setServices(response?.data?.service);
      }
    } catch (error) {
      console.log(error?.message);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    if (selectedActivity === "services" && services?.length < 1) {
      handlerGetVendorServicesById(page, vendorId);
    }
  }, [
    selectedActivity,
    page,
    vendorId,
    handlerGetVendorServicesById,
    isInitialized,
  ]);

  useEffect(() => {
    handlerGetVendorDetailsById(vendorId);
    handlerGetVendorVenuesById(page, vendorId);
  }, []);

  return (
    <Container>
      <ApiLoader block={loading || loaderGetVenues}>
        <Fragment>
          <BackArrowButton />
          <div className={"px-6 py-3"}>
            <VendorsDetailsHeader
              selected={selected}
              setSelected={setSelected}
              data={vendorData}
              showStatusUpdateModal={showStatusUpdateModal}
              setShowStatusUpdateModal={setShowStatusUpdateModal}
            />
          </div>

          <div className={"px-6 flex flex-col"}>
            <Divider />
            <div className={"mb-10"}>
              <Button
                label={labels.venues}
                onClick={() => setSelectedAactivity("venues")}
                className={`rounded-none rounded-bl-md !w-fit !px-8 ${
                  selectedActivity === "venues"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />

              <Button
                label={labels.services}
                onClick={() => setSelectedAactivity("services")}
                className={`rounded-none rounded-br-md !w-fit !px-8 ${
                  selectedActivity === "services"
                    ? "bg-c_primary text-white"
                    : "!text-c_818181 !bg-c_EAEAEA"
                }`}
              />
            </div>
            {selectedActivity == "venues" ? (
              <div className={"pt-4 border border-c_D1D1D1 rounded-[16px]"}>
                <div className="px-4">
                  <Paragraph
                    className={
                      "font-outfit_semiBold text-fs_24 md:text-fs_32 leading-[40px]"
                    }
                  >
                    {labels.venues}
                  </Paragraph>
                </div>
                <VenueTable
                  data={venues}
                  onStatusChange={handleToggleVisibilityForVenue}
                  loading={loadingGetVendorVenues}
                />
              </div>
            ) : (
              <div className={"py-4 border border-c_D1D1D1 rounded-[16px]"}>
                <div className={"px-4"}>
                  <Paragraph
                    className={
                      "font-outfit_semiBold text-fs_24 md:text-fs_32 leading-[40px]"
                    }
                  >
                    {labels.services}
                  </Paragraph>
                </div>
                <ServiceTable
                  data={services}
                  onStatusChange={handleToggleVisibilityForService}
                  loading={loadingGetVendorServices}
                />
              </div>
            )}

            <div className={"w-full mt-8 border border-c_D9D9D9 rounded-xl"}>
              <StatisticGraph />
            </div>
          </div>
        </Fragment>
      </ApiLoader>

      {showStatusUpdateModal && (
        <Modal
          isOpen={showStatusUpdateModal}
          closeModal={() => setShowStatusUpdateModal(false)}
          containerClassName={"!w-[461px]"}
          title={null}
          content={
            <DialogModal
              modalImg={
                selected?.status === "accepted"
                  ? TickConfirmationIcon
                  : CrossConfirmationIcon
              }
              modalImgAlt={
                selected?.status === "accepted" ? "tickIcon" : "crossIcon"
              }
              modalImgClassName={""}
              btnOptions={statusUpdateConfirmationOptions}
              title={labels.areYouSure}
              tagline={
                selected?.status === "accepted"
                  ? labels.youWantToAcceptTheVendorStatus
                  : labels.youWantToRejectTheVendorStatus
              }
            />
          }
        />
      )}
    </Container>
  );
};

export default VendorDetail;
