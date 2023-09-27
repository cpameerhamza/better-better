import "./letterPopup.css";
import React, {useEffect, useState} from "react";
import {closeFilter} from "../../../utils/SvgIcons";
import {useDispatch, useSelector} from "react-redux";
import {addLetter, getAllStudents, getAllElders} from "../../../redux/thunks/Thunks";
import {useFormik} from "formik";
import {addLetterSchema} from "../../../utils/validationSchemas/addLetterSchema";
import {addLetterFields} from "../../../utils/formConstants";
import {toast} from "react-toastify";
import Toaster from "../../../utils/Toaster";

const AddLetterPopup = ({showPopup, setShowPopup, setIsLetterAdded}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"));
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();
    const allStudents = useSelector(state => state.students);
    const [allElders, setAllElders] = useState(null);
    useEffect(() => {
        if(user){
            dispatch(getAllStudents({token: token})).then((response) => {
                // console.log("students response", response.payload.data);
                // console.log("students api called");
            });
            dispatch(getAllElders({token: token})).then((response) => {
                // console.log("students response", response.payload.data);
                setAllElders(response?.payload?.data?.users);
                // console.log("all elders", allElders);
            });
        }
    }, []);
    useEffect(() => {
        setStudents(allStudents ? allStudents?.students?.data?.users : []);
    }, [allStudents]);

    const handleClose = () => {
        setShowPopup(false);
    }
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedElder, setSelectedElder] = useState(null);
    const {values, handleSubmit, handleBlur, handleReset, errors, touched, handleChange, setFieldValue} = useFormik({
        initialValues: addLetterFields(),
        validationSchema: addLetterSchema,
        onSubmit: (values) => {
            if(selectedStudent !== null || selectedElder !== null){
                dispatch(addLetter({values, token})).then((response) => {
                    if(response?.payload.status === false){
                        toast.error("Something went wrong.")
                    }
                    else{
                        toast.success("Letter added successfully.");
                        setShowPopup(false);
                        setIsLetterAdded(true);
                    }
                })
            }
            else{
                console.log("no relation");
            }
        }
    });
    const handleStudentSelect = (e) => {
        if(user?.role_type === 1){
            if(e !== "Select Student"){
                const selectedStudent = JSON.parse(e)
                setSelectedStudent(selectedStudent);
                setFieldValue("sender_id", selectedStudent.id);

            }
            else{setSelectedStudent(null)}
        }
        else{
            if(e !== "Select Elder"){
                const selectedElder = JSON.parse(e)
                setSelectedElder(selectedElder);
                setFieldValue("sender_id", selectedElder.id);

            }
            else{setSelectedElder(null)}
        }
    }
    const handleElderSelect = (e) => {
        if(user?.role_type === 1){
            const student = JSON.parse(e);
            // console.log("STUDENT:", student);
            setFieldValue("penpal_to_id", student?.elder_data.id);
            setFieldValue("penpal_id", student?.id);
        }
        else{
            const elder = JSON.parse(e);
            // console.log("ELDER:", elder);
            setFieldValue("penpal_to_id", elder?.student_data.id);
            setFieldValue("penpal_id", elder?.id);
        }
    }
    return(
        <>
            <div className={`popup ${showPopup && "show"}`}>
                <form onSubmit={handleSubmit} className="letter-form">
                    <div className="letter-header d__flex d__flex-h-between d__flex-v-center">
                        <h3>Add Letter</h3>
                        <button type="button" className="close-icon" onClick={handleClose}>{closeFilter()}</button>
                    </div>
                    <div className="form-row">
                        <span>From</span>
                        <select onChange={(e) => {
                            handleStudentSelect(e.target.value);
                        }}>
                            <option>
                                {
                                    user?.role_type === 1 ? "Select Student" : "Select Elder"
                                }
                            </option>
                            {
                                user?.role_type === 1 ?
                                    students && students.length && students.map((student, key) => {
                                        return(
                                            <>
                                                <option key={key} value={JSON.stringify(student)}>{student?.first_name} {student?.last_name ? student?.last_name : ""}</option>
                                            </>
                                        )
                                    })
                                :
                                allElders && allElders.length && allElders.map((elder, key) => {
                                    return(
                                        <>
                                            <option key={key} value={JSON.stringify(elder)}>{elder?.first_name} {elder?.last_name ? elder?.last_name : ""}</option>
                                        </>
                                    )
                                })
                            }
                            
                        </select>
                        <input
                            type="text"
                            name="sender_id"
                            value={values.sender_id}
                            onChange={handleChange}
                            className="hidden"
                            onBlur={handleBlur}
                        />
                        <p className="error-msg">{errors.sender_id && touched.sender_id ? errors.sender_id : null}</p>
                    </div>
                    <div className="form-row">
                        <span>To</span>
                        <select onChange={(e) => handleElderSelect(e.target.value)}>
                            <option value="0">
                                {
                                    user?.role_type === 1 ? "Select Elder" : "Select Student"
                                }
                            </option>
                            {
                                 user?.role_type === 1 ?
                                 selectedStudent !== null && selectedStudent?.students_active_penpals.length ? selectedStudent?.students_active_penpals.map((elder, key) => {
                                    return(
                                        <option key={key} value={JSON.stringify(elder)}>{elder?.elder_data.first_name}</option>
                                    )
                                }) : <option>No Data Found</option>
                                :
                                selectedElder !== null && selectedElder?.elders_active_penpals.length ? selectedElder?.elders_active_penpals.map((elder, key) => {
                                    return(
                                        <option key={key} value={JSON.stringify(elder)}>{elder?.student_data.first_name}</option>
                                    )
                                }) : <option>No Data Found</option>
                            }
                        </select>
                        <input
                            type="text"
                            name="penpal_to_id"
                            value={values.penpal_to_id}
                            onChange={handleChange}
                            className="hidden"
                            onBlur={handleBlur}
                        />
                        <p className="error-msg">{errors.penpal_to_id && touched.penpal_to_id ? errors.penpal_to_id : null}</p>
                    </div>
                    <div className="form-row">
                        <span>Select Date</span>
                        <input
                            type="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            // className="hidden"
                            onBlur={handleBlur}
                        />
                        <p className="error-msg">{errors.date && touched.date ? errors.date : null}</p>
                    </div>
                    <div className="form-row">
                        <span>Select Time</span>
                        <input
                            type="time"
                            name="time"
                            value={values.time}
                            onChange={handleChange}
                            // className="hidden"
                            onBlur={handleBlur}
                        />
                        <p className="error-msg">{errors.time && touched.time ? errors.time : null}</p>
                    </div>
                    <div className="form-row">
                        <span>Letter Status</span>
                        <select onChange={(e) => setFieldValue("status", e.target.value)}>
                            <option value="2">Pending</option>
                        </select>
                        <input
                            type="text"
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            className="hidden"
                            onBlur={handleBlur}
                        />
                        <p className="error-msg">{errors.status && touched.status ? errors.status : null}</p>
                    </div>
                    <div className="action-button form-row d__flex-h-end  d__flex ">
                        <button type="button" onClick={handleClose}>Close</button>
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
            <Toaster />
        </>
    )
}

export default AddLetterPopup