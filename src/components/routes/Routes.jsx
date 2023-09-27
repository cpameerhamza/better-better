import { Routes, Route } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login"
import RestPassword from "../../pages/resetPassword/ResetPassword"
import Signup from "../../pages/signup/Signup";
import SuccessEmail from "../../pages/signup/verification-email/SuccessEmail";
import PrivateComponent from "./PrivateComponent";
import ManageRequest from "../../pages/manageRequest/ManageRequest";
import Settings from "../../pages/profileSettings/Settings";
import Dashboard from "../../pages/dashboard/Dashboard";
import AccessDenied from "../../pages/accessDenied/AccessDenied";
import ForgetPassword from "../../pages/forgetPassword/ForgotPassword";
import PublicComponent from "./PublicComponent";
import FindPenpals from "../../pages/findPenpals/FindPenpals";
import PenpalDetails from "../../pages/findPenpals/penpalDetails/PenpalDetails";
import InstituteLogin from "../../institute/pages/login/InstituteLogin";
import InstituteRoutes from "./InstituteRoutes";
import InstituteDashboard from "../../institute/pages/dashboard/InstituteDashboard";
import PenpalHistory from "../../pages/penpalHistory/PenpalHistory";
import LetterHistory from "../../institute/pages/letterhistory/LetterHistory";
import Registration from "../../institute/pages/registration/Registration";
import StudentHistory from "../../institute/pages/dashboard/studentHistory/StudentHistory";
import About from "../../pages/about/About";
import Contact from "../../pages/contact/Contact";


const CreateRoutes = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="/login" element={<Login />} />
                <Route path="/institute-login" element={<InstituteLogin />} />
                <Route element={<PrivateComponent />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/manage-requests" element={<ManageRequest />} />
                    <Route path="/profile-settings" element={<Settings />} />
                    <Route path="/find-penpals" element={<FindPenpals />} />
                    <Route path="/penpal-details/:id" element={<PenpalDetails />} />
                    <Route path="/penpal-history" element={<PenpalHistory />} />
                </Route>
                <Route element={<PublicComponent />}>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password" element={<RestPassword />} />
                    <Route path="/success-email" element={<SuccessEmail />} />
                </Route>
                <Route element={<InstituteRoutes />}>
                    <Route path="/institute-dashboard" element={<InstituteDashboard />} />
                    <Route path="/letter-history" element={<LetterHistory />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/student-history" element={<StudentHistory />} />
                </Route>

                <Route path="/access-denied" element={<AccessDenied />} />
                <Route path="*" element={<><h1>404</h1></>} />
            </Routes>
        </>
    )
}

export default CreateRoutes