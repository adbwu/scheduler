import { getDataForDay, getAppointmentsForDay, getInterviewersForDay, getRemainingSpotsForDay, getInterview } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
      spots:2
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2, 3],
      spots: 1
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

// getDataForDay Tests -------------------
test("getDataForDay with appointments type returns an array", () => {
  const type = "appointments";
  const result = getDataForDay(type, state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getDataForDay with appointments type returns an array with a length matching the number of appointments for that day", () => {
  const type = "appointments";
  const result = getDataForDay(type, state, "Monday");
  expect(result.length).toEqual(3);
});

test("getDataForDay with appointments type returns an array containing the correct appointment objects", () => {
  const type = "appointments"
  const [first, second] = getDataForDay(type, state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getDataForDay with appointments type returns an empty array when the days data is empty", () => {
  const type = "appointments"
  const result = getDataForDay(type, { days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getDataForDay with appointments type returns an empty array when the day is not found", () => {
  const type = "appointments"
  const result = getDataForDay(type, state, "Wednesday");
  expect(result.length).toEqual(0);
});

test("getDataForDay with interview type returns an array", () => {
  const type = "interviewers"
  const result = getDataForDay(type, state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const type = "interviewers"
  const result = getDataForDay(type, state, "Monday");
  expect(result.length).toEqual(2);
});

test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
  const type = "interviewers"
  const [first, second] = getDataForDay(type, state, "Tuesday");
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["2"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const type = "interviewers"
  const result = getDataForDay(type, { days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const type = "interviewers"
  const result = getDataForDay(type, state, "Wednesday");
  expect(result.length).toEqual(0);
});

// getRemainingSpots Test --------------------

test("getRemainingSpotsForDay returns number of empty spots for that day", () => {
  const result = getRemainingSpotsForDay(state.appointments, state.days[0]);
  expect(result).toBe(2);
});


// getInterview Tests ----------------------

test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});

