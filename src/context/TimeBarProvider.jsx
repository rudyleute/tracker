import { createContext, useContext, useState } from 'react';

const TimeBarContext = createContext([]);
const TimeBarProvider = ({ children }) => {
  const [timeEntries, setTimeEntries] = useState({});

  return (
    <TimeBarContext.Provider value={{ timeEntries, setTimeEntries }}>
      {children}
    </TimeBarContext.Provider>
  )
}

const useTimeBar = () => useContext(TimeBarContext);

export {useTimeBar, TimeBarProvider}