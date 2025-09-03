import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ModalProvider } from './context/ModalProvider.jsx';
import { ToastProvider } from './context/ToastProvider.jsx';
import { Provider } from 'react-redux';
import store from './store';
import { TimeBarProvider } from './context/TimeBarProvider.jsx';

createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
    <Provider store={store}>
      <ToastProvider>
        <TimeBarProvider>
          <ModalProvider>
            <App/>
          </ModalProvider>
        </TimeBarProvider>
      </ToastProvider>
    </Provider>
  </LocalizationProvider>
)
