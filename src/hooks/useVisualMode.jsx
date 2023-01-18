import React, {useState} from "react";

export default function useVisualMode(intitalMode) {
  const [mode, setMode] = useState(intitalMode);
  const [history, setHistory] = useState([intitalMode]);

  function transition(transitionMode, replace = false) {
    if (mode !== transitionMode){
      setMode(transitionMode);
      if (replace) {
        history.pop();
      }
      setHistory([...history, transitionMode]);
      console.log("transition" + history);
    }          
  };

  function back() {
    if (history.length > 1) {
    history.pop();
    setHistory([...history]);
    const lastMode = history[history.length - 1];
    setMode(lastMode);
    }
  };

  return {
    mode,
    transition,
    back
  };
}