package com.support_App.mapper;

import com.support_App.dto.BookDTO;
import com.support_App.model.Book;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BookMapper {

    public BookDTO toDTO(Book book) {
        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor(), book.getGenre(), book.isAvailable());
    }

    public Book toEntity(BookDTO bookDTO) {
        return new Book(bookDTO.getId(), bookDTO.getTitle(), bookDTO.getAuthor(), bookDTO.getGenre(), bookDTO.isAvailable());
    }

    public List<BookDTO> toDTOList(List<Book> books) {
        return books.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
