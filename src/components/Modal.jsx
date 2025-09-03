import Button from './simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';
import { createPortal } from 'react-dom';

const Modal = ({ onClose, data, zIndex }) => {
  const { isShown, title, content, saveFunc } = data;
  if (!isShown) return null;

  return createPortal(<>
      <div className={"modal"} style={{zIndex: zIndex}}>
        <div className={"modal-header"}>
          <div className={"modal-title"}>
            {title}
          </div>
          <div className={"modal-actions"}>
            <Button title={"Close"} className={"btn-circle"} onClick={onClose}>
              <FontAwesomeIcon size={"2xl"} icon={faCircleXmark}/>
            </Button>
          </div>
        </div>
        <div className={"modal-content"}>
          {content}
        </div>
      </div>
    </>,
    document.body
  )
}

export default Modal;