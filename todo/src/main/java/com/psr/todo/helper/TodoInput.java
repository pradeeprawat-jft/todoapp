package com.psr.todo.helper;


import lombok.ToString;

public
record TodoInput(String title, String description, String priority, Boolean status) {

}
