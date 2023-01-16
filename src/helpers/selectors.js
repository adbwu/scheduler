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