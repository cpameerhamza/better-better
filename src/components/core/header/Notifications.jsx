import image from "../../../assets/images/User.png";
import {useEffect, useRef, useState} from "react";
import {bell, penpalAvatar} from "../../../utils/SvgIcons"
import moment from 'moment';
import { getNotifications, markNoticesAsRead } from "../../../redux/thunks/Thunks";
import { useDispatch } from "react-redux";
import SimpleDateTime from "react-simple-timestamp-to-date";
import { toast } from "react-toastify";
import Toaster from "../../../utils/Toaster";
import receivedIcon from "../../../assets/images/received-icon.svg";
import sentIcon from "../../../assets/images/sent-icon.svg";


const Notifications = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const ref = useRef();
    const dispatch = useDispatch();
    const [isOpened, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState(null);
    const toggleNotification = () => {
        setIsOpen(!isOpened);
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    useEffect(() => {
        dispatch(getNotifications({"token": token})).then((response) => {
            setNotifications(response?.payload.data);
        })
    }, []);
    const handleReadNotices = () => {
        dispatch(markNoticesAsRead({"token": token})).then((response) => {
            if(response?.payload.message === "Notifications marked as read successfully!"){
                setNotifications(0);
            }
            else{
                toast.error("Something went wrong. Please try again.")
            }
        })
    }
    return(
        <>
            <div ref={ref}>
                <button type="button" className="header__notification-btn"  onClick={toggleNotification}>
                    <span className="notification-count"> {notifications ? notifications.length : "0"}</span> 
                    {bell()}
                </button>
                {isOpened &&
                    <div className={`notification ${isOpened ? "show-notificaiton-bar" : ""}`}>
                        <div className="notification-card">
                            <div className="notification-header d__flex d__flex-h-between  d__flex-v-center ">
                                <h6>Notifications</h6>
                                <button type="button" className="mark-read-btn" onClick={handleReadNotices} disabled={notifications && !notifications.length ? true: false}>Mark all as read</button>
                            </div>
                            <div className="notification-list">
                                {
                                    notifications && notifications.length ? notifications.map((notice, key) => {
                                        return(
                                            <div key={key} className="notification-bar d__flex-v-center d__flex">
                                                <div className="user-notification-img">
                                                    {
                                                        notice?.type === 2 ? <img src={receivedIcon} alt="#" />
                                                        : notice?.type === 1 ? <img src={sentIcon} alt="#" />
                                                        : notice?.elder && notice?.elder?.avatar ?
                                                        <img src={process.env.REACT_APP_ASSETS_BASE_URL+'/'+notice?.elder?.avatar} alt="#" /> 
                                                        : penpalAvatar()
                                                    }
                                                </div>
                                                <div className="notification-message">
                                                    <p>
                                                        <strong>
                                                            {
                                                                notice?.elder ? notice?.elder?.first_name :
                                                                notice?.student ? notice?.student?.first_name : "Penpal"
                                                            }
                                                        </strong>
                                                        {notice?.content}
                                                    </p>
                                                    <span>
                                                        {
                                                            moment(new Date(notice?.created_at)).fromNow()
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :  <span className="no-result"> No Data found. </span>
                                }
                            </div>
                        </div>
                </div>
                }
            </div>
            <Toaster />
        </>
    )
}
export default Notifications