package com.psr.todo.service;

import com.psr.todo.helper.UsersInput;
import com.psr.todo.model.Users;
import java.util.List;


public interface UsersService {
    Users createUser(UsersInput user);
    List<Users> getUsers();
    Users getUser(String userId);

    Boolean login(String userName, String password);
}
