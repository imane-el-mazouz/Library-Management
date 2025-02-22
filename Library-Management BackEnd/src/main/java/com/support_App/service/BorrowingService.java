package com.support_App.service;

import com.support_App.dto.BorrowingDTO;

import com.support_App.exception.BookNotFoundException;
import com.support_App.mapper.BorrowingMapper;
import com.support_App.model.Book;
import com.support_App.model.Borrowing;
import com.support_App.model.User;
import com.support_App.repository.BookRepository;
import com.support_App.repository.BorrowingRepository;
import com.support_App.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BorrowingService {

    @Autowired
    private BorrowingRepository borrowingRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BorrowingMapper borrowingMapper;

    public BorrowingDTO borrowBook(BorrowingDTO borrowingDTO) {
        Book book = bookRepository.findById(borrowingDTO.getBookId())
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        if (!book.isAvailable()) {
            throw new EntityNotFoundException("The book is not available for borrowing");
        }

        User user = userRepository.findById(borrowingDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Borrowing borrowing = new Borrowing();
        borrowing.setBook(book);
        borrowing.setUser(user);
        borrowing.setBorrowDate(LocalDate.now().toString());
        borrowing.setReturnDate(null);

        borrowing = borrowingRepository.save(borrowing);
        book.setAvailable(false);
        bookRepository.save(book);

        return borrowingMapper.toDTO(borrowing);
    }


    public BorrowingDTO returnBook(Long id) {
        Borrowing borrowing = borrowingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Borrowing not found"));

        borrowing.setReturnDate(LocalDate.now().toString());
        Book book = borrowing.getBook();
        book.setAvailable(true);
        bookRepository.save(book);
        borrowing = borrowingRepository.save(borrowing);
        return borrowingMapper.toDTO(borrowing);
    }

    public List<BorrowingDTO> getBorrowingHistory(Long userId) {
        List<Borrowing> borrowings = borrowingRepository.findByUserId(userId);
        return borrowingMapper.toDTOList(borrowings);
    }

    public List<BorrowingDTO> getAllBorrowings() {
        List<Borrowing> borrowings = borrowingRepository.findAll();
        return borrowingMapper.toDTOList(borrowings);
    }

}
