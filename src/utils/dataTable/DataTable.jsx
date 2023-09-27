import {useDispatch, useSelector} from "react-redux";
import "./dataTable.css";
import {backwardIcon, closeFilter, down, filterIcon, forwardIcon, lines, penpalAvatar, submitArrow} from "../SvgIcons";
import React, {useEffect, useRef, useState} from "react";
import {userPenpalHistory, handlePagination} from "../../redux/thunks/Thunks";
import FilterSidebar from "../../components/core/filters/FilterSidebar";
import Toaster from "../../utils/Toaster";
import SimpleDateTime from "react-simple-timestamp-to-date";

const DataTable = ({setIsScrolled}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [history, setHistory] = useState([]);
    const [data, setData] = useState([]);
    const [isEmpty, setEmpty] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [filter, setFilter] = useState(false);
    const [appliedInstitute, setAppliedInstitute] = useState(null);
    const [appliedInterests, setAppliedInterests] = useState([]);
    const [isFiltersApplied, setFiltersApplied] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [pages, setPages] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [name, setName] = useState(null);
    const [date, setDate] = useState(null);

    useEffect(() => {
        dispatch(userPenpalHistory({token: token, pageName: "users-pen-pals-history"})).then((response) => {
            setHistory(response?.payload.data.data);
            setData(response?.payload.data.data);
            setPages(response?.payload.data);
            setShowLoader(false);
        })
    }, []);

    useEffect(() => {
        if(isFiltersApplied === true){
            dispatch(userPenpalHistory({token: token, institute_id: appliedInstitute, interest: appliedInterests.join(' ') })).then((response) => {
                setHistory(response?.payload.data.data);
                setData(response?.payload.data.data);
                setPages(response?.payload.data);
                setFiltersApplied(false);
                setShowLoader(false)
            });
        }
    }, [isFiltersApplied]);
    useEffect(() => {
        history.length ? setEmpty(true) : setEmpty(false);
    }, [history]);
    const handleSearch = () => {
        dispatch(userPenpalHistory({token: token, search: searchQuery})).then((response) => {
            setHistory(response?.payload?.data.data);
            setData(response?.payload?.data.data);
            setShowLoader(false);
            setPages(response?.payload.data);
        })
    }
    const showFilter = () => {
        setFilter(!filter);
    }
    const handlePage = (link) => {
        if(link?.label !== "..."){
            dispatch(handlePagination({token: token, pageLink: link?.url})).then((response) => {
                setHistory(response?.payload?.data.data);
                setData(response?.payload?.data.data);
                setShowLoader(false);
                setIsScrolled(true);
                setActivePage(link);
            })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userPenpalHistory({token: token, name: name, registration_date: date})).then((response) => {
            setHistory(response?.payload.data.data);
            setData(response?.payload.data.data);
            setPages(response?.payload.data);
            setShowLoader(false);
        });
      }
      const closeFilters = () => {
        setFilter(false);
      }
    return (
        <>
        <div className='penpal-history-dashboard'>
            <div className="search-penpal-history d__flex d__flex-h-between d__flex-v-center">
                <div className="search-penpal-history-content  ">
                    <h6>Penpal’s History</h6>
                    <span>Manage your penpal’s letters history here.</span>
                </div>
                <div className="filter-penpal-history">
                    <div>
                        <fieldset className="d__flex">
                            <div className="filter-row">
                                <div className="filter-col">
                                    <form onSubmit={handleSearch}>
                                        <input type="text" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
                                        <button className="filtericon" type="submit">{filterIcon()}</button>
                                    </form>
                                </div>
                            </div>
                            <div className="submit-search ">
                                <button type="button" onClick={showFilter}>{lines()} Filters</button>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
            {
                history.length ?
                    <>
                        <div className="result-penpal-history">
                            <table className="table responsive">
                                <thead>
                                <tr>
                                    <th>Receiver Name</th>
                                    <th>Status {down()}</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {
                                        history.length ? history.map((record, key) => {
                                            return(
                                                <tr key={key} className="status successfull">
                                                    <td data-label="Receiver Name" >
                                                        {record?.receiver?.avatar ? <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${record?.receiver?.avatar}`} /> : penpalAvatar()}
                                                        <h6>
                                                            {
                                                                user?.role_type === 1 && record?.receiver.role_type === 2 ?
                                                                record?.receiver.first_name + " " + record?.receiver.last_name :
                                                                record?.receiver.first_name
                                                            }
                                                        </h6>
                                                    </td>
                                                    <td data-label="Status" className={`${record?.status === 1 || record?.status === 3 ? "successfull" : "pending"}`}><span>{record.status === 1 ? "Received" : record.status === 2 ? "Pending" : "Received"}</span></td>
                                                    <td data-label="Date">
                                                        <span>
                                                            <SimpleDateTime dateSeparator="-" dateFormat="DMY" showTime="0" showDate="1">{record?.created_at}</SimpleDateTime>
                                                        </span>
                                                    </td>
                                                    <td data-label="Time">
                                                        <span className="uppercase">
                                                            <SimpleDateTime timeSeparator=":" dateSeparator="-" showTime="1" showDate="0" meridians="1" format="DMY">{record?.created_at}</SimpleDateTime>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan={4} className="content-loader">
                                                {
                                                showLoader ?
                                                    <>
                                                        <div className="holder">
                                                            Loading
                                                            <div className="loading-results-animation">
                                                                <div></div>
                                                                <div></div>
                                                                <div></div>
                                                            </div>
                                                        </div>
                                                    </>
                                                : "No records found."
                                                }
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="search-penpal-history-pagnation d__flex d__flex-h-between d__flex-v-center">
                              <div className="move">
                                  <button type="button"
                                    onClick={() => handlePage(pages && pages?.links[0])}
                                    disabled={pages && pages?.links[0]?.url ? false : true}>
                                    {backwardIcon()} {pages && pages?.links[0]?.label.replace("&laquo; ", "")}
                                  </button>
                              </div>
                              <ul className="d__flex jump-to-history">
                                {
                                    pages && pages?.links.map((link, key) => {
                                        return(
                                            <li key={key} className={activePage === link ? "active-history" : ""}>
                                                <button type="button" onClick={() => handlePage(link)}>
                                                    {
                                                        // link?.label === "4" ? "..." : link?.label === "..." ? "11" : link?.label
                                                        link?.label
                                                    }
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                              </ul>
                              <div className="move">
                                  <button type="button"
                                    onClick={() => handlePage(pages && pages?.links[pages.links.length-1])}
                                    disabled={pages && pages?.links[pages.links.length-1]?.url ? false : true}
                                >
                                    {pages && pages?.links[pages.links.length-1]?.label.replace(" &raquo;", "")} {forwardIcon()}
                                </button>
                                  
                              </div>
                        </div>
                    </>
                    :
                    <div className="content-loader">
                        {
                        showLoader ?
                            <>
                                <div className="holder">
                                    Loading
                                    <div className="loading-results-animation">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </>
                        :
                        <div class="loading-results">No records found.</div>
                        }
                    </div>
                     // : !isEmpty ? <span className="no-record-found">No record found </span>  : ""
                }
            </div>
            {/* <FilterSidebar
                isFiltersActive={`${filter==true ? "show-filter" : ""} `}
                setFilter={setFilter}
                setAppliedInstitute={setAppliedInstitute}
                setAppliedInterests={setAppliedInterests}
                setFiltersApplied={setFiltersApplied}
                appliedInterests={appliedInterests}
            /> */}
            <div className={`match-filters ${filter ? "show-filter" : ""}`}>
                <div className='filter-header d__flex d__flex-v-center d__flex-h-between'>
                    <h3>Filters</h3>
                    <button type="button" className="closefilters" onClick={closeFilters}>{closeFilter()}</button>
                </div>
                <div className="filtes-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="form-fields">
                                <div className="field-row">
                                    <div className="field-col">
                                        <strong>Receiver Name</strong>
                                        <input type="text" placeholder="Enter" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field-row">
                                    <div className="field-col">
                                        <strong>Enter Date</strong>
                                        <input type="date" placeholder="dd-mm-yyyy" onChange={(e) => setDate(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="submit-filter">
                                <button type="submit">Apply Filters {submitArrow()}</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div> 
            <Toaster />
        </>
    )
}

export default DataTable