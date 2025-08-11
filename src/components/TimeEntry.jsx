import Button from './simple/Button.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleMinus,
  faCircleStop,
} from '@fortawesome/free-solid-svg-icons';
import Input from './simple/Input.jsx';
import Categories from './Categories.jsx';

const TimeEntry = () => {
  const [name, setName] = useState('');

  return (
    <div className={"time-bar"}>
      <div className={"time-bar-timer"}>
        <Button title={"Edit"}>
          <span className={"timer-time"}>15:00:12</span>
        </Button>
      </div>
      <div className={"time-bar-main"}>
        <div className={"main-data"}>
          <Input type={"text"} name={"name"} className={"time-name"} onChange={(e) => setName(e.target.value)}
                 value={name} variant="filled"/>
        </div>
        <Categories />
      </div>
      <div className={"time-bar-actions"}>
        <Button title={"Stop the timer"} className={"btn-icon btn-circle btn-stop"}>
          <FontAwesomeIcon icon={faCircleStop}/>
        </Button>
        <Button title={"Delete the timer"} className={"btn-icon btn-circle btn-del"}>
          <FontAwesomeIcon icon={faCircleMinus}/>
        </Button>
      </div>
    </div>
  )
}

export default TimeEntry;