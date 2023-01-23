import {useState} from "react";

//Hook that changes what is shown in the Appointment slot user is interacting with, returns function that changes the mode, and maintains a record of modes.
export default function useVisualMode(intitalMode) {
  const [mode, setMode] = useState(intitalMode);
  const [history, setHistory] = useState([intitalMode]);

  //Takes in mode, and optional "replace" as props, sets the mode, and maintains a record of mode, a deletes previous mode if replace is "true".
  function transition(transitionMode, replace = false) {
    if (mode !== transitionMode){
      //Sets the requested mode
      setMode(transitionMode);
      // Removes previous mode (in the case of an error)
      if (replace) {
        history.pop();
      }
      //Adds requested mode to history array
      setHistory([...history, transitionMode]);
    }          
  };

  //Sets requested mode to the previous mode in history record
  function back() {
    //Ensures there is a mode to return to
    if (history.length > 1) {
    //Removes current mode from history array and updates it
    history.pop();
    setHistory([...history]);
    //Sets the mode to the last mode in the history array
    const lastMode = history[history.length - 1];
    setMode(lastMode);
    }
  };

  //Exports functions
  return {
    mode,
    transition,
    back
  };
}