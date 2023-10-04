import "./contact.css";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ctaBtnIcon,
  twitterIcon,
  facebookIcon,
  instagramIcon,
  githubIcon,
} from "../../utils/SvgIcons";
import Toaster from "../../utils/Toaster";
import { contactUs } from "../../redux/thunks/Thunks";
import { toast } from "react-toastify";
import { ContactFormFields } from "../../utils/formConstants";
import { contactSchema } from "../../utils/validationSchemas/authSchema";

const Contact = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [nav, setNav] = useState(false);
  const showNav = (e) => {
    setNav(!nav);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    values,
    handleBlur,
    touched,
    handleChange,
    errors,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: ContactFormFields(),
    validationSchema: contactSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(contactUs(values)).then((response) => {
        setLoading(false);
        if (response?.payload.message === "Email sent successfully") {
          resetForm();
          toast.success("Thank you for contacting us.");
        } else {
          // toast.error("Something went wrong. Kindly try again.");
          toast.error(response?.payload.message);
        }
      });
    },
  });
  return (
    <>
      <header className="landing__header">
        <div className="site__container">
          <div className="landing__header-content d__flex d__flex-h-between d__flex-v-center">
            <div className="landing__header-logo">
              <NavLink to="/">
                <img src={Logo} alt="Better Letter" />
              </NavLink>
            </div>
            <div className={`landing__header-menu`}>
              <ul className="landing__header-items d__flex d__flex-v-center gap-1">
                <li className="landing__header-item">
                  <HashLink to="/">Home</HashLink>
                </li>
                <li className="landing__header-item ">
                  <HashLink to="/about">About Us</HashLink>
                </li>
                <li className="landing__header-item active">
                  <HashLink to="/contact">Contact</HashLink>
                </li>
                <li className="landing__header-item">
                  <HashLink to="/#faq">FAQ</HashLink>
                </li>
              </ul>
              <div className="mobile-header-cta">
                {user ? (
                  <NavLink
                    to={`${
                      !user?.isInstitute
                        ? "/dashboard"
                        : user?.isInstitute
                        ? "/institute-dashboard"
                        : "/signup"
                    }`}
                    className="cta__btn"
                  >
                    Get Started
                    {ctaBtnIcon()}
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="signup" className="cta__btn">
                      Signup
                      {ctaBtnIcon()}
                    </NavLink>
                    <NavLink to="login" className="cta__btn">
                      Login
                      {ctaBtnIcon()}
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            <div className="header__cta d__flex">
              {user ? (
                <NavLink
                  to={`${
                    !user?.isInstitute
                      ? "/dashboard"
                      : user?.isInstitute
                      ? "/institute-dashboard"
                      : "/signup"
                  }`}
                  className="cta__btn"
                >
                  Get Started
                  {ctaBtnIcon()}
                </NavLink>
              ) : (
                <>
                  <NavLink to="/signup" className="cta__btn">
                    Signup
                    {ctaBtnIcon()}
                  </NavLink>
                  <NavLink to="/login" className="cta__btn">
                    Login
                    {ctaBtnIcon()}
                  </NavLink>
                </>
              )}
            </div>
            <button
              className={`humbuger ${nav == true ? "active" : ""}`}
              onClick={() => showNav()}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <div className="banner">
        <div className="template">
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="template">
        <div className="contact-cols">
          <div className="text">
            <h1>Let's start a conversation:</h1>
            <h3>See the platform in action</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </p>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              <p className="error-msg">
                {errors.first_name && touched.first_name
                  ? errors.first_name
                  : null}
              </p>
            </div>
            <div className="form-row">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              <p className="error-msg">
                {errors.last_name && touched.last_name
                  ? errors.last_name
                  : null}
              </p>
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="error-msg">
                {errors.email && touched.email ? errors.email : null}
              </p>
            </div>
            <div className="form-row">
              <label htmlFor="contact_number">Contact Number</label>
              <input
                type="text"
                id="contact_number"
                name="contact_number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_number}
              />
              <p className="error-msg">
                {errors.contact_number && touched.contact_number
                  ? errors.contact_number
                  : null}
              </p>
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
              <p className="error-msg">
                {errors.message && touched.message ? errors.message : null}
              </p>
            </div>
            <div className="form-row btn">
              <button
                type="submit"
                className={`signup-btn ${loading || success ? "disabled" : ""}`}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer className="landing__footer">
        <div className="site__container">
          <div className="footer__content">
            <div className="footer__level-one d__flex d__flex-h-between d__flex-v-center">
              <div className="footer__logo">
                <img src={Logo} />
              </div>
              <div className="footer__menu">
                <ul className="footer__menu-list d__flex gap-3">
                  <li>
                    <HashLink to="/">Home</HashLink>
                  </li>
                  <li>
                    <HashLink to="/about">About Us</HashLink>
                  </li>
                  <li>
                    <HashLink to="/contact">Contact</HashLink>
                  </li>
                  <li>
                    <HashLink to="/#faq">FAQ</HashLink>
                  </li>
                </ul>
              </div>
              <div className="footer__social">
                <ul className="footer__social-list d__flex gap-3">
                  <li>
                    <a href="#" target="_blank">
                      {twitterIcon()}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      {facebookIcon()}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      {instagramIcon()}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      {githubIcon()}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer__level-two d__flex d__flex-h-between d__flex-v-center">
              <p>© Copyright 2023, All Rights Reserved</p>
              <ul className="privacy__menu d__flex gap-2">
                <li>
                  <NavLink>Privacy Policy </NavLink>
                </li>
                <li>
                  <NavLink>Terms & Conditions</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </>
  );
};

export default Contact;
