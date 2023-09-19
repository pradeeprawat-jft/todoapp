package com.psr.todo.repository;

import com.psr.todo.model.Todos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodosRepository extends JpaRepository<Todos,String> {
}
