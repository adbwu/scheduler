import { useState, useEffect } from "react";
import Axios from "axios";

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
    Axios.get('http://localhost:8001/api/days'),
    Axios.get('http://localhost:8001/api/appointments'),
    Axios.get('http://localhost:8001/api/interviewers')])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })}, []);
  

  function setDay(day) {
    setState({ ...state, day });
  }

  function setInterviewer(interviewer) {setState({ ...state, interviewer });
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
  return {
    state,
    setDay,
    setInterviewer,
    bookInterview,
    cancelInterview
  };
}