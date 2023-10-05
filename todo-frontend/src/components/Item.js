import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowRightLong,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useTodoOperations } from "../hooks/useTodoOperations";

const Item = ({ todo }) => {
  const currenttheme = useSelector((store) => store.theme);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedPriority, setEditedPriority] = useState(todo.priority);
  const { deleteTodo, updateTodo } = useTodoOperations();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (todoId) => {
    deleteTodo(todoId);
  };

  const handleUpdate = (todoId, status) => {
    const updatedFields = {
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
    };
    updateTodo(todoId, updatedFields, status);
    setIsEditing(false);
  };

  return (
    !todo.status && (
      <div
        className="px-sm-5 px-3 py-3 d-md-flex justify-content-between align-items-center mb-2 rounded"
        style={
          todo.priority === "High"
            ? {
                backgroundColor:
                  currenttheme.theme === "light" ? "#FFF0F5" : "#1D1D1D",
              }
            : todo.priority === "Medium"
            ? {
                backgroundColor:
                  currenttheme.theme === "light" ? "#D0E7D2" : "#1D1D1D",
              }
            : {
                backgroundColor:
                  currenttheme.theme === "light" ? "#EEEEEE" : "#1D1D1D",
              }
        }
      >
        <div>
          {isEditing ? (
            <>
              <input
                type="text "
                className="form-control"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <textarea
                value={editedDescription}
                className="form-control my-3"
                onChange={(e) => setEditedDescription(e.target.value)}
              ></textarea>

              <select
                className="form-select mt-3 form-control"
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value)}
              >
                <option disabled value="">
                  Select
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </>
          ) : (
            <>
              <h5
                className={
                  "text-capitalize text-" +
                  (currenttheme.theme === "light" ? "secondary " : "light ")
                }
              >
                {todo.title}
              </h5>
              <p className="px-3 text-success">
                <FontAwesomeIcon icon={faArrowRightLong} className="pe-3" />{" "}
                {todo.description}{" "}
              </p>
            </>
          )}
        </div>
        <div className="d-sm-flex text-wrap  align-items-center ">
          <span>
            <p
              className="mx-sm-3 my-2 m text-info"
              style={{ fontSize: "11px" }}
            >
              ( {todo.createdAt.substring(0, 10)} ) {" -> "}
              {todo.endTime.substring(11, 19)}
            </p>
            <p
              className="mx-sm-3 my-2 m text-warning"
              style={{ fontSize: "11px" }}
            >
              ( {todo.endTime.substring(0, 10)} ) {" -> "}
              {todo.createdAt.substring(11, 19)}
            </p>
          </span>
          {isEditing ? (
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(todo.todoId)}
            >
              Save
            </button>
          ) : (
            <>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(todo.todoId)}
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => setIsEditing(true)}
                title="Edit"
              >
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
              </button>

              <button
                className="btn btn-success"
                onClick={() => handleUpdate(todo.todoId, true)}
                title="Complete"
              >
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default Item;
