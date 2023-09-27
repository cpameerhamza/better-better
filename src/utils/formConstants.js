// elder=>1, student=>2
const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
export const SignupFormFields = () => {
  return {
    role_type:
      user?.isInstitute && user?.role_type === 1
        ? "1"
        : user?.isInstitute && user?.role_type === 2
        ? "2"
        : "1",
    first_name: "",
    email: "",
    citize_email_confirmation: "",
    email_confirmation: "",
    last_name: "",
    phone_no: "",
    dob: "",
    institute_id: "",
    password: "",
    password_confirmation: "",
    gender: "",
    about: "",
    avatar: "",
    where_you_grow_up: "",
    career: "",
    season: "",
    is_outside_united_states: 1,
    is_like_travel: 1,
    is_military: 1,
    pet_ids: [],
    musical_instrument_ids: [],
    subject_ids: [],
    current_state: "",
    state_ids: [],
    language_ids: [],
    interest_ids: [],
    other_interests: [],
    is_added_by_institute: "0",
    institute_contact_name: "",
    institute_contact_email: "",
    institute_contact_number: "",
  };
};

export const LoginFormFields = () => {
  return {
    email: "",
    password: "",
  };
};

export const addLetterFields = () => {
  return {
    date: "",
    time: "",
    status: "2",
    penpal_id: "",
    penpal_to_id: "",
    sender_id: "",
  };
};

export const ContactFormFields = () => {
  return {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    message: "",
  };
};
