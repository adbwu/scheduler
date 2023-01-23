import React from "react";

import "components/Application.scss";

import useApplicationData from "hooks/useApplicationData";

import DayList from "./DayList";
import InterviewerList from "./InterviewerList";
import Appointment from "./Appointment";
import { getDataForDay, getInterview } from "helpers/selectors";

export default function Application() {
  const {
    state,
    setDay,
    setInterviewer,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  //Retrieves interviews, returns an array
  let dailyInterviewers = getDataForDay("interviewers", state, state.day);
  
  //Retrieves interviews, returns components
  let dailyAppointments = getDataForDay("appointments", state, state.day).map((appointment) => {
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
  });

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
        {dailyAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
