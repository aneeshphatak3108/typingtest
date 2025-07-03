import { useEffect, useRef } from "react";

//const TARGET_TEXT = "The quick brown fox and life is good what is flute bag case peace melancholic and life is good Machine learning Music Leetcode life laptop Bal Shikshan College Window bag gym chest shoulder triceps mouse COEP cultural firodiya karandak purushottam karandak";

function TypingBox({ setHasStarted , correct_char_count, set_correct_char_count, istimefinished, userInput, setUserInput, restartKey, targetText, set_char_count}) {
  //const [userInput, setUserInput] = useState("");//userInput is a word that we will be building character by character after each key press
  const inputRef = useRef(null);
  /*useEffect(() => {
    inputRef.current?.focus(); // focus on load
  }, []);*/

  useEffect(() => {
    //for textbox to stop listening to keyboard pushdowns after time is finished
    if (istimefinished) {
      inputRef.current?.blur();
    }
    //for the restart button
    //we have included targettext in the condition because the div element is not generated before targettext is generated from the o/p of api so the .focus() wont work
    if (!istimefinished && targetText) {
      inputRef.current?.focus();
    }
  }, [istimefinished, restartKey, targetText])



  function getOverallIndex(wordIndex, charIndex) {
    const words = targetText.split(" ");
    let index = 0;
    for (let i = 0; i < wordIndex; i++) {
      index += words[i].length + 1; // +1 for the space
    }
    return index + charIndex;
  }
  


  /*questions to be asked on the optimisation latesr*/
  const handleKeyDown = (e) => {
    setHasStarted(true);//this is the gadaavr pohochlo ani 3 tophaa for timer
    if (e.key.length === 1) {
      const index = userInput.length;
      set_char_count(n => n+1);
      const expectedChar = targetText[index];
      if (e.key === expectedChar) {
        set_correct_char_count(prev => prev+1);
      }
      setUserInput(prev => prev + e.key);
    } else if (e.key === "Backspace") {
      const lastIndex = userInput.length-1;
      set_char_count(n => n-1);
      if (userInput[lastIndex] === targetText[lastIndex]) {
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
if (typeof targetText !== 'string' || targetText.length === 0) {
  return <div>Loading...</div>; // or return null;
}

  return (
    <div
      ref={inputRef}
      tabIndex={istimefinished ? -1 : 0}//to make the div element notice keyboard press
      onKeyDown={istimefinished ? undefined : handleKeyDown}//so this is needed because, if after the timer ends, user clicks on the textbox, it will get focused again and handlekeydown will run, to avoid this we make the function to run after onkeydown as undefined
      className="w-full max-w-4xl h-[50vh] border border-gray-400 p-6 rounded-lg shadow-xl outline-none focus:outline-blue-400 text-xl flex items-start overflow-y-auto"
    >

<div className="whitespace-pre-wrap break-normal font-mono text-4xl leading-relaxed w-full">


  {/*TARGET_TEXT.split("").map((char, index) => (
    <span key={index} className="relative whitespace-pre">
    <span className={getCharClass(char, index)}>
      {char === ' ' ? '\u00A0' : char}  
    </span>

    { Blinking cursor at current char }
    {index === userInput.length && (
      <span className="absolute left-0 animate-blink w-[2px] h-9 bg-black"></span>
    )}
    </span>
  ))*/}


{targetText.split(" ").map((word, wordIndex) => (
  <span key={wordIndex} className="inline-block">
    {word.split("").map((char, charIndex) => {
      const index = getOverallIndex(wordIndex, charIndex); // you'll define this
      return (
        <span key={charIndex} className="relative whitespace-pre">
          <span className={getCharClass(char, index)}>
            {char}
          </span>
          {index === userInput.length && (
            <span className="absolute left-0 animate-blink w-[2px] h-9 bg-black"></span>
          )}
        </span>
      );
    })}
    <span>{'\u00A0'}</span>
  </span>
))}

  </div>
  </div>
  );
}

export default TypingBox;