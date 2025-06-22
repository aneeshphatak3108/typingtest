import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TimerDisplay from './components/TimerDisplay'
import TypingBox from './components/TypingBox'


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [correct_char_count, set_correct_char_count] = useState(0);
  const [istimefinished, set_istimefinished] = useState(false);
  //for debugging purposes
  //console.log("Correct characters:", correct_char_count);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Timer at the top center */}
      <div className="flex justify-center py-6">
        <TimerDisplay start={hasStarted}
                      istimefinished={istimefinished}
                      set_istimefinished={set_istimefinished}
        />
      </div>

    {/*wrapping the typing box and wpm in one div*/}
      <div className="flex flex-col items-center gap-4 h-[calc(100vh-120px)] justify-center">
  {/* Typing box centered in page */}
  <TypingBox
    setHasStarted={setHasStarted}
    correct_char_count={correct_char_count}
    set_correct_char_count={set_correct_char_count}
    istimefinished={istimefinished}
  />

  {/* WPM display */}
  {istimefinished && (
    <div className="text-2xl font-semibold bg-white p-4 rounded-lg shadow-lg">
      WPM: {(correct_char_count / 5).toFixed(2)}
    </div>
  )}
</div>
</div>
 );
}
export default App