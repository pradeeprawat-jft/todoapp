package com.psr.todo.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "todosList")
public class Users {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name="user_name")
    private String userName;

    @Column(name="user_email")
    private String userEmail;

    @Column(name="user_password")
    private String userPassword;

    @JsonManagedReference
    @OneToMany(mappedBy = "users",cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH,CascadeType.REFRESH})
    List<Todos> todosList =  new ArrayList<>();
}
