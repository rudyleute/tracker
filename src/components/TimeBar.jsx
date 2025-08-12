import TimeEntry from './TimeEntry.jsx';
import {v4 as uuidv4} from 'uuid';
import { useEffect } from 'react';
import { useTimeBar } from '../context/TimeBarProvider.jsx';
import Button from './simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronUp, faCirclePlay, faPlus } from '@fortawesome/free-solid-svg-icons';

const cat = [
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  },
  {
    name: "Listening",
    colour: "#7ef542",
    id: [uuidv4()]
  },
  {
    name: "Future",
    colour: "#f54263",
    id: [uuidv4()]
  },
  {
    name: "Productive",
    colour: "#425af5",
    id: [uuidv4()]
  }
]

const TimeBar = () => {
  const {timeEntries, setTimeEntries} = useTimeBar();

  useEffect(() => {
    setTimeEntries({
      [uuidv4()]: {
        name: "Walking",
        categories: cat,
        startTime: '2025-08-12 06:30:02'
      },
      [uuidv4()]: {
        name: "Running",
        categories: cat,
        startTime: '2025-08-12 03:32:17'
      },
      [uuidv4()]: {
        name: "Whatever",
        categories: cat,
        startTime: '2025-08-11 02:11:56'
      }
    });
  }, [])

  const addNewTracker = () => {
    if (Object.keys(timeEntries).length === 4) {
      alert("It is not possible to track more than 4 time entries at once");
      return;
    }
    setTimeEntries(prev => (
      {
        ...prev,
        [uuidv4()]: {
          name: "",
          categories: [],
          startTime: (new Date()).toLocaleString()
        }
      }
    ))
  }

  const onStop = (id) => {
    //add the stopped element to the list below the time bar
    onDelete(id);
  }

  const onDelete = (id) => {
    setTimeEntries(prevEntries => {
      const {[id]: _, ...rest} = prevEntries;

      return rest;
    })
  }

  return (
    <div id={"time-bar"}>
      <div className={"time-bar-control"}>
        <Button title={"Add a new time tracker"} onClick={addNewTracker} className={"btn-circle btn-te-add"}>
          <FontAwesomeIcon icon={faCirclePlay} />
        </Button>
        <Button title={"Collapse trackers"} className={"btn-circle btn-tes"}>
          <FontAwesomeIcon icon={faCircleChevronUp} />
        </Button>
      </div>
      <div className={"time-entries"}>
        { Object.keys(timeEntries).map((key) => {
          return <TimeEntry onStop={onStop} onDelete={onDelete} data={timeEntries[key]} key={key} id={key}/>
        }) }
      </div>
    </div>
  )
}

export default TimeBar;