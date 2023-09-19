import React from "react";
import logo from "../images/todo.png";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt=""
              width="100"
              height="80"
              className="d-inline-block align-text-top"
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
