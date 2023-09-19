import React, { useState, useReducer } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addTodo } from "../utils/todoSlice";

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!, $description: String!, $userId: ID!) {
    createTodo(
      todoInput: {
        title: $title
        description: $description
        user: { userId: $userId }
      }
    ) {
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

const AddTodo = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [createTodo] = useMutation(CREATE_TODO);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createTodo({
        variables: {
          title,
          description,
          userId: "e725bafc-117a-4592-8843-235f38172dde",
        },
      });

      console.log("Todo created:");
      dispatch(addTodo(data.createTodo.data));

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            rows="5"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
