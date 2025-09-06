const Option = ({ handleOptionSelect, main, secondary }) => {
  return (
    <div onPointerDown={(e) => {
      e.preventDefault();
      handleOptionSelect();
    }} className={`option`}>
      <span className={`option-name`}>{main}</span>
      <span className={`option-secondary`}>
        {secondary}
      </span>
    </div>
  )
}

export default Option;