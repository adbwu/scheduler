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
      // Does not add current mode to history if replace is true
      if (!replace) {
        //Adds requested mode to history array
        setHistory(prev => [...prev, transitionMode]);
        console.log("trans " + history);
      }
    }          
  };

  //Sets requested mode to the previous mode in history record
  function back() {
    //Ensures there is a mode to return to
    if (history.length > 1) {
    //Removes current mode from history array and updates it
    setHistory((prev) => prev.filter((mode, index) => index !== (prev.length - 1)));
    //Sets the mode to the last mode in the history array
    const lastMode = history[history.length - 2];
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