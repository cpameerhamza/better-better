import Header from "../../../components/core/header/Header";
import Sidebar from "../../../components/core/sidebar/Sidebar";
import SimpleDateTime  from 'react-simple-timestamp-to-date';
import  "./instituteDashboard.css";
import {backwardIcon, eye, filterIcon, filterStatus, forwardIcon, lines, penpalAvatar} from "../../../utils/SvgIcons";
import React, {useEffect, useRef, useState} from "react";
import Card from "../../../components/core/card/Card";
import FilterSidebar from "../../components/filters/FilterSidebar";
import { useDispatch } from "react-redux";
import { getStudentsCount, registeredOnPenpals, lettersSentCount, lettersReceivedCount, getStudentsHistory, handlePagination } from "../../../redux/thunks/Thunks";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Toaster from "../../../utils/Toaster";

const InstituteDashboard = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const [isFiltersActive, setFiltersActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [history, setHistory] = useState([]);
    const [pages, setPages] = useState(null);
    const [studentsCounter, setStudentsCounter] = useState(null);
    const [registeredCounter, setRegisteredCounter] = useState(null);
    const [lettersSentCounter, setLettersSentCounter] = useState(null);
    const [lettersReceivedCounter, setLettersReceivedCounter] = useState(null);
    const [studentsHistory, setStudentsHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const [isFilterApplied, setIsFilterApplied] = useState([]);
    const scroller = useRef();

    useEffect(() => {
        dispatch(getStudentsCount({"token": token })).then((response) => {
            setStudentsCounter(response?.payload.data);
        });
        dispatch(registeredOnPenpals({"token": token})).then((response) => {
            setRegisteredCounter(response?.payload.data)
        });
        dispatch(lettersSentCount({"token": token})).then((response) => {
            setLettersSentCounter(response?.payload.data)
        });
        dispatch(lettersReceivedCount({"token": token})).then((response) => {
            setLettersReceivedCounter(response?.payload.data)
        });
        dispatch(getStudentsHistory({"token": token})).then((response) => {
            setStudentsHistory(response?.payload.data.data);
            setPages(response?.payload?.data);
            setShowLoader(false);
        });
    }, []);
    const showFilter = () => {
        setFiltersActive(!isFiltersActive);
    }
    const disableRecords = studentsHistory.filter((record) => {
        return record?.is_blocked === 1
    })
    const activeRecords = studentsHistory.filter((record) => {
        return record?.is_blocked === 0
    })
    const handleSearch = (e) => {
        dispatch(getStudentsHistory({"token": token, "search": searchTerm})).then((response) => {
            setStudentsHistory(response?.payload.data.data);
            setShowLoader(false);
            setPages(response?.payload?.data);
        });
    }
    useEffect(() => {
        setStudentsHistory(isFilterApplied);
        setShowLoader(false);
    }, [isFilterApplied])
    const handlePage = (link) => {
        dispatch(getStudentsHistory({token: token, pageLink: link?.url})).then((response) => {
            setStudentsHistory(response?.payload.data.data);
            setPages(response?.payload?.data);
            setShowLoader(false);
            scroller.current.scrollTo({top: 0,behavior: "smooth"});
        });
    }

    return(
        <>
            <div className="dashboard__section d__flex">
                <div className="main__sidebar">
                    <Sidebar />
                </div>
                <div className="main__body">
                    <Header pageTitle="HOME" />
                    <div className="main__body-content" ref={scroller}>
                        <div className="cards__box student__cards-box d__flex d__flex-h-between gap-2">
                            <Card title={user?.role_type === 1 ? "Total Students" : "Total Elderly People"} number={studentsCounter} />
                            <Card title="Registered on Penpal" number={registeredCounter} />
                            <Card title="Penpal Letters Sent" number={lettersSentCounter} />
                            <Card title="Penpal Letters Received" number={lettersReceivedCounter}  />
                        </div>
                        <div className="table-area">
                            <div className="institute-dashboard">

                                <div className="search-penpal-history d__flex d__flex-h-between d__flex-v-center">
                                    <div className="search-penpal-history-content">
                                        <h6>
                                            {
                                                user?.role_type === 1 ? "Student’s Penpal History" : "Elder’s Penpal History"
                                            }
                                        </h6>
                                        <span>
                                            {
                                                user?.role_type === 1 ? "Manage your students penpal’s letters history here." : "Manage your elders penpal’s letters history here."
                                            }
                                        </span>
                                    </div>
                                    <div className="filter-penpal-history">
                                        <form onSubmit={handleSearch}>
                                            <fieldset className="d__flex">
                                                <div className="filter-row">
                                                    <div className="filter-col">
                                                        <input type="text"  placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                                                        <button className="filtericon" type="submit">{filterIcon()}</button>
                                                    </div>
                                                </div>
                                                <div className="submit-search ">
                                                    <button type="submit" onClick={showFilter}> {lines()} Filters</button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                                <div className="result-penpal-history">
                                    <table className="table small-desktop-responsive">
                                        <thead>
                                        <tr>
                                            <th>
                                                {
                                                    user?.role_type === 1 ? "Students Name" : "Elders Name"
                                                }
                                            </th>
                                            <th>Status {filterStatus()} </th>
                                            <th>Reg. Date</th>
                                            <th>Letters Sent</th>
                                            <th>Letters Received</th>
                                            {
                                                user?.role_type === 1  && <th>Actions</th>
                                            }
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            studentsHistory.length ? studentsHistory.map((record, key) => {
                                                return(
                                                    <tr key={key} className="status">
                                                        <td data-label={ user?.role_type === 1 ? "Students Name" : "Elders Name" }>
                                                            {
                                                                user?.role_type === 1 ? penpalAvatar() : <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${record?.avatar}`} />
                                                            }
                                                            <h6>{record?.first_name}</h6>
                                                        </td>
                                                        <td data-label="Status" className={`${record?.is_blocked ? "disabled" : "successfull"}`}><span>{record?.is_blocked ? "Disabled" : "Active"}</span></td>
                                                        <td data-label="Reg. Date">
                                                            <SimpleDateTime dateSeparator="-" dateFormat="DMY" showTime="0" showDate="1">{record?.created_at}</SimpleDateTime>
                                                        </td>
                                                        <td data-label="Letters Sent">{record?.letters_sent_count}</td>
                                                        <td data-label="Letters Received">{record?.letter_received_count}</td>
                                                        {
                                                            user?.role_type === 1  && <td data-label="Actions"><Link to={`/student-history`}>{eye()}</Link></td>
                                                        }
                                                    </tr>
                                                )
                                            }) :
                                            <tr>
                                                <td colSpan={6}>
                                                    <div className="loading-results">
                                                        {
                                                            showLoader && !studentsHistory.length ?
                                                            <>
                                                                Loading
                                                                <div className="loading-results-animation">
                                                                    <div></div>
                                                                    <div></div>
                                                                    <div></div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>    
                                                                No records found.
                                                            </>
                                                        }
                                                    </div>
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
                                                    <li key={key} className={link?.active ? "active-history" : ""}>
                                                        <button type="button" onClick={() => handlePage(link)}>
                                                            {
                                                                link?.label === "4" ? "..." : link?.label === "..." ? "11" : link?.label
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FilterSidebar isFiltersActive={isFiltersActive} setFiltersActive={setFiltersActive} setIsFilterApplied={setIsFilterApplied} />
            <Toaster />
        </>
    )
}
export default  InstituteDashboard
