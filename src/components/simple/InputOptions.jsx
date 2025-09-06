import Input from './Input.jsx';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../hooks/useDebounce.jsx';
import { useToasts } from "../../context/ToastProvider.jsx"
import { PacmanLoader } from 'react-spinners';
import Button from './Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const InputOptions = ({
                        isSelect = false, fetchOptions, renderOptions, value, onBlur = () => {
  }, onFocus = () => {
  }, onChange = () => {
  }, ...rest
                      }) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const { addError } = useToasts();
  const inputRef = useRef(null);

  const debValue = useDebounce(value, 500);

  useEffect(() => {
    let cancelled = false;

    if (!isSelect && !debValue) {
      setOptions([]);
      return;
    }

    setIsLoading(true);
    const getOptions = async () => {
      try {
        const data = await fetchOptions();
        if (!cancelled) setOptions(data);
      } catch (error) {
        if (!cancelled) addError(error.message ?? "Something went wrong");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    getOptions();
    return () => {
      cancelled = true;
    }
  }, [debValue]);

  const autocompleteProps =
    !isSelect ? {
      onFocus: (e) => {
        setIsShown(true);
        onFocus(e);
      },
      onBlur: (e) => {
        setIsShown(false);
        onBlur(e);
      },
      onChange: (e) => {
        setIsShown(true);
        onChange(e);
      }
    } : {
      readOnly: true
    };

  // #TODO show the isLoading instead of the options when isLoading is set to true
  // #TODO start using the element in the TimeBar
  // #TODO search options must appear only when onFocus event on the input is triggered
  return (
    <div className={"options-wrapper"}>
      <Input ref={inputRef} {...autocompleteProps} {...rest} value={value ?? ""}
        endAdornment={isSelect && <Button onClick={() => setIsShown(prev => !prev)} className={"btn-icon"}>
          <FontAwesomeIcon icon={isShown ? faChevronUp : faChevronDown}/>
        </Button>}>
        {isShown && <div className={`options`}>
          {isLoading ? <PacmanLoader/> : renderOptions(options, { hideOptions: () => setIsShown(false) })}
        </div>}
      </Input>
    </div>
  )
}

export default InputOptions;