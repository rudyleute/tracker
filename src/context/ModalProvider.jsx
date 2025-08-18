import { createContext, useContext, useState } from 'react';


const defaultState = {
  content: null,
  title: "dadadaasdasd",
  isShown: false,
  saveFunc: null
}

const ModalContext = createContext({});
const ModalProvider = ({children}) => {
  const [data, setData] = useState(defaultState)

  const showModal = (content, title, saveFunc) => {
    setData({
      isShown: true,
      content,
      title,
      saveFunc,
    });
  }

  const hideModal = () => {
    setData(defaultState)
  }

  return (
    <ModalContext.Provider value={{data, showModal, hideModal}}>
      {children}
    </ModalContext.Provider>
  );
}

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };