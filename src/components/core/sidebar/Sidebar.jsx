import "./sidebar.css";
import Logo from "../../../assets/images/logo.svg";
import {
    homeIcon,
    findPenpals,
    penpalHistory,
    requestsIcon,
    historyIcon,
    addStudentIcon, lettersHistoryIcon
} from "../../../utils/SvgIcons";
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import mobilelogo from "../../../assets/images/mobilelogo.png"
const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isElder, setIsElder] = useState(false);
    useEffect(() => {
        if(user){
            user.role_type === 2 && !user?.isInstitute ? setIsElder(true) : setIsElder(false);
        }
    }, [])
    return(
        <>
            <div className="sidebar__box">
                <div  className="sidebar__logo">
                    <Link to="/"><img src={Logo} alt=""  />   <img src={mobilelogo} alt="" /> </Link>
                </div>
                <div className="sidebar__menu">
                    <nav className="sidebar__menu-items">
                        <ul>
                            <li className="sidebar__menu-item" >
                                <NavLink  to={`${user?.isInstitute ? "/institute-dashboard" : "/dashboard"}`}>
                                    {homeIcon()}
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li className="sidebar__menu-item" >
                                {
                                    isElder ?
                                    <NavLink to="/penpal-history" >
                                        {historyIcon()}
                                        <span>Penpal History</span>
                                    </NavLink>
                                    : user?.isInstitute ?
                                    <NavLink to="/registration">
                                        {addStudentIcon()}
                                        <span>{user?.role_type === 1 ? "Register Student" : "Register Elder"}</span>
                                    </NavLink>
                                    :
                                    <NavLink to="/find-penpals" >
                                        {findPenpals()}
                                        <span>Find Penpals</span>
                                    </NavLink>
                                }
                            </li>
                            <li className="sidebar__menu-item">
                                {
                                    isElder ?
                                    <NavLink to="/manage-requests">
                                        {requestsIcon()}
                                        <span>Manage Requests</span>
                                    </NavLink>
                                    : user?.isInstitute ?
                                    <NavLink to="/letter-history" >
                                        {lettersHistoryIcon()}
                                        <span>Letter's History</span>
                                    </NavLink>
                                    :
                                    <NavLink to="/penpal-history" >
                                        {penpalHistory()}
                                        <span>Penpal History</span>
                                    </NavLink>
                                }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidebar;