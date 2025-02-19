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

    /**
     * Method for borrowing a book.
     * @param borrowingDTO The details of the borrowing request.
     * @return The BorrowingDTO object with the new borrowing details.
     */
    public BorrowingDTO borrowBook(BorrowingDTO borrowingDTO) {
        // Find book by ID, throw exception if not found
        Book book = bookRepository.findById(borrowingDTO.getBookId())
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        // Check if the book is available
        if (!book.isAvailable()) {
            throw new EntityNotFoundException("The book is not available for borrowing");
        }

        // Find user by ID, throw exception if not found
        User user = userRepository.findById(borrowingDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Create Borrowing record
        Borrowing borrowing = new Borrowing();
        borrowing.setBook(book);
        borrowing.setUser(user);
        borrowing.setBorrowDate(LocalDate.now().toString());
        borrowing.setReturnDate(null);  // Set return date later when book is returned

        // Save borrowing and update the book availability
        borrowing = borrowingRepository.save(borrowing);
        book.setAvailable(false);  // Mark the book as unavailable
        bookRepository.save(book);

        // Convert Borrowing to BorrowingDTO and return it
        return borrowingMapper.toDTO(borrowing);
    }

    /**
     * Method for returning a borrowed book.
     * @param id The ID of the borrowing record.
     * @return The BorrowingDTO object with updated return date.
     */
    public BorrowingDTO returnBook(Long id) {
        // Find the borrowing record by ID
        Borrowing borrowing = borrowingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Borrowing not found"));

        // Set return date and mark the book as available again
        borrowing.setReturnDate(LocalDate.now().toString());
        Book book = borrowing.getBook();
        book.setAvailable(true);  // Mark book as available again
        bookRepository.save(book);

        // Save the updated borrowing record
        borrowing = borrowingRepository.save(borrowing);

        // Return the updated borrowing details as BorrowingDTO
        return borrowingMapper.toDTO(borrowing);
    }

    /**
     * Method to get the borrowing history of a user.
     * @param userId The ID of the user.
     * @return List of BorrowingDTO with all borrowings of the user.
     */
    public List<BorrowingDTO> getBorrowingHistory(Long userId) {
        // Find borrowings by user ID
        List<Borrowing> borrowings = borrowingRepository.findByUserId(userId);

        // Map to BorrowingDTO and return
        return borrowingMapper.toDTOList(borrowings);
    }
}
