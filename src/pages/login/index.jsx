/** @format */

import { useState } from "react";
import LoginForm from "../../components/molecules/forms/loginForm";
import ResetPasswordForm from "../../components/molecules/forms/resetPasswordForm";
import AuthFlowLayout from "../../layout/authFlowLayout";

const Login = () => {
  const [activeFlow, setActiveFlow] = useState("login");
  const [step, setStep] = useState(0);

  const renderComponent = (active = "login") => {
    switch (active) {
      case "login":
        return (
          <LoginForm activeFlow={activeFlow} setActiveFlow={setActiveFlow} />
        );
      case "resetpassword":
        return (
          <ResetPasswordForm
            step={step}
            setStep={setStep}
            activeFlow={activeFlow}
            setActiveFlow={setActiveFlow}
          />
        );
      default:
        break;
    }
  };

  return <AuthFlowLayout>{renderComponent(activeFlow)}</AuthFlowLayout>;
};

export default Login;
