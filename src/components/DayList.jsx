import React from "react";
import DayListItem from "./DayListItem";
import { useState } from "react";

export default function DayList(props) {

  const dayListItems = props.days.map((day) => {
  return (<ul>
     <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
      />
  </ul>);
  });

  return (
    <section className="DayList">
      {dayListItems}
    </section>
  )
}