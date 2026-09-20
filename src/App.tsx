import { useEffect, useState } from "react";
import "./App.css";

function Seperator() {
  return <p className="seperator">|</p>;
}

type buttonArguments = {
  timerStarted: Boolean;
  setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
  process: () => void;
};

function PlayButton({ timerStarted, process }: buttonArguments) {
  const buttonText = timerStarted ? "Pause" : "Play";

  return (
    <button className="timer-button" onClick={process}>
      {buttonText}
    </button>
  );
}

type timerInputElementArguments = {
  type: string;
  setSeconds: React.Dispatch<React.SetStateAction<string>>;
  setMinutes: React.Dispatch<React.SetStateAction<string>>;
  setHours: React.Dispatch<React.SetStateAction<string>>;
};

function TimerInputElement({
  type,
  setSeconds,
  setMinutes,
  setHours,
}: timerInputElementArguments) {
  function setDuration(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    switch (type) {
      case "hh":
        setHours(input);
        break;
      case "mm":
        setMinutes(input);
        break;
      case "ss":
        setSeconds(input);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <input
        className="timer-input-element"
        onChange={setDuration}
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

  function process() {
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
          type="hh"
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          setHours={setHours}
        />

        <Seperator />

        {/* Minutes */}
        <TimerInputElement
          type="mm"
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          setHours={setHours}
        />

        <Seperator />

        {/* Seconds */}
        <TimerInputElement
          type="ss"
          setSeconds={setSeconds}
          setMinutes={setMinutes}
          setHours={setHours}
        />

        <PlayButton
          timerStarted={timerStarted}
          setTimerStarted={setTimerStarted}
          process={process}
        />
      </div>

      <p className="time-remaining">
        {secondsToDuration(totalSeconds)}
      </p>
    </div>
  );
}

export default App;
