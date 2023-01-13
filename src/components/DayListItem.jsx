import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {
  const dayListItemClass = classNames( 'day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  const formatSpots = (spotsLeft) => {
    if (spotsLeft === 0) {
      return 'no spots remaining'
    } else if (spotsLeft === 1) {
      return '1 spot remaining'
    } 
    return `${spotsLeft} spots remaining` 
  }
  
  return (
    <li key={props.id} className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}