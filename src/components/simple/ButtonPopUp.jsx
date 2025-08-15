import Button from './Button.jsx';
import PopUp from '../timebar/PopUp.jsx';
import { useRef } from 'react';


const ButtonPopUp = ({children, buttonContent}) => {
  const buttonRef = useRef(null);
  const popUpRef = useRef(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => popUpRef.current.showPopUp()} title={"Add a category"} className={"btn-icon btn-circle btn-cat-add"}>
        {buttonContent}
      </Button>
      <PopUp ref={popUpRef} refToIgnore={buttonRef}>
        {children}
      </PopUp>
    </>
  )

}

export default ButtonPopUp;