import { useEffect, useRef, useState } from 'react';
import Category from './Category.jsx';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from './simple/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTimeBar } from '../context/TimeBarProvider.jsx';

const Categories = ({ timeEntryId }) => {
  const { timeEntries, setTimeEntries } = useTimeBar();
  const scrollableRef = useRef(null);

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
        <FontAwesomeIcon icon={faPlus}/>
      </Button>
      <div ref={scrollableRef} className={"categories-list"}>
        {
          timeEntries.find(el => el["id"] === timeEntryId)["categories"].map((oneCategory) =>
            <Category key={oneCategory.id} data={oneCategory} button={{
              icon: faXmark,
              title: "Remove",
              onClick: () => {
                setTimeEntries(prev => prev.map(el => {
                  if (el.id !== timeEntryId) return el

                  const {categories, ...rest} = el;
                  return {...rest, categories: categories.filter(category => category.id !== oneCategory.id)}
                }));
              }
            }}/>)
        }
      </div>
    </div>
  )

}

export default Categories