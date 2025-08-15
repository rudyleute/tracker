import classnames from 'classnames';

const Button = ({children, className, ...rest}) => {
  return (
    <button className={classnames("btn", className)} {...rest}>
      {children}
    </button>
  )
}

export default Button;