import React from "react";
import "./filterSidebar.css";
import {
  getInstitutes,
  getInterests,
  getStates,
  getInstruments,
  getPets,
  getLanguages,
  getSubjects,
} from "../../../redux/thunks/Thunks";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeFilter, downCart, submitArrow } from "../../../utils/SvgIcons";
import Select, { components } from "react-select";
import makeAnimated, { Input } from "react-select/animated";
const animatedComponents = makeAnimated();

export const FilterSidebar = ({
  isFiltersActive,
  setFilter,
  setAppliedInstitute,
  setAppliedInterests,
  setFiltersApplied,
  setAppliedState,
  setAppliedLanguages,
  setAppliedInstrument,
  setAppliedPets,
  setAppliedSubjects,
  setAppliedSeason,
  setTravel,
  setMilitary,
}) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [institutes, setInstitutes] = useState(null);
  const [states, setStates] = useState([]);
  const [interests, setInterests] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [pets, setPets] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [interest, setInterest] = useState([]);
  const [seasons] = useState([
    { value: "summer", label: "Summer" },
    { value: "winter", label: "Winter" },
  ]);
  const [isMulti, setMulti] = useState(true);

  const Placeholder = (props) => {
    return <components.Placeholder {...props} />;
  };
  const CaretDownIcon = () => {
    return downCart();
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
  useEffect(() => {
    dispatch(getInstitutes({ role_type: user?.role_type })).then((response) => {
      const newArr = Object.keys(response?.payload.data).map((key) => {
        return response?.payload.data[key];
      });
      setInstitutes(newArr);
    });
    dispatch(getSubjects()).then((response) => {
      setSubjects(response?.payload);
    });
    dispatch(getStates()).then((response) => {
      setStates(response?.payload.data);
    });
    dispatch(getInstruments()).then((response) => {
      setInstruments(response?.payload.data);
    });
    dispatch(getPets()).then((response) => {
      setPets(response?.payload.data);
    });
    dispatch(getLanguages()).then((response) => {
      setLanguages(response?.payload.data);
    });
  }, []);
  useEffect(() => {
    dispatch(getInterests()).then((response) => {
      var result = Object.keys(response?.payload?.data).map(
        (key) => response?.payload?.data[key]
      );
      setInterests(result?.flat());
    });
  }, []);

  const handleInstruments = (e) => {
    if (isMulti) {
      let x = e.filter((item) => item.label === "None");
      if (x?.length > 0) {
        setMulti(false);
        setAppliedInstrument([x[0]?.value]);
        setInterest(x);
      } else {
        setMulti(true);
        setInterest(e);
        setAppliedInstrument(e.map((item) => item.value));
      }
    } else {
      if (e.label === "None") {
        setMulti(false);
        setAppliedInstrument([e?.value]);
        setInterest(e);
      } else {
        setInterest(e);
        setMulti(true);
        setAppliedInstrument([e?.value]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltersApplied(true);
  };
  return (
    <>
      <div className={`match-filters ${isFiltersActive}`}>
        <div className="filter-header d__flex d__flex-v-center d__flex-h-between">
          <h3>Filters</h3>
          <button
            type="button"
            className="closefilters"
            onClick={() => setFilter(false)}
          >
            {" "}
            {closeFilter()}{" "}
          </button>
        </div>
        <div className="filtes-body">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div className="form-fields">
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Institute</strong>
                    <Select
                      closeMenuOnSelect={true}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Institute"}
                      options={institutes}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedInstitute(e.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select State</strong>
                    <Select
                      isMulti
                      isClearable={false}
                      closeMenuOnSelect={false}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select State"}
                      options={states}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedState(e.map((item) => item.value));
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Languages</strong>
                    <Select
                      isMulti
                      isClearable={false}
                      closeMenuOnSelect={false}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Language"}
                      options={languages}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedLanguages(e.map((item) => item.value));
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Instruments</strong>
                    <Select
                      value={interest}
                      isMulti={isMulti}
                      isClearable={false}
                      closeMenuOnSelect={true}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Instrument"}
                      options={instruments}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        handleInstruments(e);
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Interests</strong>
                    <Select
                      closeMenuOnSelect={false}
                      isMulti
                      isClearable={false}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Interest"}
                      options={interests}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedInterests(e.map((item) => item.value));
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Pets</strong>
                    <Select
                      closeMenuOnSelect={true}
                      isMulti
                      isClearable={false}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Pet"}
                      options={pets}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedPets(e.map((item) => item.value));
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Favourite Subjects</strong>
                    <Select
                      closeMenuOnSelect={true}
                      isMulti
                      isClearable={false}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Subjects"}
                      options={subjects}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedSubjects(e.map((item) => item.value));
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Select Season</strong>
                    <Select
                      closeMenuOnSelect={true}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Select Season"}
                      options={seasons}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setAppliedSeason(e.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Do you have a passion for travelling?</strong>
                    <Select
                      closeMenuOnSelect={true}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Enter Answer"}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setTravel(e.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field-col">
                    <strong>Have you had a military background?</strong>
                    <Select
                      closeMenuOnSelect={true}
                      components={{
                        animatedComponents,
                        Placeholder,
                        DropdownIndicator,
                      }}
                      placeholder={"Enter Answer"}
                      options={[
                        { value: true, label: "Yes" },
                        { value: false, label: "No" },
                      ]}
                      className="basic-multi-select"
                      hideSelectedOptions={false}
                      onChange={(e) => {
                        setMilitary(e.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="emptyDiv" />
              <div className="filter-submit-button-float">
                <hr />
                <div className="submit-filter">
                  <button type="submit">Apply Filters {submitArrow()} </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};
export default FilterSidebar;
