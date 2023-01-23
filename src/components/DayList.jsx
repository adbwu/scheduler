import React from "react";
import DayListItem from "./DayListItem";

//Returns list of days for sidebar
//Props: days, value, onChange
export default function DayList(props) {

  const dayListItems = props.days.map((day) => {
  return (
     <DayListItem 
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={props.onChange}
      />
  );
  });

  return (
    <section className="DayList">
      <ul>{dayListItems}</ul>
    </section>
  )
}