package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginForm;
import com.example.demo.model.Students;
import com.example.demo.repository.UserRepository;

@Service
public class StudentService {
    @Autowired
    private UserRepository repository;

    public Integer studentregister(Students students){
        List<Students> stu = repository.findByEmail(students.getEmail());
        if(!stu.isEmpty()){
            return 1;
        }
        try{
            repository.save(students);
            return 2;
        }
        catch(Exception e){
            return -1;
        }
    }
    public Integer studentLogin(LoginForm loginForm){
        List<Students> stu = repository.findByEmail(loginForm.getEmail());
        if(stu.isEmpty())
            return 1;
        else if(! stu.get(0).getPassword().equals(loginForm.getPassword()))
            return 2;
        else
            return 3;
    }
}
