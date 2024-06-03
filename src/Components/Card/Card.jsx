import React from 'react';
import './card.css';

const Card = ({ title = '', poster = '', classname = '', rating = 0 }) => {
  return (
    <div className={`card ${classname ? classname : ''}`}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster}`}
        alt={title}
        className="poster"
      />
      <div className="rating">
        <div className="rating-title">Rating : </div>
        <div className="rating-value">{rating?.toFixed(1)}/10</div>
      </div>
    </div>
  );
};

export default Card;
