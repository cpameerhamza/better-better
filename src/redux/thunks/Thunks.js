import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Interceptors";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

export const registerUser = createAsyncThunk('/create-account', async(payload) => {
    const formData = new FormData();
    console.log("SIGNUP PAYLOAD:", payload);
    formData.append("role_type", payload.role_type);
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);

    payload?.role_type === "1" && formData.append("teacher_name", payload?.institute_contact_name);
    payload?.role_type === "1" && formData.append("teacher_phone", payload?.institute_contact_number);
    payload?.role_type === "1" && formData.append("teacher_email", payload?.institute_contact_email);
    
    payload?.role_type === "2" && formData.append("institute_contact_name", payload?.institute_contact_name);
    payload?.role_type === "2" && formData.append("institute_contact_number", payload?.institute_contact_number);
    payload?.role_type === "2" && formData.append("institute_contact_email", payload?.institute_contact_email);
    
    formData.append("email", payload?.email);
    formData.append("phone_no", payload.institute_contact_number);
    formData.append("dob", "01-01-"+payload?.dob);
    formData.append("institute_id", payload.institute_id);
    formData.append("password", payload.password);
    formData.append("password_confirmation", payload.password_confirmation);
    formData.append("about", payload.about);
    formData.append("avatar", payload.avatar);
    formData.append("where_you_grow_up", payload.where_you_grow_up);
    formData.append("career", payload.career);
    formData.append("season", payload.season);
    formData.append("is_outside_united_states", payload.is_outside_united_states);
    formData.append("current_state", payload.current_state);
    formData.append("is_like_travel", payload.is_like_travel);
    formData.append("is_military", payload.is_military);
    formData.append("pet_ids", JSON.stringify(payload.pet_ids));
    formData.append("musical_instrument_ids", JSON.stringify(payload.musical_instrument_ids));
    formData.append("subject_ids", JSON.stringify(payload.subject_ids));
    formData.append("state_ids", JSON.stringify(payload.state_ids));
    formData.append("language_ids", JSON.stringify(payload.language_ids));
    formData.append("interest_ids", JSON.stringify(payload.interest_ids));
    formData.append("other_interests", payload.other_interests);
    formData.append("is_added_by_institute", payload.is_added_by_institute);

    const res = await api.post(`/create-account`, formData);
    return res

});

export const getSubjects = createAsyncThunk('/subjects', async() => {
    const res = await api.get("/get-all-subjects")
    return res.data
});

export const getInterests = createAsyncThunk('/products', async(payload) => {
    const formData = new FormData();
    payload?.search && formData.append("search", payload?.search);
    const res = await api.post("/get-all-interests", formData)
    return res
});

export const getStates = createAsyncThunk('/states', async() => {
    const res = await api.get("/get-all-states")
    return res
});

export const getInstruments = createAsyncThunk('/instruments', async() => {
    const res = await api.get("/get-all-musical-instruments")
    return res
});

export const getPets = createAsyncThunk('/pets', async() => {
    const res = await api.get("/get-all-pets")
    return res
});

export const getInstitutes = createAsyncThunk('/institutes', async(payload) => {
    const res = await api.get(`/get-all-institutes/${payload?.role_type}`)
    return res
});

export const getLanguages = createAsyncThunk('/languages', async() => {
    const res = await api.get("/get-all-languages")
    return res
});

export const loginUser = createAsyncThunk('/login', async(payload) => {
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    const res = await api.post('/login', formData)
    return res
});

export const contactUs = createAsyncThunk('/contact-us', async(payload) => {
    const formData = new FormData();
    formData.append("first_name", payload.first_name);
    formData.append("last_name", payload.last_name);
    formData.append("email", payload.email);
    formData.append("contact_number", payload.contact_number);
    formData.append("message", payload.message);
    const res = await api.post('/contact-us', formData)
    return res
});

export const loginInstitute = createAsyncThunk('/institute-login', async(payload) => {
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    const res = await api.post('/login-institute', formData)
    return res
});

export const forgotPassword = createAsyncThunk('/forgot-password', async(payload) => {
    const res = await api.get(`/forgot-password/${payload.email}`)
    return res
});

