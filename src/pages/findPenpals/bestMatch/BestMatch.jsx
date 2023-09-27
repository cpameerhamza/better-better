import {connectIcon, doubleTick, requestSentIcon, penpalAvatar} from "../../../utils/SvgIcons";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendRequest, disconnectPenpal, deleteRequest} from "../../../redux/thunks/Thunks";
import {useEffect, useState, useRef} from "react";
import {toast} from "react-toastify";
import Toaster from "../../../utils/Toaster";
import { crossIcon } from "../../../utils/SvgIcons";

const BestMatch = ({penpal}) => {
    const dispatch = useDispatch();
    const requestStatus = useSelector(state => state.sendRequest);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const [isSent, setIsSent] = useState(false);
    const [selectedPenpal, setSelectedPenpal] = useState(null);
    const [cancelled, setCancelled] = useState(null);


    const sendPenpalRequest = (elder_id) => {
        dispatch(sendRequest({"elder_id": elder_id, "token": token})).then((response) => {
            if(response?.payload.message === "Your request has been sent. you will be notified once its approved."){
                toast.success("Request has been sent.");
                setIsSent(true);
            }
            else if(response?.payload.message === "Request cannot be sent, your sending request limit has been reached."){
                toast.error("Request cannot be sent, your sending request limit has been reached.")
            }
            else{
                toast.error("Can not send request. Please try again.");
                setIsSent(false);
            }
        })
    }
    useEffect(() => {
        if(selectedPenpal !== null){
            dispatch(disconnectPenpal({"disconnecting_id": selectedPenpal, "token": token, "user": user})).then((response) => {
                response?.status ? toast.success("Penpal is disconnected.") : toast.error("Something went wrong.");
            });
        }
    }, [selectedPenpal]);
    const cancelRequest = (penpal) => {
        dispatch(deleteRequest({status: 3, elder_id: penpal?.elder_id, token: token})).then((response) => {
            if(response?.payload?.message === "Request has been canceled"){
                toast.success("Request has been canceled.");
                setCancelled(penpal);
            }
            else{
                toast.error("Something went wrong.");
            }
        });
    }
    return(
        <>
            <div className="match-row">
                <div className="match-text d__flex d__flex-h-between d__flex-v-center">
                    <div className="match-info d__flex d__flex-v-center">
                        <div className="icon">
                            {penpal?.user_avatar ? <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${penpal?.user_avatar}`}></img> : penpalAvatar()}
                        </div>
                        <div className="text">
                            <strong><Link to={`/penpal-details/${penpal.elder_id}`}>{penpal.user_first_name + " " + penpal.user_last_name}</Link></strong>
                            <p>{penpal.institute_name}<span className="separation"></span></p>
                        </div>
                    </div>
                    <div className="btns d__flex d__flex-v-center">
                        {
                            penpal?.penpal_status === 1 ?
                                <>
                                    <button className={`connection-btn filled`}>{doubleTick()} Connected</button>
                                    <button className={`connection-btn disconnected`} onClick={(e) => setSelectedPenpal(penpal?.elder_id)}>{crossIcon()} Disconnect</button>
                                </>
                            :
                            <>
                                {
                                    cancelled === penpal ?
                                        <button type="button" className={`connection-btn ${isSent ? "req-sent" : null}`} onClick={(e) => sendPenpalRequest(penpal.elder_id)} disabled={isSent || penpal?.alias === "Request already sent to this elder" ? true : false}>
                                            {connectIcon()} Connect
                                        </button>
                                    :
                                    <button type="button" className={`connection-btn ${isSent ? "req-sent" : null}`} onClick={(e) => sendPenpalRequest(penpal.elder_id)} disabled={isSent || penpal?.alias === "Request already sent to this elder" ? true : false}>
                                        {
                                            isSent || penpal?.alias === "Request already sent to this elder" ?
                                            <>{requestSentIcon()} Req. Sent</>
                                            :
                                            <>{connectIcon()} Connect</>
                                        }
                                    </button>
                                }
                                {
                                    cancelled === penpal ? "" :
                                    isSent || penpal?.alias === "Request already sent to this elder" ?
                                    <button className="connection-btn" onClick={() => cancelRequest(penpal)}>Cancel Request</button>
                                    : ""
                                }
                            </>
                        }                        
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default BestMatch