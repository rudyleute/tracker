import { useEffect, useRef } from 'react';
import Category from './Category.jsx';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTimeBar } from '../../context/TimeBarProvider.jsx';
import classnames from 'classnames';
import ButtonPopUp from '../simple/ButtonPopUp.jsx';

const Categories = ({ timeEntryId, className }) => {
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
    <>
      <div className={"categories"}>
        <ButtonPopUp buttonContent={<FontAwesomeIcon icon={faPlus}/>}>
          Pooooooop up
        </ButtonPopUp>
        <div ref={scrollableRef} className={classnames("categories-list", className)}>
          {
            timeEntries.find(el => el["id"] === timeEntryId)["categories"]?.map((oneCategory) =>
              <Category key={oneCategory.id} data={oneCategory} button={{
                icon: faXmark,
                title: "Remove",
                onClick: () => {
                  setTimeEntries(prev => prev.map(el => {
                    if (el.id !== timeEntryId) return el

                    const { categories, ...rest } = el;
                    return { ...rest, categories: categories.filter(category => category.id !== oneCategory.id) }
                  }));
                }
              }}/>)
          }
        </div>
      </div>
    </>
  )

}

export default Categories