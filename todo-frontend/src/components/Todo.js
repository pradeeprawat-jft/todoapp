import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeAll } from "../utils/todoSlice";
import Item from "./Item";
import NotFound from "./NotFound";
import AddTodo from "./AddTodo";
import { useNavigate } from "react-router-dom";

const GET_USER = gql`
  query GetUser($userId: String!) {
    getUser(userId: $userId) {
      data {
        todosList {
          todoId
          title
          description
          priority
          status
          createdAt
          endTime
        }
      }
      status
      message
    }
  }
`;

const Todo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jsonString = localStorage.getItem("userInfo");
  const user = JSON.parse(jsonString);

  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      userId: user?.userId || "",
    },
  });

  const showCompletedTodos = useSelector(
    (store) => store.user.showCompletedTodos
  );

  useEffect(() => {
    if (!user || !user.userId) {
      navigate("/");
    }
    if (data && data.getUser.status === 200) {
      dispatch(removeAll());
      const userTodos = data.getUser.data.todosList;
      userTodos.forEach((todo) => dispatch(addTodo(todo)));
    }
  }, [data, dispatch, navigate, showCompletedTodos]);

  const todoInfo = useSelector((store) => store.todo.todos);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div className="row mx-0">
      <div className="col-md-8 p-sm-5">
        {todoInfo.length ? (
          todoInfo.map((todo, index) => <Item key={index} todo={todo}></Item>)
        ) : (
          <NotFound />
        )}
      </div>
      <div className="col-md-4 p-sm-5">
        <AddTodo></AddTodo>
      </div>
    </div>
  );
};

export default Todo;
