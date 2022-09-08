import { useEffect, useState } from "react";
import "./App.css";
import { useCountdown } from "./hooks/useCountdown";

function App() {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  let endTime = new Date().getTime();
  const [timeLeft, setTimeLeft] = useCountdown(endTime);
  const seconds = Math.floor(timeLeft / 1000) % 60;

  useEffect(() => {
    if (started) {
      endTime = new Date().getTime() + 1000 * 10;
      setTimeLeft(endTime);
    }
  }, [started]);

  const handleClick = () => {
    if (count === 0) setStarted(true);
    if (timeLeft > 0) setCount((prev) => prev + 1);
  };

  const reset = () => {
    setStarted(false);
    setCount(0);
    setTimeLeft(0);
  };

  let innerButton = `${
    count > 0
      ? `${timeLeft > 0 ? count : `You clicked at ${count / 10} CPS`}`
      : `Click here to start`
  }`;

  return (
    <>
      <h1>Click test {seconds}</h1>
      <button onClick={() => handleClick()}>{innerButton}</button>
      <br />
      <button className="reset" onClick={() => reset()}>
        Reset
      </button>
    </>
  );
}

export default App;
