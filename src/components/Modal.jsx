import { useModal } from '../context/ModalProvider.jsx';
import Button from './simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSave } from '@fortawesome/free-solid-svg-icons';

const Modal = () => {
  const { hideModal, data } = useModal();
  const { isShown, title, content, saveFunc } = data;

  return (
    <>
      {isShown && <>
        <div className={"modal"}>
          <div className={"modal-header"}>
            <div className={"modal-title"}>
              {title}
            </div>
            <div className={"modal-actions"}>
              <Button className={"btn-circle"} onClick={saveFunc}>
                <FontAwesomeIcon size={"2xl"} icon={faSave} />
              </Button>
              <Button className={"btn-circle"} onClick={hideModal}>
                <FontAwesomeIcon size={"2xl"} icon={faCircleXmark} />
              </Button>
            </div>
          </div>
          <div className={"modal-content"}>
            {content}
          </div>
        </div>

        <div onClick={hideModal} className={"modal-overlay"}/>
      </>}
    </>
  )
}

export default Modal;