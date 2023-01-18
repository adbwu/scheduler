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

export function getInterview(state, interview) {
  let interviewObj = {};
  if (interview === null) {
    return null;
  }
  interviewObj.student = interview.student;
  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
};