export const resetPassword = createAsyncThunk('/forgot-password', async(payload) => {
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("password_confirmation", payload.password_confirmation);
    formData.append("token", payload.token);

    const res = await api.post("/reset-password", formData)
    return res
});
export const updateProfile = createAsyncThunk('/update-profile', async(payload) => {
    const formData = new FormData();
    formData.append("first_name", payload.values.first_name);
    payload.isChanged === true && formData.append("email", payload.values.email);
    formData.append("phone_no", payload.values.phone_no);
    formData.append("dob", payload.values.dob);
    formData.append("institute_id", payload.values.institute_id);
    formData.append("current_password", payload.values.current_password);
    formData.append("password", payload.values.password);
    formData.append("password_confirmation", payload.values.password_confirmation);
    formData.append("role_type", payload.values.role_type);

    payload.values.role_type === 2 && formData.append("avatar", payload.values.avatar);
    payload.values.role_type === 2 && formData.append("last_name", payload.values.last_name);
    payload.values.role_type === 2 && formData.append("about", payload.values.about);

    // formData.append("institute_type", payload.values.role_type);

    const res = await api.post("/update-profile", formData, {
        headers: {
            'Authorization': `Bearer ${payload.values.token}`,
        }
    })
    return res
});

export const sentLettersCount = createAsyncThunk('/sent-letters-count', async(payload) => {
    const res = await api.get("/pen-pal-letters-sent-count", {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    })
    return res
});

export const receivedLettersCount = createAsyncThunk('/received-letters-count', async(payload) => {
    const res = await api.get("/pen-pal-letters-received-count", {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    })
    return res
});

export const pendingLettersCount = createAsyncThunk('/pending-letters-count', async(payload) => {
    const res = await api.get("/pending-pen-pal-request-count", {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    })
    return res
});

export const getTotalPenpals = createAsyncThunk('/total-pen-pals', async(payload) => {
    const res = await api.get("/total-pen-pals", {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    })
    return res
});

export const findPenpals = createAsyncThunk('/find-penpal', async (payload) => {
    const formData = new FormData();
    formData.append("token", payload.token);
    payload?.interest && formData.append("interests", payload?.interest);
    payload?.institute_id && formData.append("institute_id", payload?.institute_id);
    const res = await api.post('/find-penpals', formData,  {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    })
    return res
});

export const sendRequest = createAsyncThunk('/send-request', async(payload) => {
    const formData = new FormData();
    formData.append("elder_id", payload?.elder_id);
    const res = await api.post('/send-request', formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
})
export const getPenpalRequests = createAsyncThunk('/all-requests', async(payload) => {
    const res = await api.get('/get-all-requests', {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
    return res
})

export const manageRequest = createAsyncThunk('/manage-request', async(payload) => {
    const formData = new FormData();
    formData.append("status", payload.status);
    formData.append("student_id", payload.student_id);
    const res = await api.post('/manage-request', formData, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
    return res
})

export const myPenpals = createAsyncThunk('/my-penpals', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    payload?.search && formData.append("search", payload?.search);
    const res = await api.post('/my-pen-pals', formData, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
    return res
})

export const getElderDetails = createAsyncThunk('/elder-details', async(payload) => {
    const res = await api.get(`/view-elder/${payload.id}`, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
    return res
})

export const getAllStudents = createAsyncThunk('/get-all-students', async(payload) => {
    const res = await api.get(`/get-institute-students`, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
    return res
})

export const getAllElders = createAsyncThunk('/get-all-elders', async(payload) => {
    const res = await api.get(`/get-institute-elders`, {
        headers: {
            'Authorization': `Bearer ${payload.token}`,
        }
    });
    return res
})

export const addLetter = createAsyncThunk('/add-letter', async(payload) => {
    const formData = new FormData();
    formData.append("penpal_id", payload?.values.penpal_id);
    formData.append("sender_id", payload?.values.sender_id);
    formData.append("penpal_to_id", payload?.values.penpal_to_id);
    formData.append("time", payload?.values.time);
    formData.append("date", payload?.values.date);
    formData.append("status", payload?.values.status);

    const res = await api.post(`/add-letter`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});
export const userPenpalHistory = createAsyncThunk('/user-penpal-history', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    payload?.search && formData.append("search", payload?.search);
    payload?.institute_id && formData.append("institute_id", payload?.institute_id);
    payload?.interest && formData.append("interest", payload?.interest);
    payload?.name && formData.append("name", payload?.name);
    payload?.date && formData.append("registration_date", payload?.date);
    const res = await api.post(`/users-pen-pals-history`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});
export const getSinglePenpalHistory = createAsyncThunk('/single-pen-pal-history', async(payload) => {
    const formData = new FormData();
    payload?.user.role_type === 1 ? formData.append("elder_id", payload?.penpal_id) : formData.append("student_id", payload?.penpal_id);
    formData.append("token", payload?.token);
    const res = await api.post(`/single-pen-pal-history`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});
export const disconnectPenpal = createAsyncThunk('/disconnect-penpal', async(payload) => {
    const formData = new FormData();
    user?.role_type === 1 ? formData.append("elder_id", payload?.disconnecting_id) : formData.append("student_id", payload?.disconnecting_id)
    formData.append("token", payload?.token);
    const res = await api.post(`/disconnect-pen-pal`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});
export const deleteRequest = createAsyncThunk('/cancel-request', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    formData.append("elder_id", payload?.elder_id);
    formData.append("status", payload?.status);
    const res = await api.post(`/manage-request`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

export const getNotifications = createAsyncThunk('/get-notifications', async(payload) => {
    const res = await api.get(`/get-notification`, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

export const markNoticesAsRead = createAsyncThunk('/mark-all-notifications-as-read', async(payload) => {
    const res = await api.get(`/mark-all-as-read`, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

// Institute APIs
export const getLettersHistory = createAsyncThunk('/institute-letters-history', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    payload?.search && formData.append("search", payload?.search);
    const res = await api.post(payload?.pageLink ? payload?.pageLink : `/letters-history`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});
export const markLetterSent = createAsyncThunk('/mark-letter-as-sent', async(payload) => {
    const formData = new FormData();
    formData.append("status", payload?.status);
    formData.append("letter_id", payload?.letter_id);
    formData.append("token", payload?.token);
    const res = await api.post(`/mark-letter-as-sent`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});
export const markLetterReceived = createAsyncThunk('/mark-letter-as-received', async(payload) => {
    const formData = new FormData();
    formData.append("status", payload?.status);
    formData.append("letter_id", payload?.letter_id);
    formData.append("token", payload?.token);
    const res = await api.post(`/mark-letter-as-received`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

export const handlePagination = createAsyncThunk('/get-new-data-patch', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    const res = await api.post(payload?.pageLink, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

export const getStudentsCount = createAsyncThunk('/get-totalCount-students', async(payload) => {
    const res = await api.get("/user-count", {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res;
});

export const registeredOnPenpals = createAsyncThunk('/registered-on-penpal', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    const res = await api.get("/registered-pen-pal-count", {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    })
    return res
});

export const lettersSentCount = createAsyncThunk('/letters-sent-count', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    const res = await api.get("/letters-sent", {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    })
    return res
});

export const lettersReceivedCount = createAsyncThunk('/letters-received-count', async(payload) => {    
    const formData = new FormData();
    formData.append("token", payload?.token);
    const res = await api.get(`/letters-received`, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

export const getStudentsHistory = createAsyncThunk('/get-students-penpal-history', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    payload?.search && formData.append("search", payload?.search);
    
    payload?.elder_name && formData.append("username", payload?.elder_name);
    payload?.registration_date && formData.append("registration_date", payload?.date);
    payload?.status && formData.append("status", payload?.status);
    
    const res = await api.post(payload?.pageLink ? payload?.pageLink : `/institute-get-penpals`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});

export const singleStudentHistory = createAsyncThunk('/single-user-pen-pal-history', async(payload) => {
    const formData = new FormData();
    formData.append("token", payload?.token);
    formData.append("user_id", payload?.user_id);
    formData.append("elder_id", payload?.elder_id);
    const res = await api.post(`/single-user-pen-pal-history`, formData, {
        headers: {
            'Authorization': `Bearer ${payload?.token}`,
        }
    });
    return res
});