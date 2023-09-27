import Sidebar from "../../../components/core/sidebar/Sidebar"
import Header from "../../../components/core/header/Header"
import {tag, location} from "../../../utils/SvgIcons";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {placeholderIcon} from "../../../utils/SvgIcons";

import {useDispatch, useSelector} from "react-redux";
import {getElderDetails} from "../../../redux/thunks/Thunks";
import "./penpaldetails.css"
const PenpalDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const elderDetails = useSelector(state => state.elderDetails);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(user){
            dispatch(getElderDetails({id: params?.id, token: token})).then((response) => {
                setLoading(false)
                // console.log(response?.payload.data);
            })
        }
    }, [])
    useEffect(() => {
        setDetails(elderDetails.details.data);
    }, [elderDetails])
    return(
        <>
            <div className="dashboard__section d__flex">
                <div className="main__sidebar">
                    <Sidebar />
                </div>
                <div className="main__body">
                    <Header pageTitle="FIND PENPALS" details={details} />

                    <div className="main__body-content">
                        {
                            loading ?
                                <div className="loading-results">
                                    Loading
                                    <div className="loading-results-animation">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>:
                            <div className="details-holder">
                                <div className="details-holder-pic">
                                    {
                                        details && details?.avatar ?
                                        <img src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${details.avatar}`} />
                                        :
                                        placeholderIcon()
                                    }

                                    </div>
                                    <h3>{details && details?.first_name} {details && details?.last_name}</h3>
                                    <ul className="d__flex d__flex-v-center ">
                                        <li>{location()} {details && details?.institute.location}</li>
                                        <li>{tag()} {details && details?.institute.name}</li>
                                    </ul>
                                    <div className="interests-holder">
                                        <h6>{details && details?.first_name+`'s`} Interests</h6>
                                        <div className="rows">
                                            {details && details.user_interests && details.user_interests.map((interest, index) => (
                                                <>
                                                    {index === 0 || interest.interest.parent_name !== details.user_interests[index-1].interest.parent_name ? (
                                                        <p>{interest.interest.parent_name}</p>
                                                    ) : null}

                                                    <div className="interest-list"> <span>  {interest.interest.name} </span></div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default PenpalDetails