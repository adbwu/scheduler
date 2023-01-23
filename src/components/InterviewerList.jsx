import React from "react";

import "components/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

//Returns interviewer elements for the interview form
//Props: interviewers, onChange
export default function InterviewerList (props) {

  const interviewerListItems = 
  props.interviewers.map((interviewer) =>  {
    return (
  
      <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value} 
      setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  });

  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewerListItems}
    </ul>
  </section>
  )
}