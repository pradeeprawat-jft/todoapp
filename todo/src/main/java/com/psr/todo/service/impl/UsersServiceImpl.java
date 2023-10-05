package com.psr.todo.service.impl;

import com.psr.todo.helper.TodoInput;
import com.psr.todo.helper.UsersInput;
import com.psr.todo.model.Todos;
import com.psr.todo.model.Users;
import com.psr.todo.repository.UsersRepository;
import com.psr.todo.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class UsersServiceImpl implements UsersService {

    private final UsersRepository usersRepository;

    private final PasswordEncoder encoder;
    @Override
    public Users createUser(UsersInput input) {
        Users user = new Users();
        user.setUserId(createUUID());
        user.setUserName(input.userName());
        user.setUserEmail(input.userEmail());

        String userPassword = input.userPassword();

        if (userPassword != null) {
            String encodedPassword = encoder.encode(userPassword);
            user.setUserPassword(encodedPassword);
        }

        if (input.todosList() != null) {
            List<Todos> todosList = new ArrayList<Todos>();
            for (TodoInput todoInput : input.todosList()) {
                Todos todos = new Todos();

                todos.setTodoId(createUUID());
                todos.setTitle(todoInput.title());
                todos.setDescription(todoInput.description());
                todos.setCreatedAt(LocalDateTime.now());
                todos.setUsers(user);

                todosList.add(todos);
            }
            user.setTodosList(todosList);
        }
        usersRepository.save(user);
        return user;
    }


    @Override
    public List<Users> getUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Users getUser(String userId) {
        Optional<Users> optionalUser = usersRepository.findById(userId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        }
        throw new RuntimeException("user not found with id " + userId);
    }

    @Override
    public Users login(String username, String password) {
        Users user = usersRepository.findByUserEmail(username);
        if( user != null && (encoder.matches(password,user.getUserPassword())))
        {
            return user;
        }
        return new Users();
    }

    public String createUUID() {
        return UUID.randomUUID().toString();
    }
}
