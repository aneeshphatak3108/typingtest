import { useState, useRef, useEffect } from "react";
import useTimer from "../hooks/useTimer";

function TimerDisplay({ start, istimefinished,  set_istimefinished}) {
  const timeleft = useTimer(start, 60, () => {
    set_istimefinished(true);
  }); // start is true/false
  return (
<div className="w-16 h-16 flex items-center justify-center border-2 rounded-full text-xl font-bold shadow bg-white">
  {timeleft}
    </div>
  );
}

export default TimerDisplay;