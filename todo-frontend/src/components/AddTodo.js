import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from "react-redux";
import { addTodo } from "../utils/todoSlice";
import { useSelector } from "react-redux";

const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String!
    $priority: String!
    $userId: ID!
  ) {
    createTodo(
      todoInput: {
        title: $title
        description: $description
        priority: $priority
        user: { userId: $userId }
      }
    ) {
      data {
        todoId
        title
        description
        priority
        status
        createdAt
        endTime
      }
      status
      message
    }
  }
`;

const AddTodo = () => {
  const currentTheme = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [createTodo] = useMutation(CREATE_TODO);

  const jsonString = localStorage.getItem("userInfo");
  const user = JSON.parse(jsonString);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createTodo({
        variables: {
          title,
          description,
          priority,
          userId: user.userId,
        },
      });

      console.log("Todo created:");
      dispatch(addTodo(data.createTodo.data));

      setTitle("");
      setDescription("");
      setPriority("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const inputStyle = {
    backgroundColor: currentTheme.theme === "light" ? "#ffffff" : "#343a40",
    color: currentTheme.theme === "light" ? "#000000" : "#ffffff",
  };

  return (
    <div className="p-1">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            label="Title"
            className="form-control"
            style={inputStyle}
            id="title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            style={inputStyle}
            placeholder="Description"
            label="Description"
            rows="5"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <select
            className="form-select mt-3 form-control"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={inputStyle}
          >
            <option disabled value="">
              Priority
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
