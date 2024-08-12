package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginForm;
import com.example.demo.dto.ProfileForm;
import com.example.demo.model.Profiles;
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

    @GetMapping("/user/profiles/{email}")
    public ResponseEntity<ProfileForm> getProfileById(@PathVariable String email) {
        try{
            Profiles profiles = studentService.getProfiles(email);
            ProfileForm pf = new ProfileForm(profiles.getName(), profiles.getRollno(), profiles.getDepartment(), profiles.getEmail(), profiles.getPhone(), profiles.getYear(), profiles.getRtype());
            return ResponseEntity.ok(pf);
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
    @PutMapping("/updateprofiles/{email}")
    public ResponseEntity<?> updateProfile(@PathVariable String email, @RequestBody ProfileForm updatedProfile){
        try{
            studentService.updatedProfile(email, updatedProfile);
            return ResponseEntity.status(200).build();
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/user/getisUpdate/{email}")
    public ResponseEntity<Boolean> getIsUpdate(@PathVariable String email){
        try{
            return ResponseEntity.ok(studentService.getIsUpdate(email));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }

    }
}
