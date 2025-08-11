import classnames from 'classnames';

const Button = ({id, className, onSubmit, title, onClick, children, type}) => {
  return (
    <button id={id} type={type} title={title} className={classnames("btn", className)} onClick={onClick} onSubmit={onSubmit}>
      {children}
    </button>
  )
}

export default Button;