import React from "react";

import "components/Button.scss";

import classNames from "classnames";

//Returns a button element
//Props: confirm, danger, onClick, disabled, children
export default function Button(props) {
  const buttonClass = classNames( 'button', {
    'button--confirm': props.confirm, 
    'button--danger': props.danger 
  });
  
  return (
    <button 
      onClick={props.onClick} 
      disabled={props.disabled} 
      className={buttonClass}
    >
      {props.children}
    </button>
    );
  }

