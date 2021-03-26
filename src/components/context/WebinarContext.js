import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

export function WebinarProvider(props) {
  const [webinarId, setWebinarId] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [webinarDate, setWebinarDate] = useState("");
  const [presenters, setPresenters] = useState([]);
  const [name, setName] = useState("");

  //User Registration State//
  const [pickedDate, setPickedDate] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [schedule, setSchedule] = useState(0);
  const [loading, setLoading] = useState(true);
  const [twoWebinars, setTwoWebinars] = useState(true);

  //Modal State
  const [modalA, setModalA] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [finished, setFinished] = useState(false);

  //Error Message
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("/api/webinar")
      .then((res) => {
        console.log(res.data.webinar);
        setPresenters(res.data.webinar.presenters);
        setWebinarId(res.data.webinar.webinar_id);
        {
          res.data.webinar.schedules.length !== 2 && setTwoWebinars(false);
        }
        setSchedules(res.data.webinar.schedules);
        setSchedule(res.data.webinar.schedules[0].schedule);
        setName(res.data.webinar.name);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const registerUser = (body) => {
    axios
      .post("/api/webinar/register", body)
      .then((response) => {
        setModalA(false);
        // setLoadingModal(false);
        // setFinished(true);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const surveyAnswers = (body) => {
    setLoadingModal(true);
    axios
      .post("/api/survey", {
        ...body,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Context.Provider
      value={{
        webinarId,
        schedules,
        webinarDate,
        presenters,
        firstName,
        lastName,
        email,
        phone,
        name,
        schedule,
        loading,
        twoWebinars,
        pickedDate,
        modalA,
        loadingModal,
        finished,
        error,
        setError,
        setLoadingModal,
        setFinished,
        surveyAnswers,
        setModalA,
        setPickedDate,
        setLoading,
        registerUser,
        setFirstName,
        setLastName,
        setEmail,
        setPhone,
        setSchedule,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
