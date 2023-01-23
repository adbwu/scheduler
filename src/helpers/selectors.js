//Retrieves appointments for the day, returns an array of appointments
//Args: 
 //State: {day, days, interviewer, interviewers, appointments}
 //Day: id
export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  let dayArray = (state.days.find(obj => obj.name === day));
  if (!day || !dayArray) {
    return appointmentsArray;
  }
  dayArray.appointments.forEach(app => {
    appointmentsArray.push(state.appointments[app]);
  })
  return appointmentsArray;
};

//Retrieves interviews for the day, returns an array of interviews
//Args: 
 //State: {day, days, interviewer, interviewers, appointments}
 //Day: id
export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  let dayArray = (state.days.find(obj => obj.name === day));
  if (!day || !dayArray) {
    return interviewersArray;
  }
  dayArray.interviewers.forEach(app => {
    interviewersArray.push(state.interviewers[app]);
  })
  return interviewersArray;
};

//Retrieves requested interview, returns an interview object
//Args: 
 //State: {day, days, interviewer, interviewers, appointments}
 //Interview: id
export function getInterview(state, interview) {
  let interviewObj = {};
  if (interview === null) {
    return null;
  }
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
};

//Calculates remaining empty spots, returns a number
//Args: 
 //Appointments: array of appointments
 //Day: id
export function getRemainingSpotsForDay(appointments, day) {
  let remainingSpots = 0;
  day.appointments.forEach(app => {
    if (appointments[app].interview === null) {
      remainingSpots++;
    }
  })
  return remainingSpots;
};