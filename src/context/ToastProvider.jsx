import { createContext, useCallback, useContext, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const ToastContext = createContext({});
const ToastProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addSuccess = useCallback((message) => {
    addMessage(message, "success");
  })

  const addError = useCallback((message) => {
    addMessage(message, "error");
  })

  const addWarning = useCallback((message) => {
    addMessage(message, "warning");
  })

  const addMessage = useCallback((message, type) => {
    const id = uuidv4();

    setMessages((prev) => ([
      ...prev,
      {id, value: message, type}
    ]));
  }, []);

  const removeMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((el) => el.id !== id));
  }, [])

  return (
    <ToastContext.Provider value={{messages, addSuccess, addError, addWarning, removeMessage}}>
      {children}
    </ToastContext.Provider>
  )
}

const useToasts = () => useContext(ToastContext);
export { ToastProvider, useToasts };