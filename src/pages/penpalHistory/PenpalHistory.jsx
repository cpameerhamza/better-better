import "./penpalHistory.css";
import Sidebar from "../../components/core/sidebar/Sidebar";
import Header from "../../components/core/header/Header";
import React, { useEffect, useState, useRef } from "react";
import {
  letter,
  penpalAvatar,
  searchMessage,
  smallDot,
  threeDots,
  doubleArrow,
} from "../../utils/SvgIcons";
import { NavLink } from "react-router-dom";
import {
  disconnectPenpal,
  getSinglePenpalHistory,
  myPenpals,
} from "../../redux/thunks/Thunks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toaster from "../../utils/Toaster";
import SimpleDateTime from "react-simple-timestamp-to-date";

const PenpalHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const [disconnect, setDisconnect] = useState(false);
  const [penpals, setPenpals] = useState([]);
  const [penpalCard, setPenpalCard] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singlePenpalHistory, setPenpalHistory] = useState(null);
  const [selectedPenpal, setSelectedPenpal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isEmpty, setEmpty] = useState();
  const [searchTerm, setSearchTerm] = useState(null);
  const [toogleMessageBox, setToogleMessageBox] = useState(false);
  const allPenpals = useSelector((state) => state.myPenpals);
  const [selectedPenpalImage, setSelectedPenpalImage] = useState(null);
  const [disconnectedPenpal, setDisconnectedPenpal] = useState(null);

  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDisconnect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const toggleDisconnect = (clickedPenpal) => {
    setDisconnect(clickedPenpal);
  };
  useEffect(() => {
    setLoading(true);
    dispatch(myPenpals({ token })).then((response) => {
      setLoading(false);
      // console.log("api response", response);
    });
  }, []);
  useEffect(() => {
    setPenpals(allPenpals?.penpals?.data?.data);
    setData(allPenpals?.penpals?.data?.data);
    penpals?.length ? setEmpty(true) : setEmpty(false);
  }, [allPenpals]);

  const getPenpalHistory = (penpalID, clickedPenpal) => {
    setPenpalCard(clickedPenpal);
    setToogleMessageBox(!toogleMessageBox);
    dispatch(
      getSinglePenpalHistory({ penpal_id: penpalID, token: token, user: user })
    ).then((response) => {
      setPenpalHistory(response?.payload.data.data);
      // console.log("selected:", singlePenpalHistory)
    });
  };
  const handleDisconnect = (penpal) => {
    dispatch(
      disconnectPenpal({
        disconnecting_id: selectedPenpal,
        token: token,
        user: user,
      })
    ).then((response) => {
      if (response?.payload?.message === "Penpal disconnected!") {
        toast.success("Penpal is disconnected.");
        setSelected(null);
        setSelectedPenpal(null);
        setDisconnectedPenpal(penpal);
        let filterArr = penpals.filter((item) => item?.id !== selected?.id);
        setPenpals(filterArr);
        setDisconnect(false);
      } else {
        toast.error("Something went wrong.");
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(myPenpals({ token: token, search: searchTerm })).then(
      (response) => {
        console.log("search res", response?.payload?.data?.data);
        // setPenpals(allPenpals?.penpals?.data?.data);
        // setData(allPenpals?.penpals?.data?.data);
      }
    );
    // if(searchTerm !== null){
    //     const filtered = data.filter((penpal) => {
    //         if(!searchTerm) return penpals
    //         return penpal?.student_data.first_name.toLowerCase() === searchTerm.toLowerCase();
    //     });
    //     filtered.length ? setPenpals(filtered) : setPenpals(data);
    // }
  };
  const getPenpalImage = (penpal) => {
    setSelectedPenpalImage(penpal?.elder_data?.avatar);
  };
  return (
    <>
      <div className="dashboard__section d__flex">
        <div className="main__sidebar">
          <Sidebar />
        </div>
        <div className="main__body">
          <Header pageTitle="MY PENPALS" />
          <div className="main__body-content">
            <div className="penpalmessage d__flex d__flex-h-between cols__holder">
              <div className="penpal-chat-history">
                <div className="penpal-chat-history-header">
                  <h6>My Penpals</h6>
                  <div className="search-penpal">
                    <form onSubmit={handleSubmit}>
                      <fieldset>
                        <div className="search-chat">
                          <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <button type="submit">{searchMessage()}</button>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
                <div className="chats-with-penpal-history">
                  {loading ? (
                    <div className="loading-results">
                      Loading
                      <div className="loading-results-animation">
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>
                  ) : penpals?.length ? (
                    penpals.map((penpal, key) => {
                      return (
                        <div
                          onClick={(e) => {
                            getPenpalHistory(
                              user?.role_type === 1
                                ? penpal?.elder_id
                                : penpal?.student_id,
                              penpal
                            );
                            setSelectedPenpal(
                              user?.role_type === 1
                                ? penpal?.elder_id
                                : penpal?.student_id
                            );
                            getPenpalImage(penpal);
                            setSelected(penpal);
                          }}
                          key={key}
                          className={`penpal-card d__flex  d__flex-v-center d__flex-h-between ${
                            penpalCard === penpal && "activedpenpal"
                          }`}
                        >
                          {penpal?.deleted_at === null ? (
                            <span className="active-tag">Active</span>
                          ) : (
                            ""
                          )}
                          <div className="penpal-info d__flex d__flex-v-center">
                            <div className="penpal-dp">
                              {user?.role_type === 1 ? (
                                <img
                                  src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${penpal?.elder_data?.avatar}`}
                                />
                              ) : (
                                penpalAvatar()
                              )}
                            </div>
                            <div className="penpal-name">
                              <span>
                                {user?.role_type === 1
                                  ? penpal?.elder_data?.first_name +
                                    " " +
                                    penpal?.elder_data?.last_name
                                  : penpal?.student_data?.first_name}
                              </span>
                              {penpal?.deleted_at !== null ||
                              disconnectedPenpal === penpal ? (
                                <p>Disconnected</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>

                          {penpal?.deleted_at == null ? (
                            <div ref={ref} className="xx">
                              <div
                                className={`disconnect-with-penpal ${
                                  disconnect === penpal && "show-disconnect-bar"
                                }`}
                                onClick={() => toggleDisconnect(penpal)}
                              >
                                {threeDots()}
                                {disconnect !== false && (
                                  <div className="disconnect">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDisconnect(selectedPenpal);
                                      }}
                                    >
                                      Disconnect
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                  ) : !isEmpty ? (
                    <span className="no-record-found">No record found </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                className={`penpal-message-box ${
                  toogleMessageBox === true && "mobile-penpal-message-box"
                }`}
              >
                {selectedPenpal !== null ? (
                  <>
                    <div className="penpal-message-box-header d__flex d__flex-h-between d__flex-v-center">
                      <div className="penpal-info d__flex  d__flex-v-center">
                        <div className="penpal-dp">
                          {selectedPenpalImage ? (
                            <img
                              src={`${process.env.REACT_APP_ASSETS_BASE_URL}/${selectedPenpalImage}`}
                            />
                          ) : (
                            penpalAvatar()
                          )}
                        </div>
                        <div className="penpal-name">
                          {singlePenpalHistory && singlePenpalHistory.length
                            ? singlePenpalHistory.map((record, key) => {
                                return (
                                  <span key={key}>
                                    {user?.role_type === 1
                                      ? record?.elder_data?.first_name +
                                        " " +
                                        record?.elder_data?.last_name
                                      : record?.student_data?.first_name}
                                  </span>
                                );
                              })
                            : ""}
                        </div>
                      </div>
                      <div className="disconnect-penpal">
                        <button
                          disabled={
                            singlePenpalHistory?.[0]?.deleted_at !== null
                              ? true
                              : false
                          }
                          onClick={() => handleDisconnect(selectedPenpal)}
                        >
                          {singlePenpalHistory?.[0]?.deleted_at == null
                            ? "Disconnect"
                            : "Disconnected"}
                        </button>
                      </div>
                      <div className="mobile-penpal-menu">
                        <button
                          type="button"
                          onClick={() => setToogleMessageBox(!toogleMessageBox)}
                        >
                          {" "}
                          {doubleArrow()}{" "}
                        </button>
                      </div>
                    </div>
                    <div className={`penpal-chat-box`}>
                      {singlePenpalHistory && singlePenpalHistory.length
                        ? singlePenpalHistory.map((record) => {
                            return record?.letters && record?.letters.length ? (
                              record?.letters.map((singleRecord, key) => {
                                return (
                                  <div
                                    key={key}
                                    className="message-with-penpal d__flex d__flex-h-between"
                                  >
                                    <div className="otheruser-penpal-end">
                                      <h6>
                                        {user?.role_type === 1
                                          ? record?.elder_data.first_name
                                          : record?.student_data.first_name}
                                      </h6>
                                      <p className="uppercase">
                                        <SimpleDateTime
                                          dateSeparator="-"
                                          dateFormat="DMY"
                                          showTime="0"
                                          showDate="1"
                                        >
                                          {record?.created_at}
                                        </SimpleDateTime>
                                        {smallDot()}
                                        <span className="send-date">
                                          {" "}
                                          <SimpleDateTime
                                            timeSeparator=":"
                                            dateSeparator="-"
                                            showTime="1"
                                            showDate="0"
                                            meridians="1"
                                            format="DMY"
                                          >
                                            {record?.created_at}
                                          </SimpleDateTime>{" "}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="current-penpal-end">
                                      {letter()}
                                      <p>
                                        Penpal Letter{" "}
                                        {singleRecord.status === 1
                                          ? "Received"
                                          : singleRecord.status === 2
                                          ? "Pending"
                                          : "Sent"}
                                        !
                                      </p>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <span className="no-letter-found">
                                {" "}
                                Letter history not found.{" "}
                              </span>
                            );
                          })
                        : ""}
                    </div>
                  </>
                ) : (
                  <div className="select-area">
                    <h2>Select Penpal to show details.</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default PenpalHistory;
