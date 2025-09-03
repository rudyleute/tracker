import { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal.jsx';

const ModalContext = createContext({});
const ModalProvider = ({ children }) => {
  const [stack, setStack] = useState([]);

  const showModal = (content, title, saveFunc = null) => {
    setStack(prev => [...prev, {
      isShown: true,
      content,
      title,
      saveFunc
    }]);
  }

  const hideModal = () => setStack(prev => prev.slice(0, -1))

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {
        stack.map((data, i) => (
          <Modal key={i} data={data} onClose={hideModal} zIndex={2000 + i}/>
        ))
      }
      {stack.length > 0 && <div {...(stack.length === 1 ? {onClick: hideModal} : {})} className={"modal-overlay"}/>}
    </ModalContext.Provider>
  );
}

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };