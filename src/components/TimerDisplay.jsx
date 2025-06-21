import { useState, useRef, useEffect } from "react";
import useTimer from "../hooks/useTimer";

function TimerDisplay({ start }) {
  const timeleft = useTimer(start, 60); // start is true/false

/*  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        border: "2px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem"
      }}
    >
      {timeleft}
    </div>
  );*/

  return (
<div className="w-16 h-16 flex items-center justify-center border-2 rounded-full text-xl font-bold shadow bg-white">
  {timeleft}
    </div>
  );
}

export default TimerDisplay;