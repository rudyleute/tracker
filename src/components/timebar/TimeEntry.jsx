import Button from '../simple/Button.jsx';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleMinus,
  faCircleStop
} from '@fortawesome/free-solid-svg-icons';
import Categories from './Categories.jsx';
import { useTimeBar } from '../../context/TimeBarProvider.jsx'
import { useModal } from '../../context/ModalProvider.jsx'
import Timer from './Timer.jsx';
import EntryEdit from './EntryEdit.jsx';
import Autocomplete from '../simple/Autocomplete.jsx';
import Category from './Category.jsx';
import {v4 as uuidv4} from 'uuid';

const entries = [
  {
    name: "Whatever",
    id: uuidv4(),
    categories: [
      {
        id: uuidv4(),
        name: "Productive",
        colour: "blue"
      },
      {
        id: uuidv4(),
        name: "Leisure",
        colour: "red"
      }
    ]
  },
  {
    name: "Running",
    id: uuidv4(),
    categories: [
      {
        id: uuidv4(),
        name: "Relaxing",
        colour: "green"
      }
    ]
  },
  {
    name: "Walking",
    id: uuidv4(),
    categories: [
      {
        id: uuidv4(),
        name: "Whatever",
        colour: "white"
      },
      {
        id: uuidv4(),
        name: "One more",
        colour: "red"
      },
      {
        id: uuidv4(),
        name: "Another",
        colour: "red"
      }
    ]
  },
  {
    name: "Walking 200m",
    id: uuidv4(),
    categories: [
      {
        id: uuidv4(),
        name: "Whatever",
        colour: "white"
      },
      {
        id: uuidv4(),
        name: "One more",
        colour: "red"
      },
      {
        id: uuidv4(),
        name: "Another",
        colour: "red"
      }
    ]
  }
]

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

    // #TODO update values in the context instead of maintaining the value in the state (maybe with a debouncer)
    // #TODO start using useMemo so that time tracker do not rerender when they are not changed
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

  const fetchOptions = () => {
    //#TODO there should be actual retrieval of the elements from the backend
    const lowerCaseName = values.name.toLowerCase();
    return entries.filter(entry => entry.name.toLowerCase().includes(lowerCaseName));
  }

  const handleOptionSelect = (entry, hideOptions) => {
    setValues(prev => ({ ...prev, name: entry.name }));

    setTimeEntries(prevEntries => prevEntries.map(elem => {
      if (elem.id !== entryId) return elem

      return { ...elem, name: entry.name, categories: entry.categories }
    }));

    if (typeof hideOptions === "function") hideOptions();
  }

  const renderOptions = (values, {hideOptions}) => values.map((elem, index) => {
    return (
      <div onPointerDown={(e) => {
        e.preventDefault();
        handleOptionSelect(elem, hideOptions);
      }} key={index} className={"search-option"}>
        <span className={"search-option-name"}>{elem.name}</span>
        <div className={"categories-list"}>{
          elem.categories.map(({id, ...rest}) => <Category className={"category-transparent"} data={rest} key={id} />)
        }</div>
      </div>
    )
  })

  return (
    <div className={"time-entry"}>
      <Timer onClick={onTimerClick} curTime={values.diffSec}/>
      <div className={"time-entry-main"}>
        <div className={"main-data"}>
          <Autocomplete type={"text"} name={"name"} className={"time-name"} onBlur={handleBlur}
                        fetchOptions={fetchOptions}
                        renderOptions={renderOptions}
                        onChange={(e) => setValues(prev => {
                   return {
                     ...prev,
                     "name": e.target.value
                   }
                 })}
                        value={values.name} />
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