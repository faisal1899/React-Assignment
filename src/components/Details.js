import React, {
  useEffect,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { fetchDetails } from '../actions';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDetails(id));
  }, [id, dispatch]);

  const displayLoader = useSelector(({ site }) => {
    return site.displayLoader;
  });
  const { details } = useSelector(({ movie }) => {
    return movie;
  });

  const renderContent = useCallback(() => {
    if (displayLoader) {
      return (
        <div>Loading...</div>
      );
    }
    return Object.keys(details).map(key => {
      if (key === 'Poster') {
        return (
          <div className="poster" key={key}>
            <div>
              <label className="details-label">{key}:</label>
              <figure>
                <img className="img-responsive" src={details.Poster} alt={details.Title} title={details.title} />
              </figure>
              
            </div>
          </div>
        );
      }
      if (key === 'Ratings') {
        return (
          <div key={key}>
            <h4>Ratings:</h4>
            {
              details.Ratings.map(rating => {
                return (
                  <div key={rating.Source}>
                    <label className="details-label">>{rating.Source}: </label>
                    <span>{rating.Value}</span>
                  </div>
                ); 
              })
            }
          </div>
        );
      }
      return (
        <div className="details-wrap" key={key}>
          <label className="details-label">{key}: </label>
          <span>{details[key]}</span>
        </div>
      );
    });
  }, [displayLoader, details]);

  return (
    <section className="details-page">
      <div className="container ">
        <h1>Movie Details</h1>
        <div className="movie-details">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}

export default Details;