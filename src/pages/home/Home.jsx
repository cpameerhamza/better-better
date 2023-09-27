import "./home.css";
import Logo from "../../assets/images/logo.svg";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useState } from 'react';
import { HashLink } from "react-router-hash-link";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import { Swiper , SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import BannerImg from "../../assets/images/landing-banner.png"
import MailIcon from "../../assets/images/everyone-email.svg"
import AboutImg from "../../assets/images/about-img.png"
import FeaturedImg1 from "../../assets/images/featured-1.png"
import FeaturedImg2 from "../../assets/images/featured-2.png"
import FeaturedImg3 from "../../assets/images/featured-3.png"
import Work1 from "../../assets/images/work-1.png"
import Work2 from "../../assets/images/work-2.png"
import Work3 from "../../assets/images/work-3.png"
import ConnectImg from "../../assets/images/connect-img.png"
import S1 from "../../assets/images/s1.png"
import S2 from "../../assets/images/s2.png"
import S3 from "../../assets/images/s3.png"
import S4 from "../../assets/images/s4.png"
import HImg1 from "../../assets/images/h1.png"
import HImg2 from "../../assets/images/h2.png"
import { ctaBtnIcon, twitterIcon ,facebookIcon ,instagramIcon ,githubIcon } from "../../utils/SvgIcons"


const Home = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [nav, setNav] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    const showNav = (e) => {
         setNav(!nav);
    }
    return(
        <>
            <div className="landing__page">
                <header className="landing__header">
                    <div className="site__container">
                        <div className="landing__header-content d__flex d__flex-h-between d__flex-v-center">
                            <div className="landing__header-logo">
                                <img src={Logo} alt=""  />
                            </div>
                            <div className={`landing__header-menu ${nav==true ? "show-menu" : ""}`}>
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
                
                                    {
                                        user ?
                                        <NavLink to={`${!user?.isInstitute ? "/dashboard" : user?.isInstitute ? "/institute-dashboard" : "/signup"}`} className="cta__btn">
                                            Get Started
                                            {ctaBtnIcon()}
                                        </NavLink>
                                        :
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
                                    }
                                </div>
                            </div>

                            <div className="header__cta d__flex">
                                {
                                    user ?
                                    <NavLink to={`${!user?.isInstitute ? "/dashboard" : user?.isInstitute ? "/institute-dashboard" : "/signup"}`} className="cta__btn">
                                        Get Started
                                        {ctaBtnIcon()}
                                    </NavLink>
                                    :
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
                                }
                            </div>
                            <button className={`humbuger ${nav==true ? "active" : ""}`}  onClick={() => showNav()} >
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
                                <h1>Connecting <span className="text__decoration">Generations</span> through the lost art of the written <span className="text__decoration">letter.</span></h1>
                                <p>Complete privacy and connection service through online matching platform</p>
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
                            <p>In a world of digitalization, be able to connect with pen and paper. Easier to be able to think about and write down thoughts and words for people who may have a hard time connecting otherwise. <b>Everyone loves mail!</b></p>
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
                            <div  className="about__info">
                                <h1>About <br/>Better <span className="text__decoration">Letter</span>...</h1>
                                <p>Website platform so schools/students/teachers across the US can go to the site and search for persons that are in retirement and elderly care homes based on 15 to 20 data points of each and then be able to write a letter addressed to the retirement home in care of the person.</p>
                                <Link to="/about" className="cta__btn inline">Learn More {ctaBtnIcon()}</Link>
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
                                        <h3>Young to Old Generation</h3>
                                        <p>We are providing the best and suitable home insurance services for the people who are interested to make home</p>
                                    </div>
                                </div>
                                <div className="featured__box-item">
                                    <img src={FeaturedImg2} />
                                    <div className="featured__box-content">
                                        <h3>Better Letters Writings</h3>
                                        <p>We are providing the best and suitable home insurance services for the people who are interested to make home</p>
                                    </div>
                                </div>
                                <div className="featured__box-item">
                                    <img src={FeaturedImg3} />
                                    <div className="featured__box-content">
                                        <h3>Connect Around Globe</h3>
                                        <p>We are providing the best and suitable home insurance services for the people who are interested to make home</p>
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
                                <h2>How Better Letter <br /><span className="text__decoration">Works ?</span></h2>
                                <ul className="work__tabbing">
                                    <li 
                                        className={`work__tab ${activeTab === 0 ? 'active' : ''}`}
                                        onClick={() => handleTabClick(0)}
                                    >
                                        <h4>Register on Web Portal</h4>
                                        <p>Students/Teacher/School can go to site and sign up to become a penpal /register but only with 5-10 questions</p>
                                        <div className={`tabscreen__one ${activeTab === 0 ? 'active' : ''}`}>
                                            <img src={Work1} alt="" />
                                        </div>
                                    </li>
                                    <li 
                                        className={`work__tab ${activeTab === 1 ? 'active' : ''}`}
                                        onClick={() => handleTabClick(1)}
                                    >
                                        <h4>Send Connects</h4>
                                        <p>Students/Teacher can send connects to elderly people/Institutes, so they can exchange letters after connected with them.</p>
                                        <div className={`tabscreen__one ${activeTab === 1 ? 'active' : ''}`}>
                                            <img src={Work2} alt="" />
                                        </div>
                                    </li>
                                    <li 
                                        className={`work__tab ${activeTab === 2 ? 'active' : ''}`}
                                        onClick={() => handleTabClick(2)}
                                    >
                                        <h4>Exchange Pen Pals</h4>
                                        <p>Once confirmed they are interested to receive a penpal, it should notify the student/teacher/school so they can write the letter.</p>
                                        <div className={`tabscreen__one ${activeTab === 2 ? 'active' : ''}`}>
                                            <img src={Work3} alt="" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="work__img">
                                <div className="work__img-tabscreen">
                                    <div className={`tabscreen__one ${activeTab === 0 ? 'active' : ''}`}>
                                        <img src={Work1} alt="" />
                                    </div>
                                    <div className={`tabscreen__one ${activeTab === 1 ? 'active' : ''}`}>
                                        <img src={Work2} alt="" />
                                    </div>
                                    <div className={`tabscreen__one ${activeTab === 2 ? 'active' : ''}`}>
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
                                <h2>Connect Young Generation to <span className="text__decoration">Older Generations</span> !</h2>
                                <p>Schools use Better Letter to be able to learn about places in the world from other generations as a school project.</p>
                                <ul className="generation__list d__flex d__flex-h-between gap-2">
                                    <li>Lorem ipsum dolor</li>
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
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                            <div className="slide__one slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S2} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inner-holder d__flex d__flex-h-center d__flex-v-center">
                                            <div className="inner__left-img">
                                                <img src={HImg1} />
                                            </div>
                                            <h3>Schools & Institue <span className="text__decoration">Sayings</span></h3>
                                            <div className="inner__right-img">
                                                <img src={HImg2} />
                                            </div>
                                        </div>
                                        <div className="slide-row slide__row-two">
                                            <div className="slide__one slide__two slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S3} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                            <div className="slide__one slide__two slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S4} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
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
                                            <div className="slide__one slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S1} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                            <div className="slide__one slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S2} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inner-holder d__flex d__flex-h-center d__flex-v-center">
                                            <div className="inner__left-img">
                                                <img src={HImg1} />
                                            </div>
                                            <h3>Schools & Institue <span className="text__decoration">Sayings</span></h3>
                                            <div className="inner__right-img">
                                                <img src={HImg2} />
                                            </div>
                                        </div>
                                        <div className="slide-row slide__row-two">
                                            <div className="slide__one slide__two slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S3} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                            <div className="slide__one slide__two slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S4} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
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
                                            <div className="slide__one slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S1} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                            <div className="slide__one slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S2} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inner-holder d__flex d__flex-h-center d__flex-v-center">
                                            <div className="inner__left-img">
                                                <img src={HImg1} />
                                            </div>
                                            <h3>Schools & Institue <span className="text__decoration">Sayings</span></h3>
                                            <div className="inner__right-img">
                                                <img src={HImg2} />
                                            </div>
                                        </div>
                                        <div className="slide-row slide__row-two">
                                            <div className="slide__one slide__two slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S3} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                            <div className="slide__one slide__two slide__item item">
                                                <div className="slider__img top__before-left icon">
                                                    <img src={S4} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="testimonial__section testimonial__section__mobile">
                    <h3>Schools & Institue <span className="text__decoration">Sayings</span></h3>
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
                                                    <img src={S3} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
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
                                                    <img src={S1} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
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
                                                    <img src={S1} />
                                                </div>
                                                <div className="inner">
                                                    <h4>Erin Westervelt</h4>
                                                    <p>Tired of work or school? let's take a vacation by choosing their own destination for refreshing.</p>
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
                            <h2><span className="text__decoration">FAQ’s</span>...</h2>
                            <Accordion allowZeroExpanded>
                            
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            What harsh truths do you prefer to ignore?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Lorem ipsum dolor sit amet consectetur. Vitae ut sem dignissim elementum. Diam sed duis velit fusce ipsum. Sem eget eu eu eget ante vitae est sit. Semper risus duis purus sed ornare. Amet egestas id bibendum eleifend.</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Is free will real or just an illusion?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Lorem ipsum dolor sit amet consectetur. Vitae ut sem dignissim elementum. Diam sed duis velit fusce ipsum. Sem eget eu eu eget ante vitae est sit. Semper risus duis purus sed ornare. Amet egestas id bibendum eleifend.</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Lorem ipsum dolor sit amet consectetur. Cras nec maecenas arcu?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Lorem ipsum dolor sit amet consectetur. Vitae ut sem dignissim elementum. Diam sed duis velit fusce ipsum. Sem eget eu eu eget ante vitae est sit. Semper risus duis purus sed ornare. Amet egestas id bibendum eleifend.</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Lorem ipsum dolor sit amet consectetur. Euismod nunc?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Lorem ipsum dolor sit amet consectetur. Vitae ut sem dignissim elementum. Diam sed duis velit fusce ipsum. Sem eget eu eu eget ante vitae est sit. Semper risus duis purus sed ornare. Amet egestas id bibendum eleifend.</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Lorem ipsum dolor sit amet consectetur?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Lorem ipsum dolor sit amet consectetur. Vitae ut sem dignissim elementum. Diam sed duis velit fusce ipsum. Sem eget eu eu eget ante vitae est sit. Semper risus duis purus sed ornare. Amet egestas id bibendum eleifend.</p>
                                    </AccordionItemPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            Lorem ipsum dolor sit amet?
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p>Lorem ipsum dolor sit amet consectetur. Vitae ut sem dignissim elementum. Diam sed duis velit fusce ipsum. Sem eget eu eu eget ante vitae est sit. Semper risus duis purus sed ornare. Amet egestas id bibendum eleifend.</p>
                                    </AccordionItemPanel>
                                </AccordionItem>

                            </Accordion>
                        </div>
                    </div>
                </div>

                <div className="contact__section" id="contact">
                    <div className="site__container">
                        <div className="contact__content">
                            <h2>Start expanding and create the ability for other schools to sign up as clubs, as teachers, as students, and the retirement homes as pen pals too.</h2>
                            <Link to="/contact" className="cta__btn white__cta">Contact Us</Link>
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
                                        <li><a href="#" target="_blank">{twitterIcon()}</a></li>
                                        <li><a href="#" target="_blank">{facebookIcon()}</a></li>
                                        <li><a href="#" target="_blank">{instagramIcon()}</a></li>
                                        <li><a href="#" target="_blank">{githubIcon()}</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="footer__level-two d__flex d__flex-h-between d__flex-v-center">
                                <p>© Copyright 2023, All Rights Reserved</p>
                                <ul className="privacy__menu d__flex gap-2">
                                    <li><Link>Privacy Policy </Link></li>
                                    <li><Link>Terms & Conditions</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}

export default Home