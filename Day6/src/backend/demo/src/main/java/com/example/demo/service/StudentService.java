package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginForm;
import com.example.demo.dto.ProfileForm;
import com.example.demo.model.Profiles;
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
            students.setIsProfUpdated(false);
            students.setProfile(new Profiles(null, null, null, null, students.getEmail(), null, null, null, students));
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
    public Profiles getProfiles(String email){
        return repository.findByEmail(email).get(0).getProfile();
    }
    public void updatedProfile(String email, ProfileForm form){
        Students s = repository.findByEmail(email).get(0);
        s.setIsProfUpdated(true);
        Profiles p = s.getProfile();
        p.setName(form.getName());
        p.setRollno(form.getRollno());
        p.setDepartment(form.getDepartment());
        p.setYear(form.getYear());
        p.setPhone(form.getPhone());        
        p.setRtype(form.getRtype());
        repository.save(s);
    }
    public boolean getIsUpdate(String email){
        return repository.findByEmail(email).get(0).getIsProfUpdated();
    }
}
