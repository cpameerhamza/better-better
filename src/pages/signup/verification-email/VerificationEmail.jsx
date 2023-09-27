import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import gifEmail from "../../../assets/images/email.gif";
import { resendVerifcationEmail } from "../../../redux/thunks/Thunks";
import "./verificationEmail.css";

const VerificationEmail = ({ formKeys }) => {
  const dispatch = useDispatch();
  const resendEmail = () => {
    dispatch(resendVerifcationEmail({ email: formKeys?.email })).then(
      (response) => {
        if (response.payload.status === false) {
          toast.error("Something went wrong, Please try again.");
        } else {
          toast.success("Verification email sent again.");
        }
      }
    );
    console.log("resend called.");
  };
  return (
    <>
      <section className="verification__email d__flex d__flex-h-center d__flex-v-center">
        <div className="verification__email-box">
          <div className="verification__email-gif">
            <img src={gifEmail} alt={"#"} />
          </div>
          <h1>Verification Email Sent</h1>
          <p>
            Your profile request has been sent to our administrators for
            approval. Keep an eye on your email. We are working hard to get this
            done.
          </p>
          <div className="form__group full__field logout__btn">
            <Link to="/login" className="signup__next-btn full__field">
              Login
            </Link>
          </div>
          <p className="d__flex d__flex-h-center d__flex-v-center send__mail-again">
            Didn’t receive email?
            <button onClick={resendEmail}>Send Again</button>
          </p>
        </div>
      </section>
    </>
  );
};

export default VerificationEmail;
