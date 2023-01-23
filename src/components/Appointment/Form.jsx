import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//returns the Form mode
//Props: 
  //Intial booking: interviewers, onCancel, onSave
  //Editing a books: student, interviewer, interviewers, onCancel, onSave (fills appropriate fields)
export default function Form(props) {
  //Set intial student to empty or uses provided
  const [student, setStudent] = useState(props.student || "");
  //Sets intial interview to null or uses provided
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //Reset function to clear the form
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
  };

  //Clears the form and intializes canceling
  const cancel = () => {
    reset();
    props.onCancel();
  }

  //Validates correct content is the fields then saves interview
  function validate(student, interviewer) {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {setStudent(event.target.value);}}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList 
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  )
}