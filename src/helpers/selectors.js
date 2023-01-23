//Retrieves data for the day based on type, returns an array of either appointments or interviewers
//Args: 
  //Type: ("interviewers" or "appointments")
  //State: {day, days, interviewer, interviewers, appointments}
  //Day: id
export function getDataForDay(type, state, day) {
  let dayDataArray = [];
  let dayArray = (state.days.find(obj => obj.name === day));
  if (!day || !dayArray) {
    return dayDataArray;
  }
  dayArray[type].forEach(app => {
    dayDataArray.push(state[type][app]);
  })
  return dayDataArray;
}

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