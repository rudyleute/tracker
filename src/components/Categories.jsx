import { useEffect, useRef, useState } from 'react';
import Category from './Category.jsx';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from './simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cat = [
  {
    name: "Listening",
    colour: "#7ef542"
  },
  {
    name: "Future",
    colour: "#f54263"
  },
  {
    name: "Productive",
    colour: "#425af5"
  },
  {
    name: "Listening",
    colour: "#7ef542"
  },
  {
    name: "Future",
    colour: "#f54263"
  },
  {
    name: "Productive",
    colour: "#425af5"
  },
  {
    name: "Listening",
    colour: "#7ef542"
  },
  {
    name: "Future",
    colour: "#f54263"
  },
  {
    name: "Productive",
    colour: "#425af5"
  },
  {
    name: "Listening",
    colour: "#7ef542"
  },
  {
    name: "Future",
    colour: "#f54263"
  },
  {
    name: "Productive",
    colour: "#425af5"
  },
  {
    name: "Listening",
    colour: "#7ef542"
  },
  {
    name: "Future",
    colour: "#f54263"
  },
  {
    name: "Productive",
    colour: "#425af5"
  }
]

const Categories = () => {
  const scrollableRef = useRef(null);
  const [categories, setCategories] = useState(cat);

  useEffect(() => {
    const element = scrollableRef.current;
    if (!element) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      element.scrollLeft += e.deltaY;
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => element.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className={"categories"}>
      <Button title={"Add a category"} className={"btn-icon btn-circle btn-cat-add"}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <div ref={scrollableRef} className={"categories-list"}>
        {
          categories.map((oneCategory, ind) => <Category key={ind} data={oneCategory} button={{
            icon: faXmark,
            title: "Remove"
          }}/>)
        }
      </div>
    </div>
  )

}

export default Categories