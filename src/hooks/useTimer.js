import { useEffect, useState } from "react";
//duration hardcoded to be 1 min
//onFinish is not a standard keyword
function useTimer(start = false, duration = 60, onFinish = () => {}) {
  const [timeleft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!start) {
        setTimeLeft(duration);
        return;
        //return () => clearInterval(interval);
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval); // stop when time reaches 0
          onFinish();//call the passed in function which is going to make istimefinished to true
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  return timeleft;
}

export default useTimer;