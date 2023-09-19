package com.psr.todo.helper;


import java.util.List;

public record UsersInput(String userName, String userEmail, String userPassword, List<TodoInput> todosList){

}
