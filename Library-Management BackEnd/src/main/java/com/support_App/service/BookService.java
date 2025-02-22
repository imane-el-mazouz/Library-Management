package com.support_App.service;

import com.support_App.dto.BookDTO;
import com.support_App.enums.Genre;
import com.support_App.exception.BookNotFoundException;
import com.support_App.model.Book;
import com.support_App.repository.BookRepository;
import com.support_App.mapper.BookMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookMapper bookMapper;

    public BookDTO addBook(BookDTO bookDTO) {
        Book book = bookMapper.toEntity(bookDTO);
        book = bookRepository.save(book);
        return bookMapper.toDTO(book);
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setGenre(bookDTO.getGenre());
        book.setAvailable(bookDTO.isAvailable());
        book = bookRepository.save(book);
        return bookMapper.toDTO(book);
    }

    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
        bookRepository.delete(book);
    }

    public List<BookDTO> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return bookMapper.toDTOList(books);
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book not found"));
        return bookMapper.toDTO(book);
    }

    public List<BookDTO> searchBooks(String title, String author, Genre genre) {
        List<Book> books = bookRepository.findByTitleOrAuthorOrGenre(title, author, genre);
        return bookMapper.toDTOList(books);
    }

    public String getBookAvailability(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book not found"));

        if (book.isAvailable()) {
            return "Book is available for borrowing.";
        } else {
            return "Book is currently borrowed.";
        }
    }

}
