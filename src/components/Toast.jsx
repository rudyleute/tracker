import { useEffect, useRef } from 'react';
import Button from './simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const duration = 5000;
const Toast = ({ type, value, onClose }) => {
  const timerRef = useRef(null);
  const remainingRef = useRef(duration);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimer();
    return stopTimer;
  })

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(onClose, remainingRef.current);
  }

  const stopTimer = () => {
    clearTimeout(timerRef.current);
    remainingRef.current -= Date.now() - startTimeRef.current;
  }

  return (
    <div
      className={`toast toast-${type}`}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <div className={"toast-header"}>
        <Button className={"btn-icon"} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark}/>
        </Button>
      </div>
      <div className={"toast-content"}>
       <span className={"toast-text"}>
         {value}
       </span>
      </div>
    </div>
  )
}

export default Toast;