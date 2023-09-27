import Header from "../../../components/core/header/Header";
import Sidebar from "../../../components/core/sidebar/Sidebar";
import Signup from "../../../pages/signup/Signup";

const Registration = () => {
    return(
        <>
            <div className="dashboard__section d__flex">
                <div className="main__sidebar">
                    <Sidebar />
                </div>
                <div className="main__body">
                    <Header className="signup-header-container" pageTitle="register student"  />
                    <div className="main__body-content registration-process register-student">
                        <Signup />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration