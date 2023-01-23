import React from "react"

//returns the Empty mode
//props: onAdd
export default function Empty(props) {

  return (
    <main className="appointment__add" >
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
        data-testid={"empty-appointment"}
      />
    </main>
  )
}