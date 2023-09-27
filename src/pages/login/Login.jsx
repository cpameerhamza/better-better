import { Link, NavLink } from "react-router-dom";
import React, {useEffect, useInsertionEffect, useLayoutEffect, useState} from "react";
import AuthSlider from "../../utils/slider/auth-slider/AuthSlider"
import "./login.css";
import {useFormik} from "formik";
import {loginSchema} from "../../utils/validationSchemas/authSchema";
import {LoginFormFields} from "../../utils/formConstants";
import {useDispatch} from "react-redux";
import {loginUser} from "../../redux/thunks/Thunks";
import Toaster from "../../utils/Toaster";
import {toast} from "react-toastify";
import {useNavigate, Navigate} from "react-router";
import {envelopIcon, closeEye, openEye} from "../../utils/SvgIcons";
import logo from "../../assets/images/logo.svg";

const Login = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const { values, handleBlur, touched, handleChange, errors, handleSubmit } =
        useFormik({
            initialValues: LoginFormFields(),
            validationSchema: loginSchema,
            onSubmit: (values) => {
                setLoading(true);
                dispatch(loginUser(values)).then((response) => {
                    setLoading(false);
                    if(response?.payload.message === "Please verify your email"){
                        toast.error("Please verify your email.");
                    }
                    else if(response?.payload.status === false){
                        toast.error("Your email / password is invalid.");
                    }
                    else{
                        setSuccess(true);
                        toast.success("You are being redirected.");
                        localStorage.setItem("user", JSON.stringify(response?.payload.data));
                        localStorage.setItem("token", JSON.stringify(response?.payload.data.token));
                        setTimeout(() => {
                            Navigate("/dashboard");
                        }, 3000);
                    }
                })
            },
        });
    return(
        <>
            <section className="login__section d__flex d__flex-h-between d__flex-v-center overflow__hidden">
                <div className="left__form">
                    <div className="left__form-inner">
                        <div className="site-logo">
                         <NavLink to="/">
                            <img src={logo} />
                         </NavLink>
                        </div>
                        <div className="form__title">
                            <Link to="/signup" className="signup-btn">Sign Up Now</Link>
                            <h1>Login</h1>
                            <p>Please login to access your account</p>
                        </div>
                        <form onSubmit={handleSubmit} className="login__form d__flex d__flex-h-between gap-2">
                            <div className="form__group full__field">
                                <label>Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="login-email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="hideShowPassword">
                            {envelopIcon()}
                        </span>
                                <p className="error-msg">{errors.email && touched.email ? errors.email : null}</p>
                            </div>
                            <div className="form__group full__field">
                                <label>Password</label>
                                <input
                                    type={isRevealPwd ? "text" : "password"}
                                    placeholder="Enter your password"
                                    name="password"
                                    className="login-email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="hideShowPassword" onClick={() => setIsRevealPwd(prevState => !prevState)}>
                            {isRevealPwd ? openEye() : closeEye()}
                        </span>
                                <p className="error-msg">{errors.password && touched.password ? errors.password : null}</p>
                            </div>

                            <div className="form__group full__field remember__check">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div className="form__group full__field">
                                <button type="submit" className={`signup__next-btn full__field ${loading || success ? "disabled" : ""}`}>
                                    {
                                        loading ? "Processing..." : "Login"
                                    }
                                </button>
                            </div>
                            <div className="login__bottom-link form__group full__field text__center">
                                <p className="d__flex d__flex-h-center d__flex-v-center">
                                    You don’t have an account?
                                    <Link to="/signup">Sign Up</Link>
                                </p>
                                <Link to="/forget-password">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="right__slider">
                    <div className="right__slider-inner">
                        <AuthSlider />
                    </div>
                </div>
            </section>
            <Toaster />
        </>
    )
}

export default Login;