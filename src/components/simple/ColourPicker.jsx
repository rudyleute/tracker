import classnames from 'classnames';

const ColourPicker = ({ label, value, colours, style, onClick }) => {
  return (
    <div style={style} className={"colour-picker"}>
      {label && <span className={"colour-picker-label"}>{label}</span>}
      <div className={"colour-picker-colours"}>
        {
          colours.map(colour => (
            <div onClick={() => onClick(colour)} className={classnames("colour-picker-colour", colour === value && "selected")} style={{backgroundColor: colour}} />
          ))
        }
      </div>
    </div>)
}

export default ColourPicker;