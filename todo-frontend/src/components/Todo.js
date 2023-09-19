import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Item from "./Item";
import AddTodo from "./AddTodo";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../utils/todoSlice";

const GET_TODOS = gql`
  query AllTodos {
    allTodos {
      data {
        todoId
        title
        description
        createdAt
      }
      status
      message
    }
  }
`;

const Todo = () => {
  const dispatch = useDispatch();
  const fetchedData = useSelector((store) => store.todo.todos);

  const { loading, error, data } = useQuery(GET_TODOS);

  useEffect(() => {
    if (data) {
      data.allTodos.data.map((todo) => dispatch(addTodo(todo)));
    }
  }, [data, dispatch]);

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="row">
      <div className="col-md-8 p-sm-5">
        {fetchedData.map((todo) => (
          <Item key={todo.todoId} todo={todo}></Item>
        ))}
      </div>
      <div className="col-md-4 p-sm-5">
        <AddTodo></AddTodo>
      </div>
    </div>
  );
};

export default Todo;
