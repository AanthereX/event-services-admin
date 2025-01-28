/** @format */

import { useState } from "react";
import Image from "../../../atoms/image";
import { Icons } from "../../../../assets/icons";
import Paragraph from "../../../atoms/paragraph";
import labels from "../../../../locale";
import { Controller } from "react-hook-form";
import Input from "../../../atoms/input";
import PasswordInput from "../../passwordInput";
import Button from "../../../atoms/button";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../../utils/validate";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../../services/authService";
import { setLoginData } from "../../../../store/slices/auth.slice";
import { setLocalStorageData } from "../../../../utils";

const LoginForm = ({ activeFlow, setActiveFlow }) => {
  const { logo } = Icons;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login, { isLoading, isError }] = useLoginMutation();

  const loginHandler = async (data) => {
    try {
      setLoading(true);
      const payload = {
        email: data?.email?.toLocaleLowerCase(),
        password: data?.password,
      };
      const response = await login(payload).unwrap();
      dispatch(
        setLoginData({ token: response?.tokenDetails, user: response?.data }),
      );
      setLocalStorageData("user", {
        token: response?.tokenDetails,
        user: response?.data,
      });
      navigate("/dashboard");
      toast.success(response?.message);
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.data?.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <form className={"w-full"} onSubmit={handleSubmit(loginHandler)}>
      <div
        className={
          "login-form md:!w-[460px] !w-[300px] bg-white rounded-2xl md:py-6 md:px-6 py-5 px-5"
        }
      >
        <div className={"flex flex-col items-center justify-between gap-y-0"}>
          <Image
            src={logo}
            alt={"logo"}
            width={75}
            height={71}
            className={"mb-[10px]"}
          />

          <Paragraph
            className={
              "font-outfit_semiBold text-fs_24 md:text-fs_32 leading-[40px]"
            }
          >
            {labels.login}
          </Paragraph>
        </div>

        <div className={"flex flex-col items-center justify-center gap-y-3"}>
          <Controller
            control={control}
            name={"email"}
            render={({ field: { value } }) => {
              return (
                <Input
                  type={"text"}
                  name={"email"}
                  label={labels.emailAddress}
                  className={`w-full font-outfit_regular text-fs_16 placeholder:text-c_535353 text-c_181818 outline-none`}
                  placeholder={labels.emailAddress}
                  error={Boolean(errors?.email)}
                  errorText={errors.email?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("email");
                    setValue("email", e.target.value.replace(/\s/g, ""));
                  }}
                />
              );
            }}
          />
          <Controller
            control={control}
            name={"password"}
            render={({ field: { value } }) => {
              return (
                <PasswordInput
                  name={"password"}
                  label={labels.password}
                  className={`w-full pr-2 font-outfit_regular text-fs_16 placeholder:text-c_535353 text-c_181818 outline-none`}
                  placeholder={labels.password}
                  error={Boolean(errors?.password)}
                  errorText={errors.password?.message}
                  value={value}
                  onChange={(e) => {
                    clearErrors("password");
                    setValue("password", e.target.value.replace(/\s/g, ""));
                  }}
                />
              );
            }}
          />
        </div>

        {/* <Paragraph
          onClick={() => setActiveFlow("resetpassword")}
          className={
            "font-outfit_regular w-fit cursor-pointer select-none text-c_252525 !text-fs_12 mt-2 leading-[22px]"
          }
        >{`${labels.forgetPassword}${labels.questionMark}`}</Paragraph> */}

        <Button
          type={"submit"}
          variant={"primary"}
          size={"xl"}
          isLoading={loading}
          disabled={loading}
          label={labels.login}
          className={"capitalize mt-5 select-none"}
        />
      </div>
    </form>
  );
};

export default LoginForm;
