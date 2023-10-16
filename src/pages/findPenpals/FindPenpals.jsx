import "./findPenpals.css";
import Sidebar from "../../components/core/sidebar/Sidebar";
import Header from "../../components/core/header/Header";
import { connectIcon, filtersIcon, locationIcon } from "../../utils/SvgIcons";
import React, { useEffect, useState } from "react";
import FilterSidebar from "../../components/core/filters/FilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import { findPenpals } from "../../redux/thunks/Thunks";
import BestMatch from "./bestMatch/BestMatch";

const FindPenpals = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [matchedPenpals, setMatchedPenpals] = useState(null);
  const [filter, setFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(null);
  const [appliedInstitute, setAppliedInstitute] = useState(null);
  const [appliedState, setAppliedState] = useState([]);
  const [appliedlanguages, setAppliedLanguages] = useState([]);
  const [appliedInstrument, setAppliedInstrument] = useState([]);
  const [appliedInterests, setAppliedInterests] = useState([]);
  const [appliedPets, setAppliedPets] = useState([]);
  const [appliedSubjects, setAppliedSubjects] = useState([]);
  const [appliedSeason, setAppliedSeason] = useState(null);
  const [travel, setTravel] = useState(false);
  const [military, setMilitary] = useState(false);
  const [isFiltersApplied, setFiltersApplied] = useState(false);
  useEffect(() => {
    if (user) {
      setLoading(true);
      dispatch(findPenpals({ token: token })).then((response) => {
        setLoading(false);
        setMatchedPenpals(response?.payload.data);
        response?.payload.data.length ? setEmpty(true) : setEmpty(false);
      });
    }
  }, []);
  useEffect(() => {
    if (isFiltersApplied === true) {
      setFilter(false);
      setLoading(true);
      setFiltersApplied(false);
      dispatch(
        findPenpals({
          token: token,
          institute: appliedInstitute,
          states: appliedState,
          langauges: appliedlanguages,
          instruments: appliedInstrument,
          interests: appliedInterests,
          pets: appliedPets,
          subjects: appliedSubjects,
          season: appliedSeason,
          like_to_travel: travel,
          military: military,
        })
      ).then((response) => {
        setLoading(false);
        setMatchedPenpals(response?.payload.data);
        response?.payload.data.length ? setEmpty(true) : setEmpty(false);
        setFiltersApplied(false);
      });
    }
  }, [isFiltersApplied]);
  const showFilter = () => {
    setFilter(!filter);
  };
  return (
    <>
      <div className="dashboard__section d__flex">
        <div className="main__sidebar">
          <Sidebar />
        </div>
        <div className="main__body">
          <Header pageTitle="Find Penpals" />
          <div className="main__body-content">
            <div className="matches-holder">
              <header className="header d__flex d__flex-v-center  d__flex-h-between">
                <h3>Best Match</h3>
                <button
                  type="button"
                  className="filter-match"
                  onClick={showFilter}
                >
                  {filtersIcon()} Filters
                </button>
              </header>
              <div className="matches-list">
                {loading ? (
                  <div className="loading-results">
                    Loading
                    <div className="loading-results-animation">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : matchedPenpals && matchedPenpals.length ? (
                  matchedPenpals.map((penpal, key) => {
                    return (
                      <>
                        <BestMatch penpal={penpal} key={key} />
                      </>
                    );
                  })
                ) : !isEmpty ? (
                  <span className="no-record-found">No record found </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FilterSidebar
        isFiltersActive={`${filter == true ? "show-filter" : ""} `}
        setFilter={setFilter}
        setAppliedInstitute={setAppliedInstitute}
        setAppliedInterests={setAppliedInterests}
        setFiltersApplied={setFiltersApplied}
        setAppliedState={setAppliedState}
        setAppliedLanguages={setAppliedLanguages}
        setAppliedInstrument={setAppliedInstrument}
        setAppliedPets={setAppliedPets}
        setAppliedSubjects={setAppliedSubjects}
        setAppliedSeason={setAppliedSeason}
        setTravel={setTravel}
        setMilitary={setMilitary}
      />
    </>
  );
};

export default FindPenpals;
