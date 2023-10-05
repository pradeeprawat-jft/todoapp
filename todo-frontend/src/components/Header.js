import React, { useEffect, useState } from "react";
import logo from "../images/todo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAll } from "../utils/todoSlice";
import { toggletheme } from "../utils/themeSlice";
import { useSelector } from "react-redux";
import { showCompletedTodos } from "../utils/userSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jsonString = localStorage.getItem("userInfo");
  const user = JSON.parse(jsonString);

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);
  const currenttheme = useSelector((store) => store.theme);

  const toggle = useSelector((store) => store.user.showCompletedTodos);

  const logout = async () => {
    await localStorage.removeItem("userInfo");
    await dispatch(removeAll());
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (
      user === null ||
      (Object.keys(user).length === 0 && user.constructor === Object)
    ) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setIsLoggedIn(true);
      navigate("/home");
    }
  }, []);

  const handletheme = () => {
    if (currenttheme.theme === "light") {
      dispatch(toggletheme("dark"));
    } else {
      dispatch(toggletheme("light"));
    }
  };

  const handleShowCompletedTodos = () => {
    dispatch(showCompletedTodos());
  };

  return (
    <>
      <nav
        className={
          "navbar navbar-" +
          (currenttheme.theme === "light" ? "light " : "dark ") +
          "bg-" +
          (currenttheme.theme === "light" ? "light " : "secondary ")
        }
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src={logo}
              alt=""
              width="100"
              height="80"
              className="d-inline-block align-text-top"
            />
          </Link>
          <div>
            <button
              className={
                "btn btn-outline-" +
                (currenttheme.theme === "light" ? "success" : "light") +
                " shadow-none"
              }
              onClick={() => handleShowCompletedTodos()}
            >
              {toggle ? "Home" : "Completed Tasks"}
            </button>
          </div>
          {isLoggedIn && (
            <div>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className={
                  "btn btn-outline-" +
                  (currenttheme.theme === "light" ? "success" : "light") +
                  " px-3 py-2 mx-2"
                }
                onClick={logout}
              />
              <FontAwesomeIcon
                icon={currenttheme.theme === "light" ? faMoon : faSun}
                className={
                  "btn btn-" +
                  (currenttheme.theme === "light" ? "dark" : "light") +
                  " px-3 py-2 mx-2 " +
                  "text-" +
                  (currenttheme.theme === "light" ? "light " : "warning")
                }
                onClick={handletheme}
              />
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
