import { Link } from "react-router-dom";
import React, {useState} from "react";
import { useFormik } from "formik";
import AuthSlider from "../../utils/slider/auth-slider/AuthSlider"
import {leftArrow,closeEye,openEye,envelopIcon} from "../../utils/SvgIcons";
import {resetPassSchema} from "../../utils/validationSchemas/authSchema";
import {useDispatch} from "react-redux";
import {resetPassword} from "../../redux/thunks/Thunks";
import {toast} from "react-toastify";
import Toaster from "../../utils/Toaster";
import {useNavigate} from "react-router";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
        password_confirmation: "",
        token: "58xViUvUcdm0rYjwI5c14qourBjoETuvMZeLCzSFfo8TkHpWoxYM1CtFz9A9smQX",
    };
    const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
        initialValues,
        validationSchema: resetPassSchema,
        onSubmit: (values, action) => {
            setLoading(true);
            dispatch(resetPassword(values)).then((response) => {
                setLoading(false);
                if(response && response.payload.status){
                    toast.success("Your password has been updated.");

                    setTimeout(() => {
                        Navigate("/login");
                    }, 5000);
                }
                else{
                    toast.error("Provided email is not correct.");
                }
            })
        },
    });

    return(
        <>

            <section className="login__section d__flex d__flex-h-between d__flex-v-center">

                <form onSubmit={handleSubmit} className="left__form">
                    <div className="left__form-inner">
                        <div className="form__title">
                            <h1>Reset Password</h1>
                            <p>Please enter new password</p>
                        </div>
                        <div className="login__form d__flex d__flex-h-between gap-2">
                            <div className="form__group full__field">
                                <label>Email Address *</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="hideShowPassword">
                                    {envelopIcon()}
                                </span>
                                <p className="error-msg">{errors.email && touched.email ? errors.email : null}</p>
                            </div>
                            <div className="form__group full__field">
                                <label>New Password *</label>
                                <input
                                    type={isRevealPwd ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="hideShowPassword" onClick={() => setIsRevealPwd(prevState => !prevState)}>
                                    {isRevealPwd ? openEye() : closeEye()}
                                </span>
                                <p className="error-msg">{errors.password && touched.password ? errors.password : null}</p>
                            </div>
                            <div className="form__group full__field">
                                <label>Confirm Password *</label>
                                <input
                                    type={isRevealPwd ? "text" : "password"}
                                    name="password_confirmation"
                                    placeholder="Re-enter your password"
                                    value={values.password_confirmation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <span className="hideShowPassword" onClick={() => setIsRevealPwdConfirm(prevState => !prevState)}>
                                    {isRevealPwdConfirm ? openEye() : closeEye()}
                                </span>
                                <p className="error-msg">{errors.password_confirmation && touched.password_confirmation ? errors.password_confirmation : null}</p>
                            </div>
                            <div className="form__group full__field">
                                <button type="submit" className={`signup__next-btn full__field ${loading ? "disabled" : ""}`}>
                                    {
                                        loading ? "Processing..." : "Reset Password"
                                    }
                                </button>
                            </div>
                            <div className="login__back-link form__group full__field text__center ">
                                <Link to="/login" className="d__flex d__flex-h-center d__flex-v-center">
                                    {leftArrow()}
                                    <span>Back to Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
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

export default ResetPassword;