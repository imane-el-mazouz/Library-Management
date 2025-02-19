package com.support_App.repository;

import com.support_App.model.Borrowing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BorrowingRepository extends JpaRepository <Borrowing , Long>{
    List<Borrowing> findByUserId(Long userId);
}
