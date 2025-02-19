package com.support_App.repository;

import com.support_App.enums.Genre;
import com.support_App.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book , Long> {

    List<Book> findByTitleOrAuthorOrGenre(String title, String author, Genre genre);
}
