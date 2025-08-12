import Button from './simple/Button.jsx';
import { useEffect, useState } from 'react';

const Timer = ({curTime}) => {
  const [timer, setTimer] = useState(curTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const sec = timer % 60;
  const min = Math.floor((timer % 3600) / 60);
  const h = Math.floor(timer / 3600);

  return (
    <div className={"time-entry-timer"}>
      <Button title={"Edit"}>
        <span className={"timer-time"}>
          {String(h).padStart(2, '0')}:{String(min).padStart(2, '0')}:{String(sec).padStart(2, '0')}
        </span>
      </Button>
    </div>
  )
}

export default Timer;