import Button from './simple/Button.jsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleMinus,
  faCircleStop,
} from '@fortawesome/free-solid-svg-icons';
import Input from './simple/Input.jsx';
import Categories from './Categories.jsx';
import {useTimeBar} from '../context/TimeBarProvider.jsx'
import {useModal} from '../context/ModalProvider.jsx'
import Timer from './Timer.jsx';
import EntryEdit from './EntryEdit.jsx';

const TimeEntry = ({id: entryId, data, onStop, onDelete}) => {
  const {name, startTime} = data;
  const [value, setValue] = useState(name);
  const { timeEntries, setTimeEntries } = useTimeBar();
  const { showModal, hideModal } = useModal();

  const start = new Date(startTime);
  const now = new Date();
  const initialDiffSeconds = Math.max(0, Math.floor((now - start) / 1000));
  console.log(initialDiffSeconds, start, startTime)

  const handleBlur = () => {
    //save the data to the database
    //receive the saved element
    //propagate the saved element to the onBlur function
    setTimeEntries(prevEntries => prevEntries.map(elem => {
      if (elem.id !== entryId) return elem

      return {...elem, name: value}
    }));
  }

  const onTimerClick = () => {
    showModal(<EntryEdit entryId={entryId} />, "Edit", () => {
      alert("Save");
      hideModal();
    })
  }

  return (
    <div className={"time-entry"}>
      <Timer onClick={onTimerClick} curTime={initialDiffSeconds}/>
      <div className={"time-entry-main"}>
        <div className={"main-data"}>
          <Input type={"text"} name={"name"} className={"time-name"} onBlur={handleBlur} onChange={(e) => setValue(e.target.value)}
                 value={value} variant="filled"/>
        </div>
        <Categories timeEntryId={entryId}/>
      </div>
      <div className={"time-entry-actions"}>
        <Button title={"Stop the timer"} onClick={() => onStop(entryId)} className={"btn-icon btn-circle btn-stop"}>
          <FontAwesomeIcon icon={faCircleStop}/>
        </Button>
        <Button title={"Delete the timer"} onClick={() => onDelete(entryId)} className={"btn-icon btn-circle btn-del"}>
          <FontAwesomeIcon icon={faCircleMinus}/>
        </Button>
      </div>
    </div>
  )
}

export default TimeEntry;