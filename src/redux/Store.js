import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import RegistrationSlice from "./slices/RegistrationSlice";
import GetPenpalHistory from "./slices/PenpalHistory";
import GetPenpalRequests from "./slices/GetPenpalRequests";
import ElderDetails from "./slices/ElderDetails";
import GetAllStudents from "./slices/AllStudents";
import GetMyPenpals from "./slices/MyPenpals";

const Store = configureStore({
  reducer: {
    registerUser: RegistrationSlice,
    penpalHistory: GetPenpalHistory,
    requests: GetPenpalRequests,
    elderDetails: ElderDetails,
    students: GetAllStudents,
    myPenpals: GetMyPenpals,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export default Store;
