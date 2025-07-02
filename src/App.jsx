import { useEffect, useState } from 'react'
import TimerDisplay from './components/TimerDisplay'
import TypingBox from './components/TypingBox'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [userInput, setUserInput] = useState("");//userInput is a word that we will be building character by character after each key press
  const [correct_char_count, set_correct_char_count] = useState(0);
  const [istimefinished, set_istimefinished] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [targetText, settargetText] = useState("");
  const [char_count, set_char_count] = useState(0);
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  const navigate = useNavigate();

  //saving user score logic
  const  handleSave = async () => {
    if (isScoreSaved)
      return;
    const scoreData = {
      score: (correct_char_count / 5).toFixed(2),
      accuracy: accuracy
    }
    try {
      await axios.post('http://localhost:5000/api/savescore', scoreData, { withCredentials: true});
      setIsScoreSaved(true);
      alert("Scored saved successfully");
    }
    catch(error) {
      //if user has not logged in send score and user to /login
      if (error.response?.status===401) {
        //setScoreToSave(scoreData);
        alert("Please log in to save your score");
        navigate("/login", { state: {score: scoreData}});
      }
      else {
        alert("Failed to save score: " + (error.response?.data?.message || error.message));
      }
    }
  }

  //Restart Logic
  const handleRestart = () => {
    setHasStarted(false);
    setUserInput("");
    set_correct_char_count(0);
    set_istimefinished(false);
    setRestartKey(prev => prev+1);
  }


  function fetchNewWords() {
    fetch("https://random-word-api.vercel.app/api?words=15")
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

  /*Make the score saving option availaible*/
  useEffect(() => {
    if (istimefinished) {
      setIsScoreSaved(false);
    }
  }, [istimefinished]);


  const wrong_char_count = char_count - correct_char_count;
  const accuracy = char_count === 0 ? 0 : ((correct_char_count / char_count) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Timer at the top center */}
      <div className="flex justify-center py-6">
        <TimerDisplay start={hasStarted}
                      istimefinished={istimefinished}
                      set_istimefinished={set_istimefinished}
        />
      </div>

    {/*wrapping the typing box and wpm in one div*/}
      <div className="flex flex-col items-center gap-4 h-[calc(100vh-120px)] justify-center bg-white">
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
  )}

  {/*save button display*/}
  {istimefinished && (
      <div>
        <button onClick={handleSave} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
          Save score
        </button>
      </div>
 )}

  {/*restart button*/}
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