import Input from './Input.jsx';

const Datetime = ({value, ...rest}) => {
  const date = value && new Date(
    new Date(value).getTime() - new Date(value).getTimezoneOffset() * 60000
  ).toISOString().slice(0,19)

  return <Input value={date} {...rest} />
}

export default Datetime;