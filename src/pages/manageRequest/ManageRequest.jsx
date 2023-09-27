import "./manageRequest.css"
import Sidebar from "../../components/core/sidebar/Sidebar"
import Header from "../../components/core/header/Header"
import RequestAvatar from "../../assets/images/request-avatar.png"
import {useDispatch, useSelector} from "react-redux";
import {getPenpalRequests, manageRequest} from "../../redux/thunks/Thunks";
import {useEffect, useState} from "react";
import {crossIcon, doubleTick} from "../../utils/SvgIcons";
import { toast } from "react-toastify";
import Toaster from "../../utils/Toaster";

const ManageRequest = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const dispatch = useDispatch();
    const [requests, setRequests] = useState([]);
    const [isEmpty, setEmpty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApproved, setIsApproved] = useState(null);

    useEffect(() => {
        dispatch(getPenpalRequests({token: token})).then((response) => {
            setRequests(response?.payload.data)
            setLoading(false);
        });
    }, []);
    useEffect(() => {
        requests.length ? setEmpty(true) : setEmpty(false);
    }, [requests]);

    const handleRequest = (request, action) => {
        dispatch(manageRequest({status: action, student_id: request.student_id, token: token})).then((response) => {
            if(response?.payload?.message === "Request accepted successfully!"){
                toast.success("Request accepted successfully!");
                setIsApproved(request);

            }
            else if(response?.payload?.message === "Request rejected successfully"){
                toast.success("Request rejected successfully");
            }
            else{
                toast.error("Something went wrong! Please try again.");
            }
        })
    }

    return (
        <>
            <div className="dashboard__section d__flex">
                <div className="main__sidebar">
                    <Sidebar />
                </div>
                <div className="main__body">
                    <Header pageTitle="Manage requests" />
                    <div className="main__body-content">

                        <div className="manage__request">
                            <div className="manage__request-title">
                                <h4>Manage Your Penpal Requests</h4>
                            </div>
                            <div className="manage__request-box ">
                                {
                                    loading ? <div className="loading-results">

                                            Loading
                                            <div className="loading-results-animation">
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                        </div> :
                                    requests && requests.length ? requests.map((request, key) => {
                                        return(
                                            <>
                                                <div key={key} className="manage__request-item d__flex d__flex-v-center d__flex-h-between">
                                                    <div className="request__user d__flex d__flex-v-center">
                                                        <img src={RequestAvatar} alt="" />
                                                        <h4 className="request__user-name">{request.student_data.first_name} - {request.student_data.initials}</h4>
                                                    </div>
                                                    <div className="request__btns d__flex gap-1">
                                                        {/*1 => request accepted and 2 => needs to be accepted*/}
                                                        {
                                                            request?.status !== 3 &&
                                                                <button disabled={request?.status === 1 || isApproved === request ? true : false} className={`request__btn accept__btn ${request?.status === 1 || isApproved === request && "accepted__btn"}`} onClick={() => handleRequest(request, "1")}>
                                                                    {
                                                                        isApproved === request ?
                                                                        <span className="d__flex d__flex-v-center">{doubleTick()} Accepted</span>
                                                                        :
                                                                        request?.deleted_at ? <span className="d__flex d__flex-v-center">{crossIcon()} Disconnected</span> :
                                                                        request?.status === 1 ? <span className="d__flex d__flex-v-center">{doubleTick()} Accepted</span> : "Accept"
                                                                    }
                                                                </button>
                                                        }
                                                        {
                                                            request?.status !== 1 ?
                                                                <button disabled={request?.status === 3 ? true : false} className={`request__btn ${request?.status === 3 && "rejected__btn"}`} onClick={() => handleRequest(request, "3")}>
                                                                    {
                                                                        request?.status === 3 ? <span className="d__flex d__flex-v-center">{crossIcon()} Rejected</span> : "reject"
                                                                    }
                                                                </button>
                                                            : ""
                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }) : !isEmpty ? <span className="no-record-found">No record found.</span> : ""
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

export default ManageRequest;