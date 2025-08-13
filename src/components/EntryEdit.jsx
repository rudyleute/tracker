import {useTimeBar} from '../context/TimeBarProvider.jsx';
import { useEffect, useState } from 'react';

const EntryEdit = ({entryId}) => {
  const { timeEntries, setTimeEntries } = useTimeBar();
  const [data, setData] = useState({
    name: "",
    categories: []
  });

  useEffect(() => {
    setData(timeEntries[entryId]);
  }, [])

  return (
    <>
      EntryEdit
    </>
  )
}

export default EntryEdit;