package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Students;
import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<Students, Long>{
    List<Students> findByEmail(String email);
} 
