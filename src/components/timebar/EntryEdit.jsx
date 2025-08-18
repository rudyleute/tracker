import { useTimeBar } from '../../context/TimeBarProvider.jsx';
import { useEffect, useState } from 'react';
import Input from '../simple/Input.jsx';
import Button from '../simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons';
import Categories from './Categories.jsx';
import Datetime from '../simple/Datetime.jsx';
import {useToasts} from '../../context/ToastProvider.jsx';

const EntryEdit = ({ entryId }) => {
  const { timeEntries, setTimeEntries } = useTimeBar();
  const { addMessage } = useToasts();

  const [values, setValues] = useState({
    name: "",
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    setValues(timeEntries.find(el => el.id === entryId));
  }, [timeEntries]);

  const saveChanges = (data) => {
    setTimeEntries(prev => prev.map(elem => {
      if (elem.id !== entryId) return elem;
      return {
        ...elem,
        ...data
      }
    }))
  }

  return (
    <div className={"entry-edit"}>
      <Input type={"text"} name={"name"} label={"name"} value={values.name}
             onChange={(e) => setValues(prev => {
               return {
                 ...prev,
                 name: e.target.value
               }
             })}
             onBlur={() => saveChanges({ name: values.name })}
      />

      <Datetime step={1} type={"datetime-local"} name={"startTime"} label={
        <span style={{ display: "inline-flex", gap: "10px" }}>
          Started at
          <Button onClick={() => alert("Set to the last stop time")} title={"Set to the last stop time"}
                  className={"btn-lst"}>
            <FontAwesomeIcon icon={faBackwardStep}/>
          </Button>
        </span>
      } value={values.startTime ?? ""}
             onChange={(e) => {
               if (new Date() < new Date(e.target.value)) {
                 addMessage("The start time of an entry can't be in the future", "error");
                 return;
               }

               setValues(prev => {
                 return {
                   ...prev,
                   startTime: e.target.value
                 }
               });
             }}
             onBlur={() => saveChanges({ startTime: values.startTime })}
      />

      <Datetime step={1} type={"datetime-local"} name={"endTime"} label={"Finished at"} value={values.endTime ?? ""}
             {...(!values.endTime ? {
               readOnly: true, disabled: true,
               onChange: (e) => {
                 if (new Date(e.target.value) > new Date(values.startTime)) {
                   addMessage("The end time of an entry can't be before its start time", "error");
                   return;
                 }

                 setValues(prev => {
                   return { ...prev, endTime: e.target.value };
                 })
               },
               onBlur: () => saveChanges({ endTime: values.endTime })
             } : {})}
      />

      <Categories className={"categories-edit"} timeEntryId={entryId}/>

    </div>
  )
}

export default EntryEdit;