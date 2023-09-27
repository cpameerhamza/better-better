import "./filterSidebar.css"
import {closeFilter, downCart, submitArrow} from "../../../utils/SvgIcons";
import Select, {components} from "react-select";
import React, { useState } from "react";
import makeAnimated, { Input } from "react-select/animated";
import { useDispatch } from "react-redux";
import { getStudentsHistory } from "../../../redux/thunks/Thunks";
const animatedComponents = makeAnimated();
const FilterSidebar =({isFiltersActive, setFiltersActive, setIsFilterApplied})=>{
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const statuses = [{value:'active', label:'Active'},{value:'disabled', label:'Disabled'}];
    const [elderName, setElderName] = useState(null);
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState("active");

    const Placeholder = props => {
        return <components.Placeholder {...props} />;
    };
    const DropdownIndicator = props => {
        return (
            <components.DropdownIndicator {...props}>
                <CaretDownIcon />
            </components.DropdownIndicator>
        );
    };
    const CaretDownIcon = () => {
        return downCart();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getStudentsHistory({token: token, elder_name: elderName, registration_date: date, status: status})).then((response) => {
            console.log("res", response);
            setIsFilterApplied(response?.payload?.data.data)
        });
    }
    return(
        <>
            <div className={`match-filters institute-filter ${isFiltersActive === true ? "show-filter" : ""}`}>
                <div className='filter-header d__flex d__flex-v-center d__flex-h-between'>
                    <h3>Filters</h3>
                    <button type="button" className="closefilters" onClick={() => setFiltersActive(false)}> {closeFilter()} </button>
                </div>
                <div className="filtes-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="form-fields">
                                <div className="field-row">
                                    <div className="field-col">
                                        <strong>{user?.isInstitute && user?.role_type === 1 ? "Student Name" : "Elder Name"}</strong>
                                        <input type="name" placeholder="Enter" name="elder-name" onChange={(e) => setElderName(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-col">
                                        <strong>Registration Date</strong>
                                        <input type="date" onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-col">
                                        <strong>Status</strong>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={{animatedComponents, Placeholder , DropdownIndicator}}
                                            placeholder={"Active"}
                                            options={statuses}
                                            className="select-institue"
                                            hideSelectedOptions={false}
                                            onChange={(e) => setStatus(e.value)}
                                        />
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