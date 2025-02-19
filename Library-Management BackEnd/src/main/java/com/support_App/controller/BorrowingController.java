package com.support_App.controller;

import com.support_App.dto.BorrowingDTO;
import com.support_App.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrowings")
public class BorrowingController {

    @Autowired
    private BorrowingService borrowingService;

    /**
     * Endpoint to borrow a book.
     * @param borrowingDTO The details of the borrowing request.
     * @return The BorrowingDTO object with the new borrowing details.
     */
    @PostMapping
    public ResponseEntity<BorrowingDTO> borrowBook(@RequestBody BorrowingDTO borrowingDTO) {
        return ResponseEntity.ok(borrowingService.borrowBook(borrowingDTO));
    }

    /**
     * Endpoint to return a borrowed book.
     * @param id The ID of the borrowing record.
     * @return The updated BorrowingDTO with the return date.
     */
    @PutMapping("/return/{id}")
    public ResponseEntity<BorrowingDTO> returnBook(@PathVariable Long id) {
        return ResponseEntity.ok(borrowingService.returnBook(id));
    }

    /**
     * Endpoint to view the borrowing history of a user.
     * @param userId The ID of the user.
     * @return A list of BorrowingDTO objects containing the borrowing history.
     */
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<BorrowingDTO>> getBorrowingHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(borrowingService.getBorrowingHistory(userId));
    }
}
