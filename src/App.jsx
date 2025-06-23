import { useEffect, useState } from 'react'
import TimerDisplay from './components/TimerDisplay'
import TypingBox from './components/TypingBox'


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [userInput, setUserInput] = useState("");//userInput is a word that we will be building character by character after each key press
  const [correct_char_count, set_correct_char_count] = useState(0);
  const [istimefinished, set_istimefinished] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [targetText, settargetText] = useState("");
  const [char_count, set_char_count] = useState(0);

  //Restart Logic
  const handleRestart = () => {
    setHasStarted(false);
    setUserInput("");
    set_correct_char_count(0);
    set_istimefinished(false);
    setRestartKey(prev => prev+1);
  }

  function fetchNewWords() {
    fetch("https://random-word-api.herokuapp.com/word?number=10")
    .then(res => res.json())
    .then((data)=>{
      settargetText(data.join(" "));
    })
    .catch((err)=>{
      console.error("Failed to fetch words:", err);
    })
    console.log(targetText);
  }

  //fetching new words when restart happens
  useEffect(() => {
    fetchNewWords();
  }, [restartKey]
)

  //fetching new words when user types all current words in the typing box
  useEffect(() => {
    if (userInput.length === targetText.length && targetText.length > 0) {
        setUserInput("")
        fetchNewWords();
    }
  }, [userInput]);

  const wrong_char_count = char_count - correct_char_count;
  const accuracy = char_count === 0 ? 0 : ((correct_char_count / char_count) * 100).toFixed(2);

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
    userInput={userInput}
    setUserInput={setUserInput}
    restartKey={restartKey}
    targetText={targetText}
    set_char_count={set_char_count}
  />

  {/* WPM display */}
  {istimefinished && (
    <div className="text-2xl font-semibold bg-white p-4 rounded-lg shadow-lg">
      <div>WPM: {(correct_char_count / 5).toFixed(2)}</div>
      <div>Accuracy: {accuracy}%</div>

    </div>
  //restart button
  )}

  <div>
  <button onClick={handleRestart} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
    Restart
  </button>
  </div>
</div>
</div>
 );
}
export default App