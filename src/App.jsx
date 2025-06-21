import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TimerDisplay from './components/TimerDisplay'
import TypingBox from './components/TypingBox'


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [correct_char_count, set_correct_char_count] = useState(0);
  //for debugging purposes
  console.log("Correct characters:", correct_char_count);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Timer at the top center */}
      <div className="flex justify-center py-6">
        <TimerDisplay start={hasStarted}/>
      </div>

      {/* Typing box centered in page */}
      <div className="flex justify-center items-center h-[calc(100vh-120px)]">
        <TypingBox setHasStarted={setHasStarted}
        correct_char_count={correct_char_count}
        set_correct_char_count={set_correct_char_count}
        />
      </div>
    </div>
  );
}

export default App