package com.psr.todo.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "users")
public class Todos {

    @Id
    @Column(name = "todo_id")
    private String todoId;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="end-time")
    private LocalDateTime endTime;

    @Column(name="priority")
    private String priority;

    @Column(name="status")
    private Boolean status;

    @JsonBackReference
    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private Users users;

}