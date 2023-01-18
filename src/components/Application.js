import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    interviewer: '',
    interviewers: {},
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setInterviewer = interviewer => setState({ ...state, interviewer });

  useEffect(() => {
    Promise.all([
    Axios.get('http://localhost:8001/api/days'),
    Axios.get('http://localhost:8001/api/appointments'),
    Axios.get('http://localhost:8001/api/interviewers')])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })}, []);

  let dailyAppointments = getAppointmentsForDay(state, state.day);
  let dailyInterviewers = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    return new Promise((resolve, reject) => {
      const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
      };
      const appointments = {
      ...state.appointments,
      [id]: appointment
      };
      Axios.put(`/api/appointments/${id}`, {...appointment})
        .then((res) => {
          setState({ ...state, appointments });
          resolve(res);
      })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error.response.data);
          reject(error);
      });
    });
  }

  function cancelInterview(id) {
    return new Promise((resolve, reject) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      Axios.delete(`/api/appointments/${id}`, {appointment})
        .then((res) => {
          setState({ ...state, appointments });
          resolve(res);
      })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error.response.data);
          reject(error);
      });
    })
  }

    
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
            >
              <InterviewerList 
              value={state.interviewer}
              onChange={setInterviewer}
              />
            </DayList>
            
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
              interviewers={dailyInterviewers}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
