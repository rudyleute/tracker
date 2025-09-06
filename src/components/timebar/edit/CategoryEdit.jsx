import Autocomplete from '../../simple/Autocomplete.jsx';
import { useSelector } from 'react-redux';
import {
  selectAllCategories, selectCategoryById,
  selectFilteredAttachable
} from '../../../reducers/categoriesReducer.jsx';
import { useEffect, useState } from 'react';
import Option from '../Option.jsx';
import Select from '../../simple/Select.jsx';
import ColourPicker from '../../simple/ColourPicker.jsx';
import { SliderPicker } from 'react-color';

const CategoryEdit = ({ id = null, colour = null, name = "", parentId = null, parentName = null }) => {
  const [value, setValue] = useState({
    name, parentId, colour, id, parentName
  })
  const [recentColours, setRecentColours] = useState([])

  useEffect(() => {
    const retrieveColours = async () => {
      //TODO retrieve actual colours with await
      setRecentColours([
        "#3FA7D6",
        "#E94F37",
        "#A1C349",
        "#7B2CBF"
      ])
    }

    retrieveColours()
  }, [])

  const handleOptionSelect = (elem, hideOptions) => {
    setValue({
      name: elem.name,
      parentId: elem.parentId,
      colour: elem.colour,
      id: elem.id
    })
    hideOptions();
  }

  const handleParentSelect = (id, hideOptions) => {
    setValue(prev => ({ ...prev, parentId: id }))
    hideOptions();
  }

  const fetchFilteredAttachable = useSelector(state => selectFilteredAttachable(state, value.name));
  const fetchCategories = useSelector(selectAllCategories);
  const fetchParentCategoryName = useSelector(state => selectCategoryById(state, value.parentId))

  const renderOptions = (values, { hideOptions }) => {
    return values.map((elem) => (
      <Option
        key={elem.id}
        handleOptionSelect={() => handleOptionSelect(elem, hideOptions)}
        main={elem.name}
        secondary={elem.ancestors}
      />
    ))
  }

  const renderSelectOptions = (values, { hideOptions }) => {
    return values.map((elem) =>
      <Option
        key={elem.id}
        handleOptionSelect={() => handleParentSelect(elem.id, hideOptions)}
        main={elem.name}
        secondary={elem.ancestors}
      />
    )
  }

  return (
    <div className={"modal-edit"}>
      <Autocomplete
        label={"Category name"}
        onChange={(e) => setValue(prev => ({ ...prev, name: e.target.value }))}
        fetchOptions={() => fetchFilteredAttachable}
        renderOptions={renderOptions}
        value={value.name}
      />
      {recentColours.length > 0 &&
        <ColourPicker style={{marginBottom: "10px"}} value={value.colour} colours={recentColours}
                      onClick={(newColour) => setValue(prev => ({ ...prev, colour: newColour }))}/>
      }
      <SliderPicker color={value.colour} onChange={(newColour) => setValue(prev => ({ ...prev, colour: newColour.hex }))}/>
      <Select
        label={"Parent category"}
        value={fetchParentCategoryName?.name}
        renderOptions={renderSelectOptions}
        fetchOptions={() => fetchCategories}
      />
    </div>
  )
}

export default CategoryEdit;