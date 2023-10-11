import { useEffect, useState, useRef } from "react";
import "./settings.css";
import Sidebar from "../../components/core/sidebar/Sidebar";
import Header from "../../components/core/header/Header";
import { addImageIcon, closeEye, openEye, boldEye } from "../../utils/SvgIcons";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import { studentProfileSchema } from "../../utils/validationSchemas/authSchema";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";
import { getInstitutes, updateProfile } from "../../redux/thunks/Thunks";
import PreviewPhoto from "../../utils/PreviewPhoto";
import { toast } from "react-toastify";
import Toaster from "../../utils/Toaster";
import { useNavigate } from "react-router";
const animatedComponents = makeAnimated();

const Settings = () => {
  const [pwd, setPwd] = useState("");
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [institutes, setInstitutes] = useState(null);
  const [instituteName, setInstituteName] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  const institute = useSelector((state) => state.institutes);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const [defaultInstituteValue, setDefaultValue] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(user)

  const initialValues = {
    role_type: user && user?.role_type,
    first_name: user && user?.first_name,
    last_name: user && user?.last_name !== null ? user?.last_name : "",
    email: user && user?.email !== null ? user?.email : "",
    phone_no: user && user?.phone_no !== null ? user?.phone_no : "",
    dob: user && user?.dob !== null ? user?.dob : "",
    about: user && user?.about !== null ? user?.about : "",
    avatar: "",
    address: user && user?.address !== null ? user?.address : "",
    institute: user && user?.institute !== null ? user?.institute : "",
    current_password: "",
    password: "",
    password_confirmation: "",
    institute_type: user && user?.role_type,
    token: token && token,
  };
  const {
    values,
    handleSubmit,
    handleBlur,
    touched,
    handleReset,
    errors,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: studentProfileSchema,
    onSubmit: (values) => {
      setLoading(true);
      dispatch(updateProfile({ values, isChanged })).then((response) => {
        // console.log(response);
        setLoading(false);
        if (response?.payload.message === "Please enter a valid institute") {
          toast.error("Selected institute is reserved.");
        } else if (
          response?.payload.message ===
          "The avatar field must be a file of type: jpg, jpeg, png."
        ) {
          toast.error("Use a correct image for profile.");
        } else if (response?.payload.status === true) {
          if (isChanged === true) {
            toast.success("Mail sent for confirmation.");
            setTimeout(() => {
              localStorage.clear();
              Navigate("/login");
            }, 2000);
          } else {
            toast.success("Profile is successfully updated.");
            localStorage.setItem(
              "user",
              JSON.stringify(response?.payload.data)
            );
          }
        } else if (
          response?.payload.message !== "Please enter a valid institute" &&
          response?.payload.status === false
        ) {
          toast.error("Something went wrong.");
        }
      });
    },
  });

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  useEffect(() => {
    dispatch(getInstitutes({ role_type: user?.role_type })).then((response) => {
      const newArr = Object.keys(response?.payload.data).map((key) => {
        return response?.payload.data[key];
      });
      setInstitutes(newArr);
    });
  }, []);
  const handleEmail = (e) => {
    if (e.target.value !== user.email) {
      setIsChanged(true);
    }
  };
  useEffect(() => {
    if (institutes) {
      console.log(" user?.institute_id", user?.institute_id);
      let filterArr = institutes?.filter(
        (itm) => itm?.value == user?.institute_id
      );
      console.log(" user?.institute_id", filterArr[0]);
      setDefaultValue(filterArr[0]);
    }
  }, [institutes]);

  return (
    <>
      <div className="dashboard__section d__flex">
        <div className="main__sidebar">
          <Sidebar />
        </div>
        <form onSubmit={handleSubmit} className="main__body">
          <Header pageTitle="Settings" />
          <div className="main__body-content">
            <div className="profile__setting">
              <div className="profile__setting-top d__flex d__flex-h-between">
                <div className="profile__setting-title">
                  <h3>Profile Settings</h3>
                  <p>Update your personal details here.</p>
                </div>
                <div className="profile__setting-btn d__flex gap-1">
                  <button
                    className="setting__btn cancel__btn"
                    onClick={handleReset}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="setting__btn save__btn"
                    disabled={loading ? true : false}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
              <div className="profile__setting-form">
                <div>
                  <div className="signup__form-one d__flex d__flex-h-between gap-2">
                    <h4>Update Information</h4>
                    {user?.role_type === 2 && !user?.isInstitute ? (
                      <div className="form__group full__field">
                        <div className="profile__picture-img">
                          {values?.avatar ? (
                            <PreviewPhoto file={values?.avatar} />
                          ) : (
                            <img
                              src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${user?.avatar}`}
                              alt="#"
                            />
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
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={`form__group ${
                        user?.role_type === 2 ? "half__field" : "full__field"
                      }`}
                    >
                      <label>First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="Enter your first name"
                        value={values?.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="error-msg">
                        {errors.first_name && touched.first_name
                          ? errors.first_name
                          : null}
                      </p>
                    </div>
                    {user?.role_type === 2 ? (
                      <div className="form__group half__field">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Enter your Last name"
                          value={values?.last_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="error-msg">
                          {errors.last_name && touched.last_name
                            ? errors.last_name
                            : null}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="form__group half__field">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        placeholder="jakobmango12@gmail.com"
                        value={values?.email}
                        onChange={(e) => {
                          handleChange(e);
                          handleEmail(e);
                        }}
                        onBlur={handleBlur}
                      />
                      <p className="error-msg">
                        {errors.email && touched.email ? errors.email : null}
                      </p>
                    </div>
                    <div className="form__group half__field">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone_no"
                        placeholder="+1 (111)11-111-111"
                        value={values.phone_no}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="error-msg">
                        {errors.phone_no && touched.phone_no
                          ? errors.phone_no
                          : null}
                      </p>
                    </div>
                    <div className="form__group half__field">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        placeholder="dd-mm-yyyy"
                        value={values?.dob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <p className="error-msg">
                        {errors.dob && touched.dob ? errors.dob : null}
                      </p>
                    </div>
                    <div className="form__group half__field">
                      <label>Enter Your Institute</label>
                      <CreatableSelect
                        defaultValue={defaultInstituteValue}
                        components={{ animatedComponents, Placeholder }}
                        placeholder="Enter Your Institute Name"
                        options={institutes}
                        className="basic-multi-select"
                        onChange={(e) => {
                          setFieldValue("institute", e.label);
                        }}
                        noOptionsMessage=""
                        onBlur={handleBlur}
                        backspaceRemovesValue
                      />
                      <p className="error-msg">
                        {errors.institute && touched.institute
                          ? errors.institute
                          : null}
                      </p>
                    </div>
                    {user?.role_type === 2 ? (
                      <>
                        <div className="form__group full__field">
                          <label>Tell About Yourself</label>
                          <input
                            type="text"
                            name="about"
                            placeholder="Life is a process during which one initially gets less and less dependent, independent..."
                            value={values.about}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="error-msg">
                            {errors.about && touched.about
                              ? errors.about
                              : null}
                          </p>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                    <h4>Change Password</h4>
                    <div className="form__group full__field">
                      <label>Current Password</label>
                      <input
                        type={isRevealPwd ? "text" : "password"}
                        name="current_password"
                        placeholder="********"
                        value={values.current_password}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setPwd(e.target.value);
                          handleChange(e);
                        }}
                      />
                      <p className="error-msg">
                        {errors.current_password && touched.current_password
                          ? errors.current_password
                          : null}
                      </p>
                      <span
                        className="hideShowPassword"
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      >
                        {isRevealPwd ? openEye() : boldEye()}
                      </span>
                    </div>
                    <div className="form__group half__field">
                      <label>New Password</label>
                      <input
                        type={isRevealPwd ? "text" : "password"}
                        name="password"
                        placeholder="********"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setPwd(e.target.value);
                          handleChange(e);
                        }}
                      />
                      <p className="error-msg">
                        {errors.password && touched.password
                          ? errors.password
                          : null}
                      </p>
                      <span
                        className="hideShowPassword"
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      >
                        {isRevealPwd ? openEye() : boldEye()}
                      </span>
                    </div>
                    <div className="form__group half__field">
                      <label>Confirm Password</label>
                      <input
                        type={isRevealPwd ? "text" : "password"}
                        name="password_confirmation"
                        placeholder="********"
                        value={values.password_confirmation}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setPwd(e.target.value);
                          handleChange(e);
                        }}
                      />
                      <p className="error-msg">
                        {errors.password_confirmation &&
                        touched.password_confirmation
                          ? errors.password_confirmation
                          : null}
                      </p>
                      <span
                        className="hideShowPassword"
                        onClick={() =>
                          setIsRevealPwd((prevState) => !prevState)
                        }
                      >
                        {isRevealPwd ? openEye() : boldEye()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default Settings;
