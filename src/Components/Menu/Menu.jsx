import React from 'react';
import Chip from '../Chip/Chip';
import './menu.css';

const Menu = ({
  menus = [],
  selectedGenre = 0,
  setSelectedGenre = () => {},
}) => {

  return (
    <div className="menu">
      {menus?.map((ele, key) => {
        return (
          <Chip
            key={key}
            label={ele?.name}
            onClick={() => {
              setSelectedGenre(ele?.id);
            }}
            selected={selectedGenre === ele?.id}
          />
        );
      })}
    </div>
  );
};

export default Menu;
