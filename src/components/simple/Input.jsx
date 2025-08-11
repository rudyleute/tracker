import classnames from "classnames";

const Input = ({ type, className, value, name, id, onChange, label }) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} className={classnames('input', className)} id={id} value={value} onChange={onChange}/>
    </>
  )
}

export default Input;