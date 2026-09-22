import { useEffect, useState } from "react";
import "./App.css";

function Seperator() {
  return <p className="seperator">|</p>;
}

type PlayButtonProps = {
  timerStarted: boolean;
  startTimer: () => void;
};

function PlayButton({ timerStarted, startTimer }: PlayButtonProps) {
  const buttonText = timerStarted ? "Stop" : "Start";

  return (
    <button className="timer-button" onClick={startTimer}>
      {buttonText}
    </button>
  );
}

type TimerElementProps = {
  value: string;
  onChange: (value: string) => void;
};

function TimerElement({ value, onChange }: TimerElementProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
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

type CircularCountdownProps = {
  totalSeconds: number;
  secondsRemaining: number;
};

function CircleCountdown( {totalSeconds, secondsRemaining}: CircularCountdownProps) {
  const progressPercent = (totalSeconds - secondsRemaining) / totalSeconds;
  const degrees = progressPercent * 360;

   function secondsToDuration(totalSeconds: number) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const timerEl = document.getElementById('timer'); 

  if (timerEl !== null)
    timerEl.style.background = `conic-gradient( #37b777 ${degrees}deg, #2c4338 ${degrees}deg)`;

  return (
    <div className="countdown-timer" id="timer">
      <div className="timer-inner">{secondsToDuration(secondsRemaining)}</div>
    </div>
  );
}

function App() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!timerStarted) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setTimerStarted(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerStarted]);

  function resetTimer() {
    setHours("");
    setMinutes("");
    setSeconds("");
    setTotalSeconds(0);
    setSecondsLeft(0);
    setTimerStarted(false);
  }

  function startTimer() {
    // calculate total number of seconds.
    const totalSeconds =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    setTotalSeconds(totalSeconds);
    setSecondsLeft(totalSeconds);
    setTimerStarted(!timerStarted);
  }

  return (
    <div className="container">
      <div className="timer-input-row">
        {/* Hours */}
        <TimerElement value={hours} onChange={setHours} />

        <Seperator />

        {/* Minutes */}
        <TimerElement value={minutes} onChange={setMinutes} />

        <Seperator />

        {/* Seconds */}
        <TimerElement value={seconds} onChange={setSeconds} />

        <PlayButton
          timerStarted={timerStarted}
          startTimer={startTimer}
        />

        <button className="timer-button" onClick={resetTimer}>
          Reset
        </button>
      </div>

      <CircleCountdown totalSeconds={totalSeconds} secondsRemaining={secondsLeft}/>
    </div>
  );
}

export default App;
