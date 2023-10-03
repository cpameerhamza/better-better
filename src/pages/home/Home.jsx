import "./home.css";
import Logo from "../../assets/images/logo.svg";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import BannerImg from "../../assets/images/landing-banner.png";
import MailIcon from "../../assets/images/everyone-email.svg";
import AboutImg from "../../assets/images/about-img.png";
import FeaturedImg1 from "../../assets/images/featured-1.png";
import FeaturedImg2 from "../../assets/images/featured-2.png";
import FeaturedImg3 from "../../assets/images/featured-3.png";
import Work1 from "../../assets/images/work-1.png";
import Work2 from "../../assets/images/work-2.png";
import Work3 from "../../assets/images/work-3.png";
import ConnectImg from "../../assets/images/connect-img.png";
import S1 from "../../assets/images/s1.png";
import S2 from "../../assets/images/s2.png";
import S3 from "../../assets/images/s3.png";
import S4 from "../../assets/images/s4.png";
import HImg1 from "../../assets/images/h1.png";
import HImg2 from "../../assets/images/h2.png";
import {
  ctaBtnIcon,
  twitterIcon,
  facebookIcon,
  instagramIcon,
  githubIcon,
} from "../../utils/SvgIcons";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [nav, setNav] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const showNav = (e) => {
    setNav(!nav);
  };
  return (
    <>
      <div className="landing__page">
        <header className="landing__header">
          <div className="site__container">
            <div className="landing__header-content d__flex d__flex-h-between d__flex-v-center">
              <div className="landing__header-logo">
                <img src={Logo} alt="" />
              </div>
              <div
                className={`landing__header-menu ${
                  nav == true ? "show-menu" : ""
                }`}
              >
                <ul className="landing__header-items d__flex d__flex-v-center gap-1">
                  <li className="landing__header-item active">
                    <HashLink to="#home">Home</HashLink>
                  </li>
                  <li className="landing__header-item">
                    <HashLink to="#about">About Us</HashLink>
                  </li>
                  <li className="landing__header-item">
                    <HashLink to="#contact">Contact</HashLink>
                  </li>
                  <li className="landing__header-item">
                    <HashLink to="#faq">FAQ</HashLink>
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

        <div className="hero__banner" id="home">
          <div className="site__container">
            <div className="hero__content">
              <div className="hero__title">
                <h1>
                  Connecting{" "}
                  <span className="text__decoration">Generations</span> and
                  improving mental health through the ha
                  <span className="text__decoration">nd wr</span>
                  itten letter.
                </h1>
                <p>
                  Better Letter is a free software platform to connect students
                  to senior citizenss across the USA and improve mental health
                  and well-being for both.
                </p>
              </div>
              <div className="hero__img">
                <img src={BannerImg} />
              </div>
            </div>
          </div>
        </div>

        <div className="everyone__love">
          <div className="site__container">
            <div className="everyone__content d__flex d__flex-h-between d__flex-v-center">
              <p>
                Generational Penpal programs are proven to create good habits,
                empathy, better memory and cognition, compassion and creates a
                unique learning experiences for students. Students can use
                Better Letter to learn about the local community or explore and
                connect with a senior citizen penpal anywhere in the USA. Senior
                Citizens can share stories from history and their experiences
                and it also gives them a sense of belonging.
              </p>
              <div className="mail__icon">
                <img src={MailIcon} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="about__us" id="about">
          <div className="site__container">
            <div className="about__content d__flex d__flex-h-between d__flex-v-center">
              <div className="about__img">
                <img src={AboutImg} />
              </div>
              <div className="about__info">
                <h1>
                  About <br />
                  Better <span className="text__decoration">Letter</span>...
                </h1>
                <p>
                  Better Letter was created by Sofia Fortenberry as a free
                  software platform where students can engage independently or
                  as a school with senior citizens in retirement and elderly
                  care homes across the USA. Our weighted matching algorithm
                  increases a better match and longer term connection.
                </p>
                <Link to="/about" className="cta__btn inline">
                  Learn More {ctaBtnIcon()}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="our__featured">
          <div className="site__container">
            <div className="featured__content">
              <div className="featured__box d__flex d__flex-h-between">
                <div className="featured__box-item">
                  <img src={FeaturedImg1} />
                  <div className="featured__box-content">
                    <h3>Shared Benefit</h3>
                    <p>
                      Improve cognition, well-being and make a positive impact
                      on society. From the WHO to the US National Institiute on
                      Aging. Generational Penpal programs make a positive impact
                      for everyeone.
                    </p>
                  </div>
                </div>
                <div className="featured__box-item">
                  <img src={FeaturedImg2} />
                  <div className="featured__box-content">
                    <h3>Lasting Memories</h3>
                    <p>
                      Students can learn and Senior Citizens get the opportunity
                      to share their stories. History lessons, living abroad,
                      careers, skydiving or playing in a rock band. Thesee are
                      stories to be cherised and shared.
                    </p>
                  </div>
                </div>
                <div className="featured__box-item">
                  <img src={FeaturedImg3} />
                  <div className="featured__box-content">
                    <h3>Learn about new places</h3>
                    <p>
                      Better Letter was designed to not be geographically
                      restrictive. Students can become penpals with senior
                      citizens anywhere in the US to learn about new places.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="our__work">
          <div className="site__container">
            <div className="work__content d__flex d__flex-h-between d__flex-v-center">
              <div className="work__info">
                <h2>
                  How Better Letter <br />
                  <span className="text__decoration">Works ?</span>
                </h2>
                <ul className="work__tabbing">
                  <li
                    className={`work__tab ${activeTab === 0 ? "active" : ""}`}
                    onClick={() => handleTabClick(0)}
                  >
                    <h4>Register on our Free Platform</h4>
                    <p>
                      Students and Senior Citizens (or administrators) can go to
                      the site and sign up to become a penpal with only a few
                      questions.
                    </p>
                    <div
                      className={`tabscreen__one ${
                        activeTab === 0 ? "active" : ""
                      }`}
                    >
                      <img src={Work1} alt="" />
                    </div>
                  </li>
                  <li
                    className={`work__tab ${activeTab === 1 ? "active" : ""}`}
                    onClick={() => handleTabClick(1)}
                  >
                    <h4>Send Connects</h4>
                    <p>
                      Only students are able to search for penpal connections
                      for safety, but will be able to match and send up to 4
                      connection requests to become penpals and exchange letters
                      after connected with them.
                    </p>
                    <div
                      className={`tabscreen__one ${
                        activeTab === 1 ? "active" : ""
                      }`}
                    >
                      <img src={Work2} alt="" />
                    </div>
                  </li>
                  <li
                    className={`work__tab ${activeTab === 2 ? "active" : ""}`}
                    onClick={() => handleTabClick(2)}
                  >
                    <h4>Exchange Pen Pals</h4>
                    <p>
                      Once confirmed they are interested to receive a penpal, it
                      should notify the student/teacher/school so they can write
                      the letter.
                    </p>
                    <div
                      className={`tabscreen__one ${
                        activeTab === 2 ? "active" : ""
                      }`}
                    >
                      <img src={Work3} alt="" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="work__img">
                <div className="work__img-tabscreen">
                  <div
                    className={`tabscreen__one ${
                      activeTab === 0 ? "active" : ""
                    }`}
                  >
                    <img src={Work1} alt="" />
                  </div>
                  <div
                    className={`tabscreen__one ${
                      activeTab === 1 ? "active" : ""
                    }`}
                  >
                    <img src={Work2} alt="" />
                  </div>
                  <div
                    className={`tabscreen__one ${
                      activeTab === 2 ? "active" : ""
                    }`}
                  >
                    <img src={Work3} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="connect__generation">
          <div className="site__container">
            <div className="generation__content d__flex d__flex-h-between d__flex-v-center">
              <div className="generation__img">
                <img src={ConnectImg} />
              </div>
              <div className="generation__info">
                <h2>
                  Connect Young Generation to{" "}
                  <span className="text__decoration">Older Generations</span> !
                </h2>
                <p>
                  Schools and Classes can use Better Letter to learn about
                  places across the world and experiences from other generations
                  as a school project.
                </p>
                <ul className="generation__list d__flex d__flex-h-between gap-2">
                  <li>Safe</li>
                  <li>Lorem ipsum dolor</li>
                  <li>Lorem ipsum dolor</li>
                  <li>Lorem ipsum dolor</li>
                  <li>Lorem ipsum dolor</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial__section">
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper desktop-swiper"
          >
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row slide__row-one">
                      <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S1} />
                        </div>
                        <div className="inner">
                          <h4>JoEllen B</h4>
                          <p>
                            Better Letter forges connections and benefits
                            children and older adults alike. The lost art of
                            letter writing unites people and is a boon to those
                            of all ages.
                          </p>
                        </div>
                      </div>
                      <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={HImg1} />
                        </div>
                        <div className="inner">
                          <h4>Matthew F</h4>
                          <p>
                            It is really great that you can engage and track
                            when you send a letter or have one coming on the
                            platform so you know when a letter is being sent.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="inner-holder d__flex d__flex-h-center d__flex-v-center">
                      <h3>
                        Feedback from students
                        <span className="text__decoration"> and sen</span>
                        ior citizens
                      </h3>
                    </div>
                    <div className="slide-row slide__row-two">
                      <div className="slide__one slide__two slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S2} />
                        </div>
                        <div className="inner">
                          <h4>Geoff R</h4>
                          <p>
                            Connecting with a penpal in another area of the
                            country and learnign about places I have never
                            traveled has been wonderful and exciting. I look
                            forward to being notified a letter is on its way
                            from my penpal.
                          </p>
                        </div>
                      </div>
                      <div className="slide__one slide__two slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={HImg2} />
                        </div>
                        <div className="inner">
                          <h4>Elizabeth W</h4>
                          <p>
                            It has been wonderful to share my experiences and
                            feel important to someone that I hope will last for
                            years. It has been enjoyable and I am always excited
                            to get a notification a letter is on its way.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row slide__row-one">
                      <div
                        className="slide__one slide__item item2"
                        style={{ marginLeft: "0px" }}
                      >
                        <div className="slider__img top__before-left icon">
                          <img src={S3} />
                        </div>
                        <div className="inner">
                          <h4>Horace D</h4>
                          <p>
                            Better Letter helps young people develop social
                            values and interest in civic engagement; higher
                            social and emotional functioning and improved
                            communication skills, caring behaviors, and positive
                            attitudes about aging.
                          </p>
                        </div>
                      </div>
                      {/* <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S2} />
                        </div>
                        <div className="inner">
                          <h4>Erin Westervelt</h4>
                          <p>
                            Tired of work or school? let's take a vacation by
                            choosing their own destination for refreshing.
                          </p>
                        </div>
                      </div> */}
                    </div>
                    <div className="inner-holder d__flex d__flex-h-center d__flex-v-center">
                      <h3>
                        Feedback from students
                        <span className="text__decoration"> and sen</span>
                        ior citizens
                      </h3>
                    </div>
                    <div className="slide-row slide__row-two">
                      <div className="slide__one slide__two slide__item item2">
                        <div className="slider__img top__before-left icon">
                          <img src={S4} />
                        </div>
                        <div className="inner">
                          <h4>Sofia F</h4>
                          <p>
                            I have loved writing to my penpal and we have even
                            shared art work. It is exciting and rewarding for me
                            to make a national platform that anyone can use.
                          </p>
                        </div>
                      </div>
                      {/* <div className="slide__one slide__two slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S4} />
                        </div>
                        <div className="inner">
                          <h4>Erin Westervelt</h4>
                          <p>
                            Tired of work or school? let's take a vacation by
                            choosing their own destination for refreshing.
                          </p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="testimonial__section testimonial__section__mobile">
          <h3>
            Feedback from students
            <span className="text__decoration"> and sen</span>
            ior citizens
          </h3>
          <Swiper
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={true}
            modules={[Pagination]}
            className="mySwiper desktop-swiper"
          >
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row">
                      <div className="slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S1} />
                        </div>
                        <div className="inner">
                          <h4>JoEllen B</h4>
                          <p>
                            Better Letter forges connections and benefits
                            children and older adults alike. The lost art of
                            letter writing unites people and is a boon to those
                            of all ages.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row">
                      <div className="slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={HImg1} />
                        </div>
                        <div className="inner">
                          <h4>Matthew F</h4>
                          <p>
                            It is really great that you can engage and track
                            when you send a letter or have one coming on the
                            platform so you know when a letter is being sent.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row">
                      <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S2} />
                        </div>
                        <div className="inner">
                          <h4>Geoff R</h4>
                          <p>
                            Connecting with a penpal in another area of the
                            country and learnign about places I have never
                            traveled has been wonderful and exciting. I look
                            forward to being notified a letter is on its way
                            from my penpal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row">
                      <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={HImg2} />
                        </div>
                        <div className="inner">
                          <h4>Elizabeth W</h4>
                          <p>
                            It has been wonderful to share my experiences and
                            feel important to someone that I hope will last for
                            years. It has been enjoyable and I am always excited
                            to get a notification a letter is on its way.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row">
                      <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S3} />
                        </div>
                        <div className="inner">
                          <h4>Horace D</h4>
                          <p>
                            Better Letter helps young people develop social
                            values and interest in civic engagement; higher
                            social and emotional functioning and improved
                            communication skills, caring behaviors, and positive
                            attitudes about aging.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="testimonials__slide">
                <div className="site__container">
                  <div className="slide__content">
                    <div className="slide-row">
                      <div className="slide__one slide__item item">
                        <div className="slider__img top__before-left icon">
                          <img src={S4} />
                        </div>
                        <div className="inner">
                          <h4>Sofia F</h4>
                          <p>
                            I have loved writing to my penpal and we have even
                            shared art work. It is exciting and rewarding for me
                            to make a national platform that anyone can use.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="faq__section" id="faq">
          <div className="site__container">
            <div className="faq__content">
              <h2>
                <span className="text__decoration">FAQ’s</span>...
              </h2>
              <Accordion allowZeroExpanded>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>Who is this for?</AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Vitae ut sem
                      dignissim elementum. Diam sed duis velit fusce ipsum. Sem
                      eget eu eu eget ante vitae est sit. Semper risus duis
                      purus sed ornare. Amet egestas id bibendum eleifend.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      What is it exactly?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Vitae ut sem
                      dignissim elementum. Diam sed duis velit fusce ipsum. Sem
                      eget eu eu eget ante vitae est sit. Semper risus duis
                      purus sed ornare. Amet egestas id bibendum eleifend.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      How is this different from other programs?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Vitae ut sem
                      dignissim elementum. Diam sed duis velit fusce ipsum. Sem
                      eget eu eu eget ante vitae est sit. Semper risus duis
                      purus sed ornare. Amet egestas id bibendum eleifend.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      How do you keep everyone Safe?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Vitae ut sem
                      dignissim elementum. Diam sed duis velit fusce ipsum. Sem
                      eget eu eu eget ante vitae est sit. Semper risus duis
                      purus sed ornare. Amet egestas id bibendum eleifend.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      How is it Free? Is it really? (YES IT IS!)
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Vitae ut sem
                      dignissim elementum. Diam sed duis velit fusce ipsum. Sem
                      eget eu eu eget ante vitae est sit. Semper risus duis
                      purus sed ornare. Amet egestas id bibendum eleifend.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      How do I start a Chapter at my school or institution?
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p>
                      Lorem ipsum dolor sit amet consectetur. Vitae ut sem
                      dignissim elementum. Diam sed duis velit fusce ipsum. Sem
                      eget eu eu eget ante vitae est sit. Semper risus duis
                      purus sed ornare. Amet egestas id bibendum eleifend.
                    </p>
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="contact__section" id="contact">
          <div className="site__container">
            <div className="contact__content">
              <h2>
                Please reach out with questions or to sign up your school or
                institution.
              </h2>
              <Link to="/contact" className="cta__btn white__cta">
                Contact Us
              </Link>
            </div>
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
                      <HashLink to="#home">Home</HashLink>
                    </li>
                    <li>
                      <HashLink to="#about">About Us</HashLink>
                    </li>
                    <li>
                      <HashLink to="#contact">Contact</HashLink>
                    </li>
                    <li>
                      <HashLink to="#faq">FAQ</HashLink>
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
                    <Link>Privacy Policy </Link>
                  </li>
                  <li>
                    <Link>Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
