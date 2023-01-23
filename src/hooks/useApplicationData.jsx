import { useState, useEffect } from "react";
import Axios from "axios";
import { getRemainingSpotsForDay } from "helpers/selectors";

//Hook that maintains the state of data related to interviews through out application
export default function useApplicationData() {

  //Maintains the state for items listed
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    interviewer: '',
    interviewers: {},
    appointments: {}
  });

  //Retrieves database content from API
  useEffect(() => {
    Promise.all([
    Axios.get('/api/days'),
    Axios.get('/api/appointments'),
    Axios.get('/api/interviewers')])
    .then((all) => {
      //Sets the state for each item in object on API response
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })}, []);

  function setDay(day) {
    setState({ ...state, day });
  }

  function setInterviewer(interviewer) {
    setState({ ...state, interviewer });
  }

  //Function to update remaining spots for day in side bar
  function updateSpots(appointments) {
    const dayIndex = state.days.findIndex(day => day.name === state.day);
    const day = state.days[dayIndex];
    //Takes in appointments array and passes currently selected day's appointments to a help function that returns remaininingSpots
    const spots = getRemainingSpotsForDay(appointments, day);
    day.spots = spots;
    //Sets the days state to trigger a rerender of sidebar
    const days = state.days.map(d => d.name === state.day ? d = day: d);
    setState(prev => ({ ...prev, days}));
  }

  //Sends data to Axios based on whether there is an interview or not, returns response
  function sendData(id, appointment) {
    if (appointment.interview) {
      return new Promise((resolve, reject) => {
        Axios
          .put(`/api/appointments/${id}`, {...appointment})
          .then(res => resolve(res))
          .catch(err => reject(err));
      });
    };
    return new Promise((resolve, reject) => {
      Axios
        .delete(`/api/appointments/${id}`, {appointment})
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  };

  //Takes in id and interview as props, and returns a promise that confirms that interview was booked or deleted, depending on if an interview was included in args.
  function manageInterview(id, interview) {
    return new Promise((resolve, reject) => {
      //Creates appointment object
      const appointment = {
      ...state.appointments[id],
      //Sets interview to "null" if it doesn't exist
      interview: (interview ? { ...interview } : null)
      };
      //Adds appointment to current appointments object
      const appointments = {
      ...state.appointments,
      [id]: appointment
      };
      //Updates appointments in API
      sendData(id, appointment)
        .then((res) => {
          //Sets the appointments state to trigger rerender
          setState({ ...state, appointments });
          //Updates the remain spots in sidebar
          updateSpots(appointments);
          //Returns promise to trigger Show visual mode
          resolve(res);
      })
        .catch((error) => {
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error.response.data);
          //Returns error to trigger Error visual mode
          reject(error);
      });
    });
  }

  //Exports functions
  return {
    state,
    setState,
    setDay,
    setInterviewer,
    manageInterview
  };
}