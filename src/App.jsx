import "./styles/main.css";
import "./styles/buttons.css"
import "./styles/modal.css"
import "./styles/toasts.css"
import TimeBar from './components/timebar/TimeBar.jsx';
import { TimeBarProvider } from './context/TimeBarProvider.jsx';
import Toasts from './components/Toasts.jsx';

function App() {
  return (
    <>
      <TimeBar/>
    </>
  )
}

export default App
