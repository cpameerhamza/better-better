import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AuthSlider from "../../utils/slider/auth-slider/AuthSlider"
import {leftArrow, envelopIcon} from "../../utils/SvgIcons";
import {emailSchema} from "../../utils/validationSchemas/authSchema";
import {useDispatch} from "react-redux";
import {forgotPassword} from "../../redux/thunks/Thunks";
import {toast} from "react-toastify";
import Toaster from "../../utils/Toaster";
import {useState} from "react";

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
    };
    const { values, handleBlur, handleChange, handleSubmit, touched, errors, isSubmitting } =
    useFormik({
        initialValues,
        validationSchema: emailSchema,
        onSubmit: (values, action) => {
            setLoading(true);
            dispatch(forgotPassword(values)).then((response) => {
                setLoading(false);
                if(response && response.payload.status) {
                    toast.success("Password reset link sent at your email.");
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
                <div className="left__form">
                    <div className="left__form-inner">
                        <div className="form__title">
                            <h1>Forgot Password</h1>
                            <p>Please enter your email</p>
                        </div>
                        <form onSubmit={handleSubmit} className="login__form d__flex d__flex-h-between gap-2">
                            <div className="form__group full__field">
                                <label>Email Address</label>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="catherine.shaw@gmail.com"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                />
                                <span className="hideShowPassword">
                                    {envelopIcon()}
                                </span>
                                <p className="error-msg">{errors.email && touched.email ? errors.email : null}</p>
                            </div>
                            <div className="form__group full__field">
                                <button type="submit" className={`signup__next-btn full__field ${loading ? "disabled" : ""}`}>
                                    {
                                        loading ? "Processing..." : "Submit"
                                    }
                                </button>
                            </div>
                            <div className="login__back-link form__group full__field text__center ">
                                <Link to="/login" className="d__flex d__flex-h-center d__flex-v-center">
                                    {leftArrow()}
                                    <span>Back to Login</span>
                                </Link>
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

export default ForgetPassword;