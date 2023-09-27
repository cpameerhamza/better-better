import Sidebar from "../../../../components/core/sidebar/Sidebar";
import Header from "../../../../components/core/header/Header";
import React, {useEffect, useState} from "react";
import {letter, penpalAvatar, searchMessage, smallDot, threeDots} from "../../../../utils/SvgIcons";
import {NavLink} from "react-router-dom";
import {disconnectPenpal, getSinglePenpalHistory, myPenpals, getStudentsHistory, singleStudentHistory} from "../../../../redux/thunks/Thunks";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Toaster from "../../../../utils/Toaster";

const StudentHistory = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [disconnect, setDisconnect] = useState(false);
    const [penpals, setPenpals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [singlePenpalHistory, setPenpalHistory] = useState(null);
    const [selectedPenpal, setSelectedPenpal] = useState(null);
    const [isEmpty, setEmpty] = useState();
    const [noRecord, setNoRecord] = useState(false);
    const allPenpals = useSelector(state => state.myPenpals);
    const toggleDisconnect = (clickedPenpal) => {
        // console.log(clickedPenpal)
        setDisconnect(clickedPenpal);
    }
    useEffect(() => {
        setLoading(true)
        dispatch(getStudentsHistory({token})).then((response) => {
            setLoading(false);
            setPenpals(response?.payload.data.data)
            // console.log("api response", response);
        })
    }, [])
    useEffect(() => {
        penpals?.length ? setEmpty(true) : setEmpty(false);
    }, [allPenpals]);

    const getPenpalHistory = (penpal) => {
        if(penpal?.students_penpal.length){
            dispatch(singleStudentHistory({"user_id": penpal?.students_penpal[0].student_id, "elder_id": penpal?.students_penpal[0].elder_id, "token": token})).then((response) => {
                setPenpalHistory(response?.payload.data.data);
                // console.log("selected one:", singlePenpalHistory)
            })
        }
        else{
            setNoRecord(true);
        }
    }
    const handleDisconnect = () => {
        dispatch(disconnectPenpal({"disconnecting_id": selectedPenpal, "token": token, "user": user})).then((response) => {
            response?.status ? toast.success("Penpal is disconnected.") : toast.error("Something went wrong.");
        })
    }
    return(
        <>
            <div className="dashboard__section d__flex">
                <div className="main__sidebar">
                    <Sidebar />
                </div>
                <div className="main__body">
                    <Header pageTitle="Penpal History" />
                    <div className="main__body-content">
                        <div className="penpalmessage d__flex d__flex-h-between cols__holder">
                           <div className="penpal-chat-history">
                               <div className="penpal-chat-history-header">
                                 <h6>My Penpals</h6>
                                   <div className="search-penpal">
                                       <form>
                                           <fieldset>
                                                   <div className="search-chat">
                                                     <input type="search" placeholder="Search" />
                                                       <button type="submit"> {searchMessage()} </button>
                                                   </div>

                                           </fieldset>
                                       </form>
                                   </div>
                               </div>
                               <div className="chats-with-penpal-history">
                                   {
                                       loading ? <div className="loading-results">
                                               Loading
                                               <div className="loading-results-animation">
                                                   <div></div>
                                                   <div></div>
                                                   <div></div>
                                               </div>
                                           </div> :
                                       penpals?.length ? penpals.map((penpal, key) => {
                                           return(
                                               <div onClick={(e) => {
                                                   getPenpalHistory(penpal)
                                                   setSelectedPenpal(penpal?.id)
                                               }} key={key} className="penpal-card d__flex  d__flex-v-center d__flex-h-between ">
                                                   <div className="penpal-info d__flex d__flex-v-center">
                                                       <div className="penpal-dp">
                                                           {
                                                                penpal?.avatar ?
                                                                <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${penpal?.avatar}`} />
                                                                : penpalAvatar()
                                                            }
                                                       </div>
                                                       <div className="penpal-name">
                                                           <span>{penpal?.first_name}</span>
                                                           {
                                                               penpal?.deleted_at !== null ? <p>Disconnected</p> : ""
                                                           }
                                                       </div>
                                                   </div>
                                                   <div className={`disconnect-with-penpal ${disconnect === penpal && "show-disconnect-bar"}`} onClick={() => toggleDisconnect(penpal)}>
                                                       {threeDots() }
                                                       <div  className="disconnect">
                                                           <NavLink> Disconnect</NavLink>
                                                       </div>
                                                   </div>
                                               </div>
                                           )
                                       }) : !isEmpty ? <span className="no-record-found">No record found </span>  : ""
                                   }
                               </div>
                           </div>
                            <div className="penpal-message-box">
                                {
                                    selectedPenpal !== null ?
                                        <>
                                            <div className="penpal-message-box-header d__flex d__flex-h-between d__flex-v-center">
                                                <div className="penpal-info d__flex  d__flex-v-center">
                                                    <div className="penpal-dp">{penpalAvatar()}</div>
                                                    <div className="penpal-name">
                                                        {
                                                            singlePenpalHistory && singlePenpalHistory.length ? singlePenpalHistory.map((record, key) => {
                                                                return(
                                                                    <span key={key}>{user?.role_type === 1 ? record?.elder_data?.first_name : record?.student_data?.first_name}</span>
                                                                )
                                                            }) : ""
                                                        }
                                                    </div>
                                                </div>
                                                <div className="disconnect-penpal">
                                                    <button onClick={handleDisconnect} disabled={singlePenpalHistory?.[0]?.deleted_at !== null ? true : false}>
                                                        {
                                                            singlePenpalHistory?.[0]?.deleted_at == null ? "Disconnect" : "Disconnected"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={`penpal-chat-box`}>
                                            {
                                                singlePenpalHistory && singlePenpalHistory.length ? singlePenpalHistory.map((record) => {
                                                        return(
                                                            record?.letters && record?.letters.length ? record?.letters.map((singleRecord, key) => {
                                                                return(
                                                                    <div key={key} className="message-with-penpal d__flex d__flex-v-center d__flex-h-between" >
                                                                        <div className="otheruser-penpal-end">
                                                                            <h6>
                                                                                {
                                                                                    user?.role_type === 1 ? record?.elder_data.first_name : record?.student_data.first_name
                                                                                }
                                                                            </h6>
                                                                            <p>{singleRecord.date_time.split(' ')[0]} {smallDot()} {singleRecord.date_time.split(' ')[1]}  </p>
                                                                        </div>
                                                                        <div className="current-penpal-end">
                                                                            {letter()}
                                                                            <p>Penpal Letter {singleRecord.status === 1 ? "Sent" : singleRecord.status === 2 ? "Pending" : "Received"}!</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }) : (<span className="no-letter-found"> Letter history not found. </span> )
                                                        )
                                                    })
                                                    : noRecord ? <span className="no-letter-found"> Letter history not found. </span> : ""
                                            }
                                        </div>
                                        </>
                                    : <div className="select-area"><h2>Select Penpal to show details.</h2></div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default StudentHistory