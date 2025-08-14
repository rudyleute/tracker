import Button from '../simple/Button.jsx';
import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleMinus,
  faCircleStop
} from '@fortawesome/free-solid-svg-icons';
import Input from '../simple/Input.jsx';
import Categories from './Categories.jsx';
import { useTimeBar } from '../../context/TimeBarProvider.jsx'
import { useModal } from '../../context/ModalProvider.jsx'
import Timer from './Timer.jsx';
import EntryEdit from './EntryEdit.jsx';

const TimeEntry = ({ id: entryId, onStop, onDelete }) => {
  const { timeEntries, setTimeEntries } = useTimeBar();
  const [values, setValues] = useState({
    name: "",
    diffSec: null
  });
  const { showModal, hideModal } = useModal();

  useEffect(() => {
    const { name, startTime } = timeEntries.find(el => el.id === entryId);

    const start = new Date(startTime);
    const now = new Date();
    const initialDiffSeconds = Math.max(0, Math.floor((now - start) / 1000));

    setValues({
      name,
      diffSec: initialDiffSeconds
    })
  }, [timeEntries])

  const handleBlur = () => {
    //save the data to the database
    //receive the saved element
    //propagate the saved element to the onBlur function
    setTimeEntries(prevEntries => prevEntries.map(elem => {
      if (elem.id !== entryId) return elem

      return { ...elem, name: values.name }
    }));
  }

  const onTimerClick = () => {
    showModal(<EntryEdit entryId={entryId}/>, "Edit", () => {
      alert("Save");
      hideModal();
    })
  }

  return (
    <div className={"time-entry"}>
      <Timer onClick={onTimerClick} curTime={values.diffSec}/>
      <div className={"time-entry-main"}>
        <div className={"main-data"}>
          <Input type={"text"} name={"name"} className={"time-name"} onBlur={handleBlur}
                 onChange={(e) => setValues(prev => {
                   return {
                     ...prev,
                     "name": e.target.value
                   }
                 })}
                 value={values.name} variant="filled"/>
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