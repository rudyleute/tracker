import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../simple/Button.jsx'
import classnames from 'classnames';

const Category = ({ className, data, button }) => {
  const { name, colour } = data;

  return (
    <div className={classnames("category", className)}>
      <span className={"category-colour"} style={{ backgroundColor: colour }}/>
      <span className={"category-name"}>{name}</span>
      {
        button && <Button title={button.title} onClick={button.onClick} className={"btn-icon"}>
          <FontAwesomeIcon icon={button.icon}/>
        </Button>
      }
    </div>
  )
}

export default Category