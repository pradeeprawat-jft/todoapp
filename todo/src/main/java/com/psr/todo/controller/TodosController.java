package com.psr.todo.controller;

import com.psr.todo.dto.ResponseDto;
import com.psr.todo.helper.TodoInput;
import com.psr.todo.helper.TodoInputAdvance;
import com.psr.todo.model.Todos;
import com.psr.todo.service.TodosService;
import com.psr.todo.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class TodosController {
    private final TodosService todosService;

    @QueryMapping
    private ResponseDto<List<Todos>> allTodos() {
        List<Todos> todos = todosService.getTodos();
        return ResponseDto.<List<Todos>>builder().data(todos).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

    @QueryMapping
    private ResponseDto<Todos> getTodo(@Argument String todoId) {
        Todos todos = todosService.getTodo(todoId);
        return ResponseDto.<Todos>builder().data(todos).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

    @MutationMapping
    private ResponseDto<Todos> createTodo(@Argument(name = "todoInput") TodoInputAdvance todo) {
        Todos todos = todosService.createTodo(todo);
        return ResponseDto.<Todos>builder().data(todos).message(Constants.CREATED).status(HttpStatus.OK.value())
                .build();
    }

    @MutationMapping
    ResponseDto<Todos> updateTodo(@Argument(name = "todoId") String todoId, @Argument(name = "todoInput") TodoInput input) {
        Todos todos = todosService.updateTodo(todoId,input);
        return ResponseDto.<Todos>builder().data(todos).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

    @MutationMapping
    ResponseDto<String> deleteTodo(@Argument(name = "todoId") String todoId) {
        String str = todosService.deleteTodo(todoId);
        return ResponseDto.<String>builder().data(str).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

}


