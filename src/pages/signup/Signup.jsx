import { useState } from "react";
import "../signup/signup.css";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import { SignupFormFields } from "../../utils/formConstants";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentStep, setCurrentStep] = useState(0);
  const [isElder, setIsElder] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const [formKeys, setFormKeys] = useState(SignupFormFields());
  const steps = [
    <StepOne
      formKeys={formKeys}
      setFormKeys={setFormKeys}
      step={setCurrentStep}
      setIsElder={setIsElder}
      isElder={isElder}
    />,
    <StepTwo
      formKeys={formKeys}
      setFormKeys={setFormKeys}
      step={setCurrentStep}
      isElder={isElder}
    />,
    <StepThree
      isElder={isElder}
      formKeys={formKeys}
      setFormKeys={setFormKeys}
      step={setCurrentStep}
      setFormSuccess={setFormSuccess}
    />,
  ];
  return (
    <>
      <div className="auth__logo">
        <Link to="/">
          <img src={logo} />
        </Link>
      </div>
      {formSuccess ? (
        ""
      ) : (
        <header className="signup__header signup-header-container">
          <div className="header__content">
            <div className="signup__title">
              <h2>
                {currentStep === 0 && user?.isInstitute && user?.role_type === 1
                  ? "Register Your Student"
                  : currentStep === 0 &&
                    user?.isInstitute &&
                    user?.role_type === 2
                  ? "Register Your Elderly Person"
                  : currentStep === 0
                  ? "Sign Up"
                  : currentStep === 1
                  ? "Select Student’s interests.."
                  : "Matching questions to ensure you have something in common with your penpal"}
              </h2>
              <p>
                {currentStep === 0 && user?.isInstitute && user?.role_type === 1
                  ? "Please enter student’s credentials to sign up"
                  : currentStep === 0 &&
                    user?.isInstitute &&
                    user?.role_type === 2
                  ? "Please enter elder’s credentials to sign up"
                  : currentStep === 0
                  ? "Please enter your credentials to sign up"
                  : currentStep === 1
                  ? "Select multiple interests to match with your right penpal friend. "
                  : "Please answer these questions, so we can know more of you."}
              </p>
            </div>
            <div className="signup__step d__flex d__flex-h-center text__center">
              <div className="signup__step-number active">
                <span>1</span>
                <p>Create Account</p>
              </div>
              <div
                className={`signup__step-number ${
                  currentStep === 1 || currentStep === 2 ? "active" : ""
                }`}
              >
                <span>2</span>
                <p>Select Interests</p>
              </div>
              <div
                className={`signup__step-number ${
                  currentStep === 2 ? "active" : ""
                }`}
              >
                <span>3</span>
                <p>Submit Answers</p>
              </div>
            </div>
          </div>
        </header>
      )}
      {steps[2]}
    </>
  );
};

export default Signup;
