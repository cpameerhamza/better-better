import { searchIcon } from "../../../utils/SvgIcons";
import { useFormik } from "formik";
import Toaster from "../../../utils/Toaster";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInterests } from "../../../redux/thunks/Thunks";
import { Link } from "react-router-dom";

const StepTwo = ({ formKeys, step }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const checkboxes = useRef();
  const dispatch = useDispatch();
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [interestError, setInterestError] = useState("");
  const [checkedInterests, setCheckedInterests] = useState([]);
  const [checked, setChecked] = useState([]);
  const [state, setState] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);

  const { values, handleSubmit } = useFormik({
    initialValues: formKeys,
    onSubmit: (values, e) => {
      step((step) => step + 1);
    },
  });

  useEffect(() => {
    console.log("step one values:", formKeys?.dob);

    dispatch(getInterests()).then((response) => {
      setInterests(response?.payload.data);
    });
  }, []);

  const handleCheckboxes = (e, key, itemValue) => {
    if (e.target.checked) {
      setSelectedInterests([...selectedInterests, e.target.name]);
      setCheckedInterests([...checkedInterests, itemValue]);
      // values.interest_ids = checkedInterests
    } else {
      const filtered = selectedInterests.filter(
        (same) => e.target.name !== same
      );
      setSelectedInterests(filtered);
      // console.log(filtered)
    }
  };
  useEffect(() => {
    values.interest_ids = checkedInterests;
  }, [checkedInterests]);

  const handleNext = () => {
    // selectedInterests.length === 0
    //   ? setInterestError("Please select at least one interest.")
    //   : setInterestError("");
  };
  const handlePrevious = () => {
    step((step) => step - 1);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getInterests({ search: searchTerm })).then((response) => {
      setInterests(response?.payload.data);
      console.log("search called.", response?.payload);
    });
  };
  return (
    <div className="forms-area">
      <form onSubmit={handleSearch} className="form__search">
        <button type="submit" className="form__search-btn">
          {searchIcon()}
        </button>
        <input
          type="text"
          placeholder="Search for interests"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <form onSubmit={handleSubmit} className="registration-process-steps">
        <section className="signup__section signup__step-two signup__form">
          <div className="signup__content">
            {/* Step From Two */}
            <div className="signupform__step-two">
              <div className="user__interests selected__user-interest">
                <div className="user__interest-box">
                  <h4>Added by you</h4>
                  <div className="user__interest-items d__flex gap-1">
                    {selectedInterests && selectedInterests.length
                      ? selectedInterests.map((tag, key) => {
                          return (
                            <div key={key} className="selected-tag">
                              {tag}
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
              {Object.keys(interests).map((int, key) => (
                <div
                  key={key}
                  ref={checkboxes}
                  className="user__interests select__user-interest"
                >
                  <h4>{int}</h4>
                  <div className="user__interest-items d__flex gap-1">
                    {interests[int].map((item, id) => (
                      <div key={id} className="user__interest-item">
                        <input
                          type="checkbox"
                          id={`sport-check-${item.value}`}
                          name={item.label}
                          value={item.value}
                          onChange={(e) => {
                            handleCheckboxes(e, key, item.value);
                          }}
                        />
                        <label htmlFor={`sport-check-${item.value}`}>
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <p className="interest__error">
                {interestError !== null ? interestError : null}
              </p>
            </div>
          </div>
        </section>
        <div className="signup__form-submit">
          <div className="submit__btn-container d__flex d__flex-h-between">
            <Link to="/" className="signup__cancel-btn">
              Cancel
            </Link>
            {user && user?.isInstitute ? (
              ""
            ) : (
              <p>
                Already have an account?<Link to="/login">Log in</Link>
              </p>
            )}
            <div className="multi-button">
              <button
                type="button"
                onClick={handlePrevious}
                className="signup__previous-btn"
              >
                Previous
              </button>
              <button
                type="submit"
                onClick={handleNext}
                className="signup__next-btn"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default StepTwo;
