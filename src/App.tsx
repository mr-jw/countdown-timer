import { useEffect, useState } from "react";
import "./App.css";

function Timer() {
  return <></>;
}

function Seperator() {
  return <p className="seperator">|</p>;
}

type buttonArguments = {
  timerStarted: Boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

function Button({ timerStarted, setTimerStarted }: buttonArguments) {
  const buttonText = timerStarted ? "Pause" : "Play";

  return (
    <button
      className="timer-button"
      onClick={() => setTimerStarted(!timerStarted)}
    >
      {buttonText}
    </button>
  );
}

function App() {
  const now = new Date();
  const [timerStarted, setTimerStarted] = useState(false);
  let [count, setCount] = useState(0);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (timerStarted) {
      intervalId = setInterval(() => setCount((current) => current + 1), 1000);
    }

    return () => clearInterval(intervalId);
  });

  return (
    <div className="container">
      <div className="timer-input-row">
        {/* Hours */}
        <input className="timer-input-element" maxLength={2} placeholder="00" />

        <Seperator />

        {/* Minutes */}
        <input className="timer-input-element" maxLength={2} placeholder="00" />

        <Seperator />

        {/* Seconds */}
        <input className="timer-input-element" maxLength={2} placeholder="00" />

        <Button timerStarted={timerStarted} setTimerStarted={setTimerStarted} />
      </div>

        <p className="timer-output">{count} {timerStarted}</p>
    </div>
  );
}

export default App;
