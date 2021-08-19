import { useState } from "react";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

import Timer from "./components/Timer/Timer";

import "./App.css";

function App() {
  const [timer, setTimer] = useState("");
  const [savedNum, setSavedNum] = useState(0);
  const [subscription, setSubscription] = useState("");
  const [prevent, setPrevent] = useState(true);

  const onStartHandler = () => {
    if (!subscription) {
      const timerSubscription = interval(1000)
        .pipe(map((v) => v + 1))
        .subscribe((v) => {
          setTimer(v + savedNum);
        });
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setSavedNum(0);
      setSubscription("");
    }
  };

  const onWaitHandler = () => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }
      setSavedNum(timer);
      setSubscription("");
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }

    const timerSubscription = interval(1000).subscribe((v) => {
      setSavedNum(0);
      setTimer(v);
    });

    setSubscription(timerSubscription);
  };

  return (
    <div className="App">
      <Timer timePassed={timer ? timer : savedNum} />
      <div className="App-buttons">
        <button onClick={onStartHandler} className="start-button">
          Start/Stop
        </button>
        <button onClick={onWaitHandler} className="wait-button">
          Wait
        </button>
        <button onClick={onResetHandler} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
