import { useState, useEffect } from "react";
import Axios from "axios";
import { getRemainingSpotsForDay } from "helpers/selectors";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    interviewer: '',
    interviewers: {},
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
    Axios.get('/api/days'),
    Axios.get('/api/appointments'),
    Axios.get('/api/interviewers')])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })}, []);

  function setDay(day) {
    setState({ ...state, day });
  }

  function setInterviewer(interviewer) {setState({ ...state, interviewer });
  }

  function updateSpots(appointments) {
    const dayIndex = state.days.findIndex(day => day.name === state.day);
    const day = state.days[dayIndex];
    const spots = getRemainingSpotsForDay(appointments, day);
    day.spots = spots;
    const days = state.days.map(d => d.name === state.day ? d = day: d);
    setState(prev => ({ ...prev, days}))
  }

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
          updateSpots(appointments);
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
          updateSpots(appointments);
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

  return {
    state,
    setDay,
    setInterviewer,
    bookInterview,
    cancelInterview,
  };
}