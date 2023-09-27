
import "./header.css";
import {dropdownIcon, powerIcon, userIcon} from "../../../utils/SvgIcons";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import Notifications from "./Notifications";

const Header = ({pageTitle, details}) => {
    const ref = useRef();
    const user = JSON.parse(localStorage.getItem("user"));
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [isOpened, setIsOpen] = useState(false);

    const Navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        if(user?.isInstitute){
            Navigate("/institute-login");
        }
        else{
            Navigate("/login");
        }
    }
    const handleUserDropdown = () => {
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

    return(
        <>
            <header className="dahboard__header d__flex d__flex-h-between d__flex-v-center">
                <div className="dahboard__header-left">
                    <p className="header__page-title">{pageTitle} {details ? ">" + details?.first_name + " " + details?.last_name : ""}</p>
                </div>
                <div className="dahboard__header-right d__flex">
                    <Notifications />
                    <div ref={ref}>
                        <div  className="header__user-box d__flex" onClick={handleUserDropdown}>
                            <div className="user__box-img">
                                {
                                    user?.avatar ? <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${user?.avatar}`} /> :
                                    user?.isInstitute ? user.name.split(' ').map(character => character.charAt(0)) : user?.first_name.split(' ').map(character => character.charAt(0))
                                }
                            </div>
                                <div className="user__box-info">
                                    <h5 className="user__name">
                                        {
                                            user?.isInstitute ? user.name : user && user.first_name
                                        }
                                        {dropdownIcon()}
                                    </h5>
                                    <p className="user__email" title={user && user.email}>{user && user.email}</p>
                                </div>

                            {
                                isOpened &&
                                <div className={`user__dropdown ${isOpened ? "active" : ""}`}>
                                    <div className="mobile--box-info">
                                        <h5 className="user__name">
                                            {
                                                user?.isInstitute ? user.name : user.first_name
                                            }
                                        </h5>
                                        <p className="user__email">{user && user.email}</p>
                                    </div>
                                    <ul className="list__none">
                                        {
                                            !user?.isInstitute ?
                                            <li>
                                                <Link to="/profile-settings">{userIcon()} My Account</Link>
                                            </li>
                                            : ""
                                        }
                                        
                                        <li>
                                            <button onClick={handleLogout} type="button"> {powerIcon()}Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header