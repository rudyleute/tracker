import { useEffect, useRef } from 'react';
import Category from './Category.jsx';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { useTimeBar } from '../../context/TimeBarProvider.jsx';
import Button from '../simple/Button.jsx';
import { useModal } from '../../context/ModalProvider.jsx';

const Categories = ({ data, entryId, className }) => {
  // const categories = useSelector(state => state.categories);
  const { setTimeEntries } = useTimeBar();
  const { showModal } = useModal();
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

  const handleNewCategories = () => {
    showModal(
      "Add a category",
      "Add a category",
    )
  }

  return (
    <>
      <div className={"categories"}>
        <Button onClick={handleNewCategories} title={"Add a category"} className={"btn-icon btn-circle btn-cat-add"}>
          <FontAwesomeIcon icon={faPlus}/>
        </Button>
        <div ref={scrollableRef} className={classnames("categories-list", className)}>
          {
            data.map((oneCategory) =>
              <Category key={oneCategory.id} data={oneCategory} button={{
                icon: faXmark,
                title: "Remove",
                onClick: () => {
                  setTimeEntries(prev => prev.map(el => {
                    if (el.id !== entryId) return el

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