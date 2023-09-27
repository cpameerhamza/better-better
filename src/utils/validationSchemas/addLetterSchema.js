import * as Yup from "yup";
export const addLetterSchema = Yup.object().shape({
    date: Yup.string().required("Please select sending date."),
    time: Yup.string().required("Please select sending time."),
    sender_id: Yup.string().required("Please select student."),
    penpal_to_id: Yup.string().required("Please select elder."),
    status: Yup.string().required("Please select letter status."),
});