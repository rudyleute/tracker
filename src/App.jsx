import "./styles/main.css";
import "./styles/buttons.css"
import "./styles/modal.css"
import TimeBar from './components/TimeBar.jsx';
import { TimeBarProvider } from './context/TimeBarProvider.jsx';
import Modal from './components/Modal.jsx';

function App() {
  return (
    <>
      <TimeBarProvider>
        <TimeBar />
      </TimeBarProvider>

      <Modal />
    </>
  )
}

export default App
