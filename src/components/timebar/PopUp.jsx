import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const defaultPopUp = {
  show: false,
  style: {}
}
const PopUp = forwardRef(({ refToIgnore = {current: null}, children }, ref) => {
  const [popUp, setPopUp] = useState(defaultPopUp);
  const curRef = useRef(null);

  useImperativeHandle(ref, () => ({
    showPopUp: () => {
      const rect = refToIgnore.current.getBoundingClientRect();
      setPopUp({
        show: true,
        style: {
          position: 'absolute',
          top: rect.bottom + window.scrollY + "px",
          left: rect.left + window.scrollX + "px",
        }
      })
    }
  }))

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (curRef.current && !curRef.current.contains(e.target)) {
        if (!refToIgnore.current || !refToIgnore.current.contains(e.target)) setPopUp(defaultPopUp);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refToIgnore]);

  return (
    <>
      {popUp.show && <div ref={curRef} className={"pop-up"} style={popUp.style}>
        {children}
      </div>}
    </>
  );
});

export default PopUp;