import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const Menu = ({ menuOptions }) => {
  return (
    <div className="menu">
      { menuOptions.map((option) => {

        localStorage.setItem("compState", JSON.stringify(
          { id: option.compId, difficulty: option.difficulty }
        ));
        return (
          <div className="menu__item">
            <Link to="/game">
              <button className="menu__button" >
               { option.text }
              </button>
            </Link>
          </div>
        )
      }) }
    </div>
  );
}

export default Menu;