import { useEffect, useState } from "react";
import "./App.css";

function Seperator() {
  return <p className="seperator">|</p>;
}

type buttonArguments = {
  timerStarted: Boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  startTimer: () => void;
};

function PlayButton({ timerStarted, startTimer }: buttonArguments) {
  const buttonText = timerStarted ? "Stop" : "Start";

  return (
    <button className="timer-button" onClick={startTimer}>
      {buttonText}
    </button>
  );
}

type timerInputElementArguments = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function TimerInputElement({
  value,
  setValue
}: timerInputElementArguments) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <>
      <input
        className="timer-input-element"
        value={value}
        onChange={handleChange}
        maxLength={2}
        placeholder="00"
      />
    </>
  );
}

function App() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    if (!timerStarted) {
      return;
    }

    const intervalId = setInterval(() => {
      setTotalSeconds((current) => {
        if ( current <= 1) {
          setTimerStarted(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerStarted]);

  function resetTimer() {
    setHours('');
    setMinutes('');
    setSeconds('');
    setTotalSeconds(0);
    setTimerStarted(false);
  }

  function startTimer() {
    // calculate total number of seconds.
    const totalSeconds = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    setTotalSeconds(totalSeconds);
    setTimerStarted(!timerStarted);
  }

  function secondsToDuration(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="container">
      <div className="timer-input-row">
        {/* Hours */}
        <TimerInputElement
          value={hours}
          setValue={setHours}
        />

        <Seperator />

        {/* Minutes */}
        <TimerInputElement
          value={minutes}
          setValue={setMinutes}
        />

        <Seperator />

        {/* Seconds */}
        <TimerInputElement
          value={seconds}
          setValue={setSeconds}
        />

        <PlayButton
          timerStarted={timerStarted}
          setTimerStarted={setTimerStarted}
          startTimer={startTimer}
        />

        <button className="timer-button" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <p className="time-remaining">
        {secondsToDuration(totalSeconds)}
      </p>
    </div>
  );
}

export default App;
