import {useToasts} from '../context/ToastProvider.jsx';
import Toast from './Toast.jsx';

const Toasts = () => {
  const {messages, removeMessage} = useToasts();

  return (
    <div className="toasts">
      {messages.map(({id, value, type}) => <Toast key={id} value={value} type={type} onClose={() => removeMessage(id)}/>)}
    </div>
  )
}

export default Toasts;