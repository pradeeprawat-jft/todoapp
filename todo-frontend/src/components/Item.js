import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { removeTodo, editTodo } from "../utils/todoSlice";

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      data
      status
      message
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($todoId: ID!, $todoInput: TodoInput!) {
    updateTodo(todoId: $todoId, todoInput: $todoInput) {
      data {
        title
        description
        createdAt
      }
      status
      message
    }
  }
`;

const Item = ({ todo }) => {
  const dispatch = useDispatch();
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo({
        variables: {
          todoId: todoId,
        },
      });
      dispatch(removeTodo(todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdate = async (todoId) => {
    try {
      const { data } = await updateTodo({
        variables: {
          todoId: todoId,
          todoInput: {
            title: editedTitle,
            description: editedDescription,
          },
        },
      });
      dispatch(
        editTodo({
          todoId: todoId,
          title: editedTitle,
          description: editedDescription,
        })
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="px-sm-5 px-3 py-3 d-md-flex justify-content-between align-items-center">
      <div>
        {isEditing ? (
          <>
            <input
              type="text "
              className="form-control my-3"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <textarea
              value={editedDescription}
              className="form-control"
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <h5 className="text-secondary text-capitalize">{todo.title}</h5>
            <p className="px-3 text-success">- {todo.description} </p>
          </>
        )}
      </div>
      <div className="d-sm-flex   my-sm-5">
        <p className="mx-sm-3 my-2 m text-info" style={{ fontSize: "11px" }}>
          ( {todo.createdAt.substring(0, 10)} ) {" -> "}
          {todo.createdAt.substring(11, 19)}
        </p>
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
            >
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Item;
