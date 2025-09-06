import classnames from "classnames";

const Input = ({ name, label, className, endAdornment, children, ...rest }) => {
  return (
    <div>
      {label && <label className={"label"} htmlFor={name}>{label}</label>}
      <div className={"input-wrapper"}>
        <input className={classnames('input', className)} {...rest} />
        {
          endAdornment && <span className={"input-end-adornment"}>
          {endAdornment}
          </span>
        }
        {children}
      </div>
    </div>
  )
}

export default Input;