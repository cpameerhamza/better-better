import  "./success.css"
import successImage from  "../../../assets/images/success.png"
import { Link } from "react-router-dom"
const Success = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return(
   <>
     <div className="success-popup">
         <div className="success-popup-content">
             <img src={successImage} />
             <h1>Success</h1>
             <p>Your {user?.isInstitute && user?.role_type === 1 ? "student's" : "elder's"} profile has been created!</p>
             <Link to="/institute-dashboard">Ok</Link>
         </div>
     </div>
   </>
    )
}
export  default  Success
