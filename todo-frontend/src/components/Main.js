import React from "react";
import Header from "./Header";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import Completed from "./Completed";
const Main = () => {
  const toggle = useSelector((store) => store.user.showCompletedTodos);

  return (
    <>
      <Header></Header>
      {!toggle ? <Todo></Todo> : <Completed></Completed>}
    </>
  );
};

export default Main;
