import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ModalProvider } from './context/ModalProvider.jsx';

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
    <ModalProvider>
      <App />
    </ModalProvider>
  </LocalizationProvider>
)
