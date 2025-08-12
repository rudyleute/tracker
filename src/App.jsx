import "./styles/main.css";
import "./styles/buttons.css"
import TimeBar from './components/TimeBar.jsx';
import { TimeBarProvider } from './context/TimeBarProvider.jsx';

function App() {

  return (
    <>
      <TimeBarProvider>
        <TimeBar />
      </TimeBarProvider>
    </>
  )
}

export default App
