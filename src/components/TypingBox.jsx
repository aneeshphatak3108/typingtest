import { useState, useEffect, useRef } from "react";

const TARGET_TEXT = "The quick brown fox";

function TypingBox({ setHasStarted , correct_char_count, set_correct_char_count, istimefinished}) {
  const [userInput, setUserInput] = useState("");//userInput is a word that we will be building character by character after each key press
  const inputRef = useRef(null);

  
  useEffect(() => {
    inputRef.current?.focus(); // focus on load
  }, []);

  useEffect(() => {
    if (istimefinished) {
      inputRef.current?.blur();
    }
  }, [istimefinished])


  /*questions to be asked on the optimisation latesr*/
  const handleKeyDown = (e) => {
    setHasStarted(true);//this is the gadaavr pohochlo ani 3 tophaa for timer
    if (e.key.length === 1) {
      const index = userInput.length;
      const expectedChar = TARGET_TEXT[index];
      if (e.key === expectedChar) {
        set_correct_char_count(prev => prev+1);
      }
      setUserInput(prev => prev + e.key);
    } else if (e.key === "Backspace") {
      const lastIndex = userInput.length-1;
      if (userInput[lastIndex] === TARGET_TEXT[lastIndex]) {
        set_correct_char_count(prev => prev-1);
      }
      setUserInput(prev => prev.slice(0, -1));//removes the last character of the word
    }
  };

  const getCharClass = (char, index) => {
    if (index >= userInput.length) return "text-gray-400";
    if (char === userInput[index]) return "text-green-500";
    return "text-red-500";
  };
//Even if there's a non-breaking space, the browser can still line-break between spans
//hence the <div className="text-2xl whitespace-pre break-words font-mono">
  return (
    <div
      ref={inputRef}
      tabIndex={istimefinished ? -1 : 0}//to make the div element notice keyboard press
      onKeyDown={istimefinished ? undefined : handleKeyDown}//so this is needed because, if after the timer ends, user clicks on the textbox, it will get focused again and handlekeydown will run, to avoid this we make the function to run after onkeydown as undefined
      className="w-[80vw] h-[50vh] border border-gray-400 p-6 rounded-lg shadow-xl outline-none focus:outline-blue-400 text-xl flex flex-wrap items-start"
    >

<div className="text-4xl whitespace-pre break-words font-mono">


  {TARGET_TEXT.split("").map((char, index) => (
    <span key={index} className="relative whitespace-pre">
    <span className={getCharClass(char, index)}>
      {char === ' ' ? '\u00A0' : char}  
    </span>

    {/* Blinking cursor at current char */}
    {index === userInput.length && (
      <span className="absolute left-0 animate-blink w-[2px] h-9 bg-black"></span>
    )}
    </span>
  ))}

  </div>
  </div>
  );
}

export default TypingBox;