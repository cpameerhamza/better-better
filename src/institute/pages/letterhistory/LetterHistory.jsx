import Header from "../../../components/core/header/Header";
import Sidebar from "../../../components/core/sidebar/Sidebar";
import React, {useEffect, useRef, useState} from "react";
import './letterHistory.css'
import {backwardIcon, filterIcon, forwardIcon, lines, penpalAvatar} from "../../../utils/SvgIcons";
import AddLetterPopup from "../../components/letterPopup/AddLetterPopup";
import {useDispatch} from "react-redux";
import {getLettersHistory, markLetterSent, handlePagination, markLetterReceived} from "../../../redux/thunks/Thunks";
import {toast} from "react-toastify";
import Toaster from "../../../utils/Toaster";
import SimpleDateTime from "react-simple-timestamp-to-date";

const LetterHistory = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const [pages, setPages] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [active, setActive] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const [isLetterAdded, setIsLetterAdded] = useState(false);
    const [sentButtons, setSentButtons] = useState([]);
    const [receiveButtons, setReceiveButtons] = useState([]);

    const scroller = useRef();
    const handlePopup = () => {
        setShowPopup(true);
    }
    const handleLetterStatus = (status, record) => {
        if(status === 1){
            dispatch(markLetterSent({"token": token, "status": 1, "letter_id": record.id})).then((response) => {
                // console.log("current status", response);
                if(response?.payload.status === true){
                    toast.success("Letter is marked as sent.");
                    setActive(record);
                    setSentButtons([...sentButtons, record]);
                }
                else{
                    toast.error("Something went wrong. Please try again.");
                }
            })
        }
        else{
            dispatch(markLetterReceived({"token": token, "status": 3, "letter_id": record.id})).then((response) => {
                // console.log("current status", response);
                if(response?.payload.status === true){
                    toast.success("Letter is marked as received.");
                    setActive(record);
                    setReceiveButtons([...receiveButtons, record]);
                }
                else{
                    toast.error("Something went wrong. Please try again.");
                }
            })
        }   
    }
    useEffect(() => {
        dispatch(getLettersHistory({"token": token})).then((response) => {
            setHistory(response?.payload.data ? response?.payload.data?.data : []);
        });
    }, []);
    useEffect(() => {
        dispatch(getLettersHistory({"token": token})).then((response) => {
            setHistory(response?.payload.data ? response?.payload.data?.data : []);
            setIsLetterAdded(false);
            setPages(response?.payload?.data);
        });
    }, [isLetterAdded]);
    const handleSearch = (e) => {
        dispatch(getLettersHistory({"token": token, "search": searchTerm})).then((response) => {
            setHistory(response?.payload.data);
            setShowLoader(false);
            setPages(response?.payload?.data);
        });
    }
    const handlePage = (link) => {
        if(link?.label !== "..."){
            dispatch(getLettersHistory({token: token, pageLink: link?.url})).then((response) => {
                setHistory(response?.payload?.data.data);
                setShowLoader(false);
                scroller.current.scrollTo({top: 0,behavior: "smooth"});
            });
        }
    }
    return(
    <>
        <div className="dashboard__section d__flex">
            <div className="main__sidebar">
                <Sidebar />
            </div>
            <div className="main__body">
                <Header pageTitle="LETTER’S HISTORY" />
                <div className="main__body-content" ref={scroller}>
                    <div className="table-area">
                      <div className="letter-history-dashboard">
                          <div className="search-penpal-history d__flex d__flex-h-between d__flex-v-center">
                              <div className="search-penpal-history-content  ">
                                  <h6>Letters History</h6>
                                  <span>Manage your penpals status here</span>
                              </div>
                              <div className="filter-penpal-history">
                                  <div className="d__flex">
                                          <div className="submit-search add">
                                              <button type="button" onClick={handlePopup}>Add</button>
                                          </div>
                                          <form className="filter-row" onSubmit={handleSearch}>
                                              <div className="filter-col">
                                                  <input type="text"  placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
                                                  <button className="filtericon" type="submit">{filterIcon()}</button>
                                              </div>
                                          </form>
                                  </div>
                              </div>
                          </div>
                          <div className="result-penpal-history">
                              <table className="table small-desktop-responsive">
                                  <thead>
                                  <tr>
                                      <th>From</th>
                                      <th>To</th>
                                      <th>Date & Time</th>
                                      <th>Letter Status</th>
                                      <th>Change Status</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  {
                                      history.length ? history.map((record, key) => {
                                          return(
                                              <tr key={key} className="status">
                                                  <td data-label="From">
                                                      {
                                                          record?.sender.avatar ? <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${record.sender.avatar}`} /> : penpalAvatar()
                                                      }
                                                      <h6>{record?.sender.first_name} <br/> <span>{record?.sender.role_type === 1 ? "Student" : "Elder"}</span> </h6>
                                                  </td>
                                                  <td data-label="To">
                                                    { record?.receiver?.avatar ? <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${record?.receiver.avatar}`} /> : penpalAvatar()}
                                                    <h6>{record?.receiver.first_name}  <br/>  <span>{record?.receiver.role_type === 1 ? "Student" : "Elder"}</span> </h6>
                                                  </td>
                                                  <td data-label="Date & Time">
                                                    <span className="uppercase">
                                                        <SimpleDateTime dateSeparator="-" dateFormat="DMY" showTime="0" showDate="1">{record?.created_at}</SimpleDateTime>
                                                        &nbsp; : &nbsp;
                                                        <SimpleDateTime timeSeparator=":" dateSeparator="-" showTime="1" showDate="0" meridians="1" format="DMY">{record?.created_at}</SimpleDateTime>
                                                    </span>
                                                  </td>
                                                  <td
                                                    data-label="Letter Status"
                                                    className={
                                                        sentButtons.includes(record) && user?.id === record?.sender?.institute_id && record?.status === 2 ? "successfull" : "" ||
                                                        receiveButtons.includes(record) || user?.id !== record?.sender?.institute_id && record?.status === 3 ? "successfull" : "" ||
                                                        user?.id === record?.sender?.institute_id && record?.status === 2 ? "pending" : "" ||
                                                        user?.id === record?.sender?.institute_id && record?.status === 1 ? "successfull" : "" ||
                                                        user?.id !== record?.sender?.institute_id && record?.status === 3 ? "successfull" : "" ||
                                                        user?.id === record?.sender?.institute_id && record?.status === 3 ? "successfull" : "" ||
                                                        user?.id !== record?.sender?.institute_id && record?.status === 1 ? "pending" : ""
                                                    }
                                                >
                                                    <span>
                                                        {
                                                            sentButtons.includes(record) && user?.id === record?.sender?.institute_id && record?.status === 2 ? "Sent" : "" ||
                                                            receiveButtons.includes(record) || user?.id !== record?.sender?.institute_id && record?.status === 3 ? "Received" : "" ||
                                                            user?.id === record?.sender?.institute_id && record?.status === 2 ? "Pending" : "" ||
                                                            user?.id === record?.sender?.institute_id && record?.status === 3 ? "Received" : "" ||
                                                            user?.id === record?.sender?.institute_id && record?.status === 1 ? "Sent" : "" ||
                                                            user?.id !== record?.sender?.institute_id && record?.status === 1 ? "To be received" : "" ||
                                                            user?.id !== record?.sender?.institute_id && record?.status === 3 ? "Received" : ""
                                                        }
                                                    </span>
                                                </td>
                                                <td  data-label="Change Status"  className="Letter Status">
                                                    {
                                                        !sentButtons.includes(record) && 
                                                        user?.id === record?.sender?.institute_id && record?.status === 2 ?
                                                        <button type="button" onClick={() => handleLetterStatus(1, record)}>Mark as sent</button> : ""
                                                    }
                                                    {
                                                        user?.id === record?.sender?.institute_id && record?.status === 3 ||
                                                        user?.id === record?.sender?.institute_id && record?.status === 1 ||
                                                        user?.id !== record?.sender?.institute_id && record?.status === 3 && ""
                                                    }                                                    
                                                    {
                                                        !receiveButtons.includes(record) &&
                                                        user?.id !== record?.sender?.institute_id && record?.status === 1 ?
                                                        <button type="button" onClick={() => handleLetterStatus(3, record)}>Mark as received</button> : ""
                                                    }
                                                </td>
                                              </tr>
                                          )
                                      }) :
                                          <tr>
                                              <td colSpan={6}>
                                                    <div className="loading-results">
                                                        {
                                                            showLoader ?
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
                                                        // link?.label === "4" ? "..." : link?.label === "..." ? "11" : link?.
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
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <Toaster />
        {
            showPopup ? <AddLetterPopup showPopup={showPopup} setShowPopup={setShowPopup} setIsLetterAdded={setIsLetterAdded} /> : null
        }
    </>
    )
}
export default  LetterHistory
