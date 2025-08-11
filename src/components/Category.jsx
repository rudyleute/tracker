import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './simple/Button.jsx'

const Category = ({data, button}) => {
  const {name, colour} = data;
  const {icon, title} = button;

  return (
    <div className="category">
      <span className={"category-colour"} style={{backgroundColor: colour}}/>
      <span className={"category-name"}>{name}</span>
      <Button title={title} className={"btn-icon"}>
        <FontAwesomeIcon icon={icon} />
      </Button>
    </div>
  )
}

export default Category