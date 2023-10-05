import React, { useState } from "react";
import { useTodoOperations } from "../hooks/useTodoOperations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowRotateLeft,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import EmptyPage from "./EmptyPage";

const Completed = () => {
  const todoInfo = useSelector((store) => store.todo.todos);
  const currentTheme = useSelector((store) => store.theme);
  const { deleteTodo, updateTodo } = useTodoOperations();

  const handleDelete = (todoId) => {
    deleteTodo(todoId);
  };

  const handleUndo = (todo) => {
    console.log(todo, "completeed todo <<<<<<->>>>>");
    const updatedFields = {
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    };
    updateTodo(todo.todoId, updatedFields, false);
  };

  const doneTodo = todoInfo.filter((todo) => todo.status === true);

  if (doneTodo.length === 0) {
    return <EmptyPage></EmptyPage>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {todoInfo.map(
          (todo) =>
            todo.status && (
              <div
                className="col-md-12 col-lg-12 px-sm-3 py-3 mb-2 rounded"
                style={
                  todo.priority === "High"
                    ? {
                        backgroundColor:
                          currentTheme.theme === "light"
                            ? "#FFF0F5"
                            : "#1D1D1D",
                      }
                    : todo.priority === "Medium"
                    ? {
                        backgroundColor:
                          currentTheme.theme === "light"
                            ? "#D0E7D2"
                            : "#1D1D1D",
                      }
                    : {
                        backgroundColor:
                          currentTheme.theme === "light"
                            ? "#EEEEEE"
                            : "#1D1D1D",
                      }
                }
                key={todo.todoId}
              >
                <>
                  <h5
                    className={
                      "text-capitalize text-" +
                      (currentTheme.theme === "light" ? "secondary " : "light ")
                    }
                  >
                    {todo.title}
                  </h5>
                  <p className="px-3 text-success">
                    <FontAwesomeIcon icon={faArrowRightLong} className="pe-3" />{" "}
                    {todo.description}{" "}
                  </p>
                </>
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <p className="text-info" style={{ fontSize: "11px" }}>
                      ( {todo.createdAt.substring(0, 10)} ) {" -> "}
                      {todo.createdAt.substring(11, 19)}
                    </p>
                    <p className="text-warning" style={{ fontSize: "11px" }}>
                      ( {todo.endTime.substring(0, 10)} ) {" -> "}
                      {todo.createdAt.substring(11, 19)}
                    </p>
                  </span>
                  <span>
                    <>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(todo.todoId)}
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </button>
                      <button
                        className="btn btn-warning mx-2"
                        onClick={() => handleUndo(todo)}
                        title="Undo"
                      >
                        <FontAwesomeIcon icon={faArrowRotateLeft} />
                      </button>
                    </>
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Completed;
