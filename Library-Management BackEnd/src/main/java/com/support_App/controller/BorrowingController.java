package com.support_App.controller;

import com.support_App.dto.BorrowingDTO;
import com.support_App.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrowings")
public class BorrowingController {

    @Autowired
    private BorrowingService borrowingService;

    @PreAuthorize("hasRole('READER')")
    @PostMapping
    public ResponseEntity<BorrowingDTO> borrowBook(@RequestBody BorrowingDTO borrowingDTO) {
        return ResponseEntity.ok(borrowingService.borrowBook(borrowingDTO));
    }

    @PreAuthorize("hasRole('READER')")
    @PutMapping("/return/{id}")
    public ResponseEntity<BorrowingDTO> returnBook(@PathVariable Long id) {
        return ResponseEntity.ok(borrowingService.returnBook(id));
    }

    @PreAuthorize("hasRole('READER')")
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<BorrowingDTO>> getBorrowingHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(borrowingService.getBorrowingHistory(userId));
    }

    @PreAuthorize("hasRole('LIBRARIAN')")
    @GetMapping
    public ResponseEntity<List<BorrowingDTO>> getAllBorrowings() {
        return ResponseEntity.ok(borrowingService.getAllBorrowings());
    }
}
