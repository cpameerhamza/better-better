import * as Yup from "yup";
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your first name."),
  last_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your last name."),
  institute_contact_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please school contact name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter school's email."),
  institute_contact_email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter school's email."),
  institute_contact_email_confirmation: Yup.string()
    .required("Please re-enter email.")
    .oneOf([Yup.ref("institute_contact_email"), null], "Email must match."),
  email_confirmation: Yup.string()
    .required("Please re-enter email.")
    .oneOf([Yup.ref("email"), null], "Email must match."),
  dob: Yup.string().required("Select your birth year."),
  institute: Yup.string().required("Enter your school name."),
  password: Yup.string()
    .required()
    .min(8, "Minimum 8 characters are required.")
    .required("Please enter password."),
  password_confirmation: Yup.string()
    .required("Please re-enter password.")
    .oneOf([Yup.ref("password"), null], "Password must match."),
  institute_contact_number: Yup.string().required("Please enter your number."),
});
export const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email."),
});
export const elderSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your first name."),
  last_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your last name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email."),
  citize_email_confirmation: Yup.string()
    .required("Please re-enter email.")
    .oneOf([Yup.ref("email"), null], "Email must match."),
  dob: Yup.string().required("Select your birth year."),
  institute: Yup.string().required("Enter your Institute name."),
  phone_no: Yup.string().required("Please enter your number."),
  password: Yup.string()
    .required()
    .min(8, "Minimum 8 characters are required.")
    .required("Please enter password."),
  password_confirmation: Yup.string()
    .required("Please re-enter password.")
    .oneOf([Yup.ref("password"), null], "Password must match."),
  avatar: Yup.mixed().required("Please attach your photo."),
  gender: Yup.string().required("Please select your gender."),
  about: Yup.string().required("Please write a little about yourself."),
});

export const commonQuestionsSchema = Yup.object().shape({
  where_you_grow_up: Yup.string().required("This field is required."),
  career: Yup.string().required("Please write about your career."),
  season: Yup.string().required("Please select at least one season."),
  state_ids: Yup.array()
    .min(1, "Please select at least one state.")
    .required("This field is required."),
  subject_ids: Yup.array()
    .min(1, "Please select at least one subject.")
    .required("This field is required."),
  musical_instrument_ids: Yup.array()
    .min(1, "Please select at least one Instrument.")
    .required("This field is required."),
  pet_ids: Yup.array()
    .min(1, "Please select at least one pet.")
    .required("This field is required."),
  language_ids: Yup.array()
    .min(1, "Please select at least one language.")
    .required("This field is required."),
  current_state: Yup.string()
    .min(1, "Please select at least one state.")
    .required("This field is required."),

  // institute_contact_name: Yup.string().min(2, "Minimum two characters are required.").required("Please enter valid name."),
  // institute_contact_email: Yup.string().email('Invalid email address.').required("Please enter valid email."),
  // institute_contact_number: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Please enter valid phone number."),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email."),
  password: Yup.string().required("Please enter password."),
});

export const contactSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your first name."),
  last_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your last name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email."),
  contact_number: Yup.string().required("Please enter your number."),
  message: Yup.string()
    .min(10, "Minimum ten characters are required.")
    .required("Please enter your message."),
});

export const resetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email."),
  password: Yup.string().required("Please enter password."),
  password_confirmation: Yup.string()
    .required("Please re-enter password.")
    .oneOf([Yup.ref("password"), null], "Password must match."),
});

export const studentProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your first name."),
  dob: Yup.string().required("Select your birth year."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email."),
  institute: Yup.string().required("Enter your school name."),
  current_password: Yup.string(),
  password: Yup.string().min(8, "Minimum 8 characters are required."),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match."
  ),
});
export const elderProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your first name."),
  last_name: Yup.string()
    .min(2, "Minimum two characters are required.")
    .required("Please enter your last name."),
  email: Yup.string()
    .email("Invalid email address.")
    .required("Please enter your email."),
  dob: Yup.string().required("Select your birth year."),
  address: Yup.string().required("Please enter your physical address."),
  about: Yup.string().required("Please write a little about yourself."),
  phone_no: Yup.string().required("Please enter your number."),
  institute: Yup.string().required("Select your school."),
  current_password: Yup.string()
    .required()
    .min(8, "Minimum 8 characters are required.")
    .required("Please enter password."),
  password: Yup.string()
    .required()
    .min(8, "Minimum 8 characters are required.")
    .required("Please enter password."),
  password_confirmation: Yup.string()
    .required("Please re-enter password.")
    .oneOf([Yup.ref("password"), null], "Password must match."),
});
