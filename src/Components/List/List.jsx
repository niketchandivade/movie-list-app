import React from 'react';
import Card from '../Card/Card';
import './list.css';

const List = ({label = '', movies = []}) => {

  return (
    <div className='list-container'>
      {label && <div className="list-label">{label}</div>}
      <div className="list">
        {movies?.map((ele, index) => {
          return (
            <Card
              key={index}
              title={ele?.title}
              poster={ele?.poster_path}
              rating={ele?.vote_average}
              classname='movie-card'
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
