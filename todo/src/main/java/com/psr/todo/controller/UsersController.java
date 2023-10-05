package com.psr.todo.controller;

import com.psr.todo.dto.ResponseDto;
import com.psr.todo.helper.UsersInput;
import com.psr.todo.model.Users;
import com.psr.todo.service.UsersService;
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
public class UsersController {
    private final UsersService userService;

    @QueryMapping
    private ResponseDto<List<Users>> allUsers() {
        List<Users> users = userService.getUsers();
        return ResponseDto.<List<Users>>builder().data(users).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

    @QueryMapping
    private ResponseDto<Users> getUser(@Argument String userId) {
        Users users = userService.getUser(userId);
        return ResponseDto.<Users>builder().data(users).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

    @MutationMapping
    private ResponseDto<Users> createUser(@Argument(name = "userInput") UsersInput user) {
        Users users = userService.createUser(user);
        return ResponseDto.<Users>builder().data(users).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                .build();
    }

    @MutationMapping
    private ResponseDto<Users> login(@Argument String userEmail,@Argument String userPassword){
        Users result =  userService.login(userEmail,userPassword);
        if(result.getUserId()!=null)
        {
            return ResponseDto.<Users>builder().data(result).message(Constants.SUCCESS_MSG).status(HttpStatus.OK.value())
                    .build();
        }
        return ResponseDto.<Users>builder().data(new Users(null,null,null,null,null)).message(Constants.BAD_REQUEST_MSG).status(HttpStatus.FORBIDDEN.value())
                .build();
    }
}


