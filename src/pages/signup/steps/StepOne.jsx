import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import avatar from "../../../assets/images/user__icon.jpg";
import { getInstitutes } from "../../../redux/thunks/Thunks";
import PreviewPhoto from "../../../utils/PreviewPhoto";
import { addImageIcon, closeEye, openEye } from "../../../utils/SvgIcons";
import { isNumberCheck } from "../../../utils/helper";
import {
  elderSchema,
  signupSchema,
} from "../../../utils/validationSchemas/authSchema";
const animatedComponents = makeAnimated();

const StepOne = ({ formKeys, setFormKeys, step, isElder, setIsElder }) => {
  const currentYear = new Date().getFullYear();
  const studentYear = 2000;
  const citizenYear = 1955;
  const studentYearsArray = Array.from(
    { length: currentYear - studentYear + 1 },
    (_, index) => index + studentYear
  ).reverse();
  const citizenYearsArray = Array.from(
    { length: currentYear - citizenYear + 1 },
    (_, index) => index + citizenYear
  ).reverse();
  const user = JSON.parse(localStorage.getItem("user"));
  const [years, setYears] = useState(studentYearsArray);
  const dispatch = useDispatch();
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isRevealPwdConfirm, setIsRevealPwdConfirm] = useState(false);

  const ref = useRef();
  const {
    values,
    handleBlur,
    touched,
    handleChange,
    handleReset,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: formKeys,
    validationSchema: isElder ? elderSchema : signupSchema,
    onSubmit: (values) => {
      // delete values.yourValueName;
      setFormKeys({ ...formKeys, ...values });
      console.log("STEP ONE:", values);
      step((step) => step + 1);
    },
  });
  const handleRole = (e) => {
    e.value === "2" ? setYears(citizenYearsArray) : setYears(studentYearsArray);
    e.value === "2" ? setIsElder(true) : setIsElder(false);
  };
  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };
  useEffect(() => {
    setIsElder(user?.isInstitute && user?.role_type === 2 ? true : false);
  }, []);

  function myKeyPress(e, field) {
    if (e.code !== "Backspace") {
      if (!isNumberCheck(e)) {
        e.preventDefault();
        return;
      }
    }
  }

  const inputHandler = (value, field) => {
    // Remove all non-numeric characters from the input value
    const text = value.replace(/[^\d\S]/g, "");

    if (text === "") {
      setFieldValue(field, "");
      return;
    }

    setFieldValue(field, value);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="registration-process-steps full-height"
      >
        <div className="signup__form">
          <div className="signup__form-one d__flex d__flex-h-between gap-2">
            {user && user.isInstitute ? (
              ""
            ) : (
              <div className="form__group full__field">
                <label>I am *</label>
                <Select
                  defaultValue={{ value: "1", label: "Student" }}
                  closeMenuOnSelect={true}
                  components={{ animatedComponents, Placeholder }}
                  options={[
                    { value: "1", label: "Student" },
                    { value: "2", label: "Senior Citizen" },
                  ]}
                  className="basic-multi-select"
                  hideSelectedOptions={false}
                  onChange={(e) => {
                    handleRole(e);
                    handleReset();
                    setFieldValue("role_type", e.value);
                  }}
                />
              </div>
            )}

            {isElder ? (
              <div className="form__group full__field profile__picture">
                <label>Profile Picture *</label>
                <div className="profile__picture-img">
                  {values?.avatar ? (
                    <PreviewPhoto file={values?.avatar} />
                  ) : (
                    <img src={avatar} alt="#" />
                  )}
                  <label className="upload__img" htmlFor="file">
                    <input
                      id="file"
                      name="avatar"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        setFieldValue("avatar", e.target.files[0]);
                      }}
                      onBlur={handleBlur}
                    />
                    {addImageIcon()}
                  </label>
                  <p className="error-msg">
                    {errors.avatar && touched.avatar ? errors.avatar : null}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className={`form__group half__field`}>
              <label>First Name *</label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter your first name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="error-msg">
                {errors.first_name && touched.first_name
                  ? errors.first_name
                  : null}
              </p>
            </div>
            <div className="form__group half__field">
              <label>Last Name *</label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter your Last name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="error-msg">
                {errors.last_name && touched.last_name
                  ? errors.last_name
                  : null}
              </p>
            </div>
            <div className="form__group half__field">
              <label>{!isElder ? "Student school email *" : "Email *"}</label>
              <input
                type="text"
                name="email"
                // placeholder="Enter your email"
                placeholder={
                  !isElder ? "Enter school email" : "Enter your email"
                }
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="error-msg">
                {errors.email && touched.email ? errors.email : null}
              </p>
            </div>
            {isElder ? (
              <div className="form__group half__field">
                <label>Confirm email *</label>
                <input
                  type="text"
                  name="citize_email_confirmation"
                  placeholder="Re-enter school email"
                  value={values.citize_email_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error-msg">
                  {errors.citize_email_confirmation &&
                  touched.citize_email_confirmation
                    ? errors.citize_email_confirmation
                    : null}
                </p>
              </div>
            ) : (
              ""
            )}
            {!isElder ? (
              <div className="form__group half__field">
                <label>Confirm school email *</label>
                <input
                  type="text"
                  name="email_confirmation"
                  placeholder="Re-enter school email"
                  value={values.email_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="error-msg">
                  {errors.email_confirmation && touched.email_confirmation
                    ? errors.email_confirmation
                    : null}
                </p>
              </div>
            ) : (
              ""
            )}
            <div className="form__group half__field">
              <label htmlFor="user-birth">What year were your born *</label>
              <select
                name="dob"
                selected={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                {years?.map((year, index) => {
                  return <option key={index}>{year}</option>;
                })}
              </select>
              <p className="error-msg">
                {errors.dob && touched.dob ? errors.dob : null}
              </p>
            </div>
            <div className="form__group half__field">
              <label>
                {!isElder ? "Your School Name *" : "Enter Your Institute Name"}
              </label>
              <input
                type="text"
                name="institute_id"
                placeholder="Enter Your Institute Name"
                value={values.institute_id}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="error-msg">
                {errors.institute_id && touched.institute_id
                  ? errors.institute_id
                  : null}
              </p>
            </div>
            {isElder ? (
              <div
                className={`form__group ${
                  isElder ? "full__field" : "half__field"
                }`}
              >
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="phone_no"
                  placeholder="Enter your number"
                  value={values.phone_no}
                  onChange={(e) => {
                    inputHandler(e.target.value, "phone_no");
                  }}
                  onKeyDown={(e) => {
                    myKeyPress(e, "phone_no");
                  }}
                  onBlur={handleBlur}
                />
                <p className="error-msg">
                  {errors.phone_no && touched.phone_no ? errors.phone_no : null}
                </p>
              </div>
            ) : (
              ""
            )}
            {!isElder ? (
              <>
                <div className="form__group full__field">
                  <div className="line"></div>
                </div>
                <div className="form__group full__field">
                  <div className="title">School Contact Information</div>
                </div>
                <div className="form__group half__field">
                  <label>School contact Name *</label>
                  <input
                    type="text"
                    name="institute_contact_name"
                    placeholder="Enter school contact name"
                    value={values.institute_contact_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="error-msg">
                    {errors.institute_contact_name &&
                    touched.institute_contact_name
                      ? errors.institute_contact_name
                      : null}
                  </p>
                </div>
                <div className="form__group half__field">
                  <label>School contact phone *</label>
                  <input
                    type="text"
                    name="institute_contact_number"
                    placeholder="Enter school contact number"
                    value={values.institute_contact_number}
                    onChange={(e) => {
                      inputHandler(e.target.value, "institute_contact_number");
                    }}
                    onKeyDown={(e) => {
                      myKeyPress(e, "institute_contact_number");
                    }}
                    onBlur={handleBlur}
                  />
                  <p className="error-msg">
                    {errors.institute_contact_number &&
                    touched.institute_contact_number
                      ? errors.institute_contact_number
                      : null}
                  </p>
                </div>
                <div className="form__group half__field">
                  <label>School contact email *</label>
                  <input
                    type="text"
                    name="institute_contact_email"
                    placeholder="Enter school email"
                    value={values.institute_contact_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="error-msg">
                    {errors.institute_contact_email &&
                    touched.institute_contact_email
                      ? errors.institute_contact_email
                      : null}
                  </p>
                </div>
                <div className="form__group half__field">
                  <label>Confirm school contact email *</label>
                  <input
                    type="text"
                    name="institute_contact_email_confirmation"
                    placeholder="Re-enter school contact email"
                    value={values.institute_contact_email_confirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <p className="error-msg">
                    {errors.institute_contact_email_confirmation &&
                    touched.institute_contact_email_confirmation
                      ? errors.institute_contact_email_confirmation
                      : null}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
            {isElder ? (
              <>
                <div className="form__group full__field">
                  <label>Select Gender *</label>
                  <Select
                    placeholder="Select Gender"
                    closeMenuOnSelect={true}
                    components={{ animatedComponents, Placeholder }}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                      {
                        value: "not-to-disclose",
                        label: "Prefer not to disclose",
                      },
                    ]}
                    className="basic-multi-select"
                    hideSelectedOptions={false}
                    onChange={(e) => {
                      setFieldValue("gender", e.value);
                    }}
                  />

                  <p className="error-msg">
                    {errors.gender && touched.gender ? errors.gender : null}
                  </p>
                </div>
                <div className="form__group full__field">
                  <label>Tell About Yourself</label>
                  <textarea
                    type="text"
                    name="about"
                    placeholder="Enter your bio"
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="bio-field"
                  />
                  <p className="error-msg">
                    {errors.about && touched.about ? errors.about : null}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="form__group full__field">
              <div className="line"></div>
            </div>
            <div className="form__group half__field">
              <label>Create a password *</label>
              <input
                type={isRevealPwd ? "text" : "password"}
                name="password"
                className="login-email"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="hideShowPassword"
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              >
                {isRevealPwd ? closeEye() : openEye()}
              </span>
              <p className="error-msg">
                {errors.password && touched.password ? errors.password : null}
              </p>
            </div>
            <div
              className={`form__group ${
                isElder ? "half__field" : "half__field"
              }`}
            >
              <label>Confirm Password *</label>
              <input
                type={isRevealPwdConfirm ? "text" : "password"}
                name="password_confirmation"
                className="login-email"
                value={values.password_confirmation}
                placeholder="Re-enter your password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span
                className="hideShowPassword"
                onClick={() => setIsRevealPwdConfirm((prevState) => !prevState)}
              >
                {isRevealPwdConfirm ? closeEye() : openEye()}
              </span>
              <p className="error-msg">
                {errors.password_confirmation && touched.password_confirmation
                  ? errors.password_confirmation
                  : null}
              </p>
            </div>
          </div>
        </div>
        <div className="signup__form-submit">
          <div className="submit__btn-container d__flex d__flex-h-between">
            {
              <Link
                to={
                  user && user?.isInstitute ? "/institute-dashboard" : "/login"
                }
                className="signup__cancel-btn"
              >
                Cancel
              </Link>
            }
            {user && user?.isInstitute ? (
              ""
            ) : (
              <p>
                Already have an account?<Link to="/login">Log in</Link>
              </p>
            )}

            <button type="submit" className="signup__next-btn">
              Next
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StepOne;
