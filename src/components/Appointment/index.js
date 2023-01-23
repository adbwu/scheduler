import React from "react";

import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

//Called from Application.js
//Props: key, id, time, interview, interviewers, bookInterview, cancelInterview
export default function Appointment(props){ 

  //List of available modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  //Sets initial mode based on the occurance of an interview or not
  const { mode, transition, back } = useVisualMode(props.interview? SHOW : EMPTY);
  
  //saves an interview
  function save(name, interviewer) {
    //Sets the interview
    const interview = {
      student: name,
      interviewer
    };
    //uses useVisualMode hook to set mode to "Saving" so user knows information is being processed
    transition(SAVING);
    props
      //Boooks the interview
      .bookInterview(props.id, interview)
      .then(() => {
        //Shows the resulting booked interview
        transition(SHOW);})
      //Catches the error and shows error mode to the user
      .catch(error => transition(ERROR_SAVE, true));
  };

  //deletes a currently existing interview
  function destroy() {
    //uses useVisualMode hook to set mode to "Deleting" so user knows information is being processed
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      //Shows the resulting empty interview slot
      .then(() => transition(EMPTY))
      //Catches the error and shows error mode to the user
      .catch(error => transition(ERROR_DELETE, true));
  }

  //Returns the appointment componment, with content based on the use of useVisualMode hook and user interaction
  return (
    <article className="appointment" data-testid="appointment">
      <Header 
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={'Saving...'}
        />
      )}
      {mode === DELETING && (
        <Status
          message={'Deleting...'}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={destroy}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Unable to delete!"}
          onClose={() => back()}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Unable to save!"}
          onClose={() => back()}
        />
      )}
    </article>
  )
}