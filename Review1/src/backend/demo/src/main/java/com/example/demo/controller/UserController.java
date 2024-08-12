package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginForm;
import com.example.demo.model.Students;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired 
    private StudentService studentService;
    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody Students students) {
        Integer res = studentService.studentregister(students);
        if (res == 1 || res == 2) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(500).body(res);
        }
    }
    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginForm loginForm){
        try{
            Integer res = studentService.studentLogin(loginForm);
            return ResponseEntity.ok(res);
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
}
