import "./about.css";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { useEffect, useState } from "react";
import {
  ctaBtnIcon,
  twitterIcon,
  facebookIcon,
  instagramIcon,
  githubIcon,
} from "../../utils/SvgIcons";
import BannerImage from "../../assets/images/banner.jpg";

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [nav, setNav] = useState(false);
  const showNav = (e) => {
    setNav(!nav);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <li className="landing__header-item active">
                  <HashLink to="/about">About Us</HashLink>
                </li>
                <li className="landing__header-item">
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
          <h1>About Us</h1>
        </div>
      </div>
      <div className="template">
        <img
          src={BannerImage}
          alt="#"
          className="img-responsive banner-image"
        />
        <h1>About Better Letter</h1>
        <p>
          Website platform so schools/students/teachers across the US can go to
          the site and search for persons that are in retirement and elderly
          care homes based on 15 to 20 data points of each and then be able to
          write a letter addressed to the retirement home in care of the person.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
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
    </>
  );
};

export default About;
