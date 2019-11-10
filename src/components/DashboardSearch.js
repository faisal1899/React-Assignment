import React, {
  useCallback,
  useRef,
} from 'react';

const DashboardSearch = ({ searchText, type, year, onSearch, onFilterChange }) => {
  const titleRef = useRef(searchText);
  const yearRef = useRef(year);
  const selectRef = useRef(type);
  const onSearchClick = useCallback(() => {
    if (
      !titleRef.current ||
      !selectRef.current ||
      !yearRef.current
    ) {
      return;
    }
    if (
      titleRef.current.value !== searchText ||
      selectRef.current.value !== type ||
      yearRef.current.value !== year
    ) {
      onFilterChange(true);
    }
    onSearch({
      searchText: titleRef.current.value,
      type: selectRef.current.value,
      year: yearRef.current.value,
    });
  }, [onSearch, onFilterChange, searchText, type, year]);

  return (
    <div className="pull-left search-wrap">
      <div className="form-element">
        <label>Title: </label>
        <input className="form-object" type="text" ref={titleRef}/>
      </div>
      <div className="form-element">
        <label>Type: </label>
        <select className="form-object" ref={selectRef}>
          <option value="">Select</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
      </div>
      <div className="form-element">
        <label>Year: </label>
        <input className="form-object" type="text" ref={yearRef} maxLength="4"/>
      </div>
      <div>
        <button onClick={onSearchClick}>Search</button>
      </div>
    </div>
  );
}

export default DashboardSearch;