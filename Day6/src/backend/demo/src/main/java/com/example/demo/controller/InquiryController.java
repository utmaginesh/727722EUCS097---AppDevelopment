package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.InquiryForm;
import com.example.demo.model.Chat;
import com.example.demo.model.InquirySubmission;
import com.example.demo.repository.InquiryRepository;
import com.example.demo.service.InquiryService;

@RestController
@RequestMapping("/api")
public class InquiryController {
    @Autowired
    private InquiryService inquiryService;

    @Autowired
    private InquiryRepository inquiryRepository;

    @GetMapping("/inquiry")
    public List<InquirySubmission> get(){
        return inquiryRepository.findAll();
    }

    @PostMapping("/registerinquiry")
    public ResponseEntity<?> resgisterInquiry(@RequestBody InquiryForm inquiryForm){
        try{
            System.out.println(inquiryForm.getInquiry());
            return ResponseEntity.status(200).body(inquiryService.submitInquiry(inquiryForm));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/getAllInquiries")
    public ResponseEntity<List<InquirySubmission>> getInquiries(){
        try{
            return ResponseEntity.status(200).body(inquiryService.getAllInquiries());
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    } 
    @GetMapping("/getInquiryChat/{id}")
    public ResponseEntity<List<Chat>> getInquiryChat(@PathVariable Long id){
        try{
            return ResponseEntity.status(200).body(inquiryService.getInquiryChat(id));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/saveAdminChat/{id}/{role}/{message}")
    public ResponseEntity<List<Chat>> saveMessage(@PathVariable Long id, @PathVariable String role, @PathVariable String message){
        try{
            return ResponseEntity.status(200).body(inquiryService.saveMessage(id, role, message));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping("/getStudentInquiry/{email}")
    public ResponseEntity<List<InquirySubmission>> getStudentInquiry(@PathVariable String email){
        try{
            return ResponseEntity.status(200).body(inquiryService.getStudentInquiries(email));
        }
        catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }
    
}
