import React, {
  useCallback,
  useRef,
} from 'react';

const DashboardSort = ({ sortBy, sortOrder, onSort }) => {
  const sortByRef = useRef(sortBy);
  const sortOrderRef = useRef(sortOrder);
  const onSortClick = useCallback(() => {
    if (
      !sortByRef.current ||
      !sortOrderRef.current
    ) {
      return;
    }
    onSort({
      sortBy: sortByRef.current.value,
      sortOrder: sortOrderRef.current.value,
    });
  }, [onSort]);

  return (
    <div className="pull-left filter-wrap">
      <div className="form-element">
        <label>Sort By: </label>
        <select className="form-object" ref={sortByRef}>
          <option value="">Select</option>
          <option value="Title">Title</option>
          <option value="Year">Year</option>
        </select>
      </div>
      <div className="form-element">
        <label>Sort Order: </label>
        <select className="form-object" ref={sortOrderRef}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="form-element">
        <button onClick={onSortClick}>Sort</button>
      </div>
    </div>
  );
}

export default DashboardSort;