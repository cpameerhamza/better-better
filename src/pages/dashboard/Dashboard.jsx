import "./dashboard.css";
import Sidebar from "../../components/core/sidebar/Sidebar";
import Header from "../../components/core/header/Header";
import Card from "../../components/core/card/Card";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import {
  sentLettersCount,
  receivedLettersCount,
  pendingLettersCount,
  getTotalPenpals,
} from "../../redux/thunks/Thunks";
import DataTable from "../../utils/dataTable/DataTable";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [sentLettersCounter, setSentLettersCounter] = useState(null);
  const [receivedLettersCounter, setReceivedLettersCounter] = useState(null);
  const [pendingLettersCounter, setPendingLettersCounter] = useState(null);
  const [totalPenpals, setTotalPenpals] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scroller = useRef();

  useEffect(() => {
    dispatch(sentLettersCount({ token: token })).then((response) => {
      setSentLettersCounter(response?.payload.data);
    });
    dispatch(receivedLettersCount({ token: token })).then((response) => {
      setReceivedLettersCounter(response?.payload.data);
    });
    dispatch(pendingLettersCount({ token: token })).then((response) => {
      setPendingLettersCounter(response?.payload.data);
    });
    dispatch(getTotalPenpals({ token: token })).then((response) => {
      setTotalPenpals(response?.payload.data);
    });
  }, []);
  useEffect(() => {
    scroller.current.scrollTo({ top: 0, behavior: "smooth" });
    setIsScrolled(false);
  }, [isScrolled]);
  return (
    <>
      <div className="dashboard__section d__flex">
        <div className="main__sidebar">
          <Sidebar />
        </div>
        <div className="main__body">
          <Header pageTitle="Home" />
          <div className="main__body-content" ref={scroller}>
            <div className="cards__box student__cards-box d__flex d__flex-h-between gap-2">
              {user?.role_type === 2 ? (
                <Card title="Total Penpals" number={totalPenpals} />
              ) : (
                ""
              )}
              <Card title="Penpal Letters Sent" number={sentLettersCounter} />
              {user?.role_type === 1 ? (
                <Card
                  title="Penpal Letters Received"
                  number={receivedLettersCounter}
                />
              ) : (
                ""
              )}
              {user?.role_type === 2 ? (
                <Card
                  title="Pending Penpal Requests"
                  number={pendingLettersCounter}
                />
              ) : (
                ""
              )}
            </div>
            <div className="table-area">
              <DataTable setIsScrolled={setIsScrolled} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
