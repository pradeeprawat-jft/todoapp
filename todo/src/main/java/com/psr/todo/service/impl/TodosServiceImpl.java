package com.psr.todo.service.impl;

import com.psr.todo.helper.TodoInput;
import com.psr.todo.helper.TodoInputAdvance;
import com.psr.todo.helper.UserInputAdvance;
import com.psr.todo.model.Todos;
import com.psr.todo.model.Users;
import com.psr.todo.repository.TodosRepository;
import com.psr.todo.service.TodosService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class TodosServiceImpl implements TodosService {
    private final TodosRepository todosRepository;

    @Override
    public Todos createTodo(TodoInputAdvance input) {
        Todos todo = new Todos();
        todo.setTodoId(createUUID());
        todo.setTitle(input.title());
        todo.setDescription(input.description());
        todo.setCreatedAt(LocalDateTime.now());
        if (input.user() != null) {
            UserInputAdvance userInputAdvance = input.user();
            Users users = new Users();
            users.setUserId(userInputAdvance.userId());
            users.setUserName(userInputAdvance.userName());
            users.setUserEmail(userInputAdvance.userEmail());
            users.setUserPassword(userInputAdvance.userPassword());
            todo.setUsers(users);
        }
        todosRepository.save(todo);
        return todo;
    }

    @Override
    public List<Todos> getTodos() {
        return todosRepository.findAll();
    }

    @Override
    public Todos getTodo(String todoId) {
        Optional<Todos> optionalTodo = todosRepository.findById(todoId);
        if (optionalTodo.isPresent()) {
            return optionalTodo.get();
        }
        throw new RuntimeException("Todo not found with id " + todoId);
    }

    @Override
    public Todos updateTodo(String todoId, TodoInput input) {
        Optional<Todos> todoOptional = todosRepository.findById(todoId);
        if (todoOptional.isPresent()) {
            Todos existingTodo = todoOptional.get();
            if (input.title() != null) {
                existingTodo.setTitle(input.title());
            }
            if (input.description() != null) {
                existingTodo.setDescription(input.description());
            }
            existingTodo.setCreatedAt(LocalDateTime.now());
            return todosRepository.save(existingTodo);
        } else {
            throw new RuntimeException("Todo not found");
        }
    }

    @Override
    public String deleteTodo(String todoId) {
        if (todosRepository.existsById(todoId)) {
            todosRepository.deleteById(todoId);
            return "Todo deleted successfully";
        } else {
            throw new RuntimeException("Todo not found");
        }
    }

    public String createUUID() {
        return UUID.randomUUID().toString();
    }
}
