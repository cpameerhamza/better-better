import React from "react";    
import "./verificationEmail.css";

import gifEmail from "../../../assets/images/success.gif"
import {Link} from "react-router-dom";


const SuccessEmail = () => {

    return(
        <>
            <section className="verification__email d__flex d__flex-h-center d__flex-v-center">
                <div className="verification__email-box">
                    <div className="verification__email-gif">
                        <img src={gifEmail} alt={"#"} />
                    </div>
                    <h1>Success</h1>
                    <p>Your profile request has been approved!</p>
                    <div className="form__group full__field logout__btn">
                        <Link className="signup__next-btn full__field" to="/login">OK</Link>
                    </div>
                </div>
            </section>
        </>
    )

} 


export default SuccessEmail;