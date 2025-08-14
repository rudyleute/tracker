import classnames from "classnames";

const Input = ({ name, label, className, ...rest }) => {
  return (
    <span>
      {label && <label className={"label"} htmlFor={name}>{label}</label>}
      <input className={classnames('input', className)} {...rest} />
    </span>
  )
}

export default Input;