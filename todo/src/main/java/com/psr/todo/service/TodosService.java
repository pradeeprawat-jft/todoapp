package com.psr.todo.service;

import com.psr.todo.helper.TodoInput;
import com.psr.todo.helper.TodoInputAdvance;
import com.psr.todo.model.Todos;

import java.util.List;

public interface TodosService {

    Todos createTodo(TodoInputAdvance todo);
    List<Todos> getTodos();
    Todos getTodo(String userId);
    Todos updateTodo(String todoId,TodoInput input);

    String deleteTodo(String todoId);

}
