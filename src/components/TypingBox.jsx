import { useState, useEffect, useRef } from "react";

const TARGET_TEXT = "The quick brown fox";

function TypingBox({ setHasStarted }) {
  const [userInput, setUserInput] = useState("");//userInput is a word that we will be building character by character after each key press
  const inputRef = useRef(null);

  
  useEffect(() => {
    inputRef.current?.focus(); // focus on load
  }, []);

  /*questions to be asked on the optimisation latesr*/
  const handleKeyDown = (e) => {
    setHasStarted(true);//this is the gadaavr pohochlo ani 3 tophaa for timer
    if (e.key.length === 1) {
      setUserInput(prev => prev + e.key);
    } else if (e.key === "Backspace") {
      setUserInput(prev => prev.slice(0, -1));//removes the last character of the word
    }
  };

  const getCharClass = (char, index) => {
    if (index >= userInput.length) return "text-gray-400";
    if (char === userInput[index]) return "text-green-500";
    return "text-red-500";
  };

  return (
    <div
      ref={inputRef}
      tabIndex={0}//to make the div element notice keyboard press
      onKeyDown={handleKeyDown}
      className="w-[80vw] h-[50vh] border border-gray-400 p-6 rounded-lg shadow-xl outline-none focus:outline-blue-400 text-xl flex flex-wrap items-start"
    >

  {TARGET_TEXT.split("").map((char, index) => (
    <span key={index} className="relative whitespace-pre">
    <span className={getCharClass(char, index)}>
      {char === ' ' ? '\u00A0' : char}  
    </span>

    {/* Blinking cursor at current char */}
    {index === userInput.length && (
      <span className="absolute left-0 animate-blink w-[2px] h-6 bg-black"></span>
    )}
    </span>
  ))}

    </div>
  );
}

export default TypingBox;
