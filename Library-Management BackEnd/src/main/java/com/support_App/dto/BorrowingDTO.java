package com.support_App.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
public class BorrowingDTO {
    private Long id;
    private LocalDate borrowDate;
    private LocalDate returnDate;
    private Long userId;
    private Long bookId;


    public BorrowingDTO(Long id, Long userId, Long bookId, String borrowDate, String returnDate) {
    }

    public BorrowingDTO(Long id, LocalDate borrowDate, LocalDate returnDate, Long userId, Long bookId) {
        this.id = id;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.userId = userId;
        this.bookId = bookId;
    }
}
