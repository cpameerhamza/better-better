import React from 'react'
import "./filterSidebar.css"
import {getInstitutes, getInterests} from "../../../redux/thunks/Thunks";
import {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeFilter, downCart, submitArrow} from "../../../utils/SvgIcons";
import Select, {components} from "react-select";
import makeAnimated, { Input } from "react-select/animated";
const animatedComponents = makeAnimated();

export const FilterSidebar = ({ isFiltersActive, setFilter, setAppliedInstitute, setAppliedInterests, setFiltersApplied, appliedInterests }) => {
  const dispatch = useDispatch();
  const checkboxes = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));

  const [institutes, setInstitutes] = useState(null);
  const [interests, setInterests] = useState([]);

  const Placeholder = props => {
    return <components.Placeholder {...props} />;
  };
  const CaretDownIcon = () => {
    return downCart();
  };
  const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
            <CaretDownIcon />
        </components.DropdownIndicator>
    );
  };
  useEffect(() => {
    dispatch(getInstitutes({"role_type": user?.role_type})).then((response) => {
        const newArr = Object.keys(response?.payload.data).map(key => {
            return response?.payload.data[key];
        })
        setInstitutes(newArr);
    })
  }, []);
  useEffect( () => {
    dispatch(getInterests()).then((response) => {
        setInterests(response?.payload.data);
    })
  }, []);
  const handleInterest = (e) => {
    if(e.target.checked){
      console.log(e.target.name)
      setAppliedInterests([...appliedInterests, e.target.name])
    }
    else{
      const filtered = appliedInterests.filter((same) => e.target.name !== same)
      setAppliedInterests(filtered)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setFiltersApplied(true);
  }
  return (
    <>
    <div className={`match-filters ${isFiltersActive}`}>
       <div className='filter-header d__flex d__flex-v-center d__flex-h-between'>
          <h3>Filters</h3>
           <button type="button" className="closefilters" onClick={() => setFilter(false)}> {closeFilter()} </button>
       </div>
        <div className="filtes-body">
            <form onSubmit={handleSubmit}>
                <fieldset>
                  <div className="form-fields">
                     <div className="field-row">
                        <div className="field-col">
                            <strong>Select Institute</strong>
                            <Select
                                  closeMenuOnSelect={false}
                                  components={{animatedComponents, Placeholder , DropdownIndicator}}
                                  placeholder={"Enter"}
                                  options={institutes}
                                  className="select-institue"
                                  hideSelectedOptions={false}
                                  onChange={(e) => setAppliedInstitute(e.value)}
                              />
                        </div>
                     </div>
                     <div className="field-row">
                            <div className="field-col">
                                <strong>Select Interests</strong>
                                {
                                  Object.keys(interests).map((int, key) => (
                                      <div key={key} ref={checkboxes}>
                                          {interests[int].map((item, id) => (
                                            <>
                                              <label htmlFor={`sport-check-${item.value}`} className="d__flex-v-center d__flex checkbox-label">
                                                  <input
                                                      type="checkbox"
                                                      id={`sport-check-${item.value}`}
                                                      name={item.label}
                                                      value={item.value}
                                                      onChange={(e) => handleInterest(e)}
                                                  />
                                                  {item.label}
                                                </label>
                                              </> 
                                          ))}
                                      </div>
                                    ))
                                }
                            </div>
                         </div>
                 </div>
                  <div className="submit-filter">
                    <button type="submit">Apply Filters {submitArrow()} </button>
                  </div>
             </fieldset>
          </form>
       </div>
    </div> 
    </>
  )
}
export default FilterSidebar
