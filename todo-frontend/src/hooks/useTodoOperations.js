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

export const useTodoOperations = () => {
  const dispatch = useDispatch();
  const [deleteTodoMutation] = useMutation(DELETE_TODO);
  const [updateTodoMutation] = useMutation(UPDATE_TODO);

  const deleteTodo = async (todoId) => {
    try {
      await deleteTodoMutation({
        variables: {
          todoId: todoId,
        },
      });
      dispatch(removeTodo(todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (todoId, updatedFields, status) => {
    try {
      await updateTodoMutation({
        variables: {
          todoId: todoId,
          todoInput: {
            ...updatedFields,
            status: status,
          },
        },
      });
      dispatch(
        editTodo({
          todoId: todoId,
          ...updatedFields,
          status: status,
        })
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return { deleteTodo, updateTodo };
};
