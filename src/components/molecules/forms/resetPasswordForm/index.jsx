/** @format */

import React, { useState } from "react";
import ResetPasswordStepOne from "../resetPasswordStepOne";
import ResetPasswordStepTwo from "../resetPasswordStepTwo";
import ResetPasswordStepThree from "../resetPasswordStepThree";
import ResetPasswordStepFour from "../resetPasswordStepFour";
import Button from "../../../atoms/button";
import labels from "../../../../locale";
import Image from "../../../atoms/image";
import { Icons } from "../../../../assets/icons";
import { useForgetPasswordMutation } from "../../../../services/authService";

const ResetPasswordForm = ({ step, setStep, activeFlow, setActiveFlow }) => {
  const { CrossIconWithBorder } = Icons;
  const [values, setValues] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    newPassword: null,
    confirmNewPassword: null,
  });

  const [forgetPasswordSendEmail, { isLoading, isError }] =
    useForgetPasswordMutation();

  const handlerForgetPasswordSendEmail = async (_setStep) => {
    try {
      const payload = {
        email: values?.email.toLocaleLowerCase(),
      };
      const response = await forgetPasswordSendEmail(payload).unwrap();

      if (!!response) {
        _setStep((prev) => prev + 1);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleOnClickNextButton = (
    _step,
    _setStep,
    _activeFlow,
    _setActiveFlow,
  ) => {
    if (_step === 0) {
      handlerForgetPasswordSendEmail(_setStep);
    }
  };

  return (
    <div
      className={
        "reset-password-form md:!w-[460px] !w-[300px] bg-white rounded-2xl md:py-6 md:px-6 py-5 px-5"
      }
    >
      {step === 1 || step === 3 ? (
        <div
          className={"flex justify-end cursor-pointer"}
          onClick={() => {
            setActiveFlow("login");
            setStep(0);
          }}
        >
          <Image
            src={CrossIconWithBorder}
            width={32}
            height={32}
            alt={"crossicon"}
            draggable={false}
            className={"!h-[32px] !w-[32px]"}
          />
        </div>
      ) : null}

      {step === 0 ? (
        <ResetPasswordStepOne
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          setStep={setActiveFlow}
        />
      ) : step === 1 ? (
        <ResetPasswordStepTwo
          step={step}
          setStep={setStep}
          activeFlow={activeFlow}
          setActiveFlow={setActiveFlow}
        />
      ) : step === 2 ? (
        <ResetPasswordStepThree
          values={values}
          setValues={setValues}
          setStep={setStep}
          errors={errors}
          setErrors={setErrors}
        />
      ) : step === 3 ? (
        <ResetPasswordStepFour
          step={step}
          setStep={setStep}
          activeFlow={activeFlow}
          setActiveFlow={setActiveFlow}
        />
      ) : (
        <></>
      )}

      <Button
        variant={"primary"}
        size={"xl"}
        label={
          step === 0
            ? labels.resetPassword
            : step === 2
            ? labels.updatePassword
            : labels.done
        }
        onClick={() =>
          handleOnClickNextButton(step, setStep, activeFlow, setActiveFlow)
        }
        disabled={step === 3}
        className={"capitalize mt-5 select-none"}
      />
    </div>
  );
};

export default ResetPasswordForm;
