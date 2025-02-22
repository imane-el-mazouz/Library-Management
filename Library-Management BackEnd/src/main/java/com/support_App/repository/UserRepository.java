package com.support_App.repository;

import com.support_App.enums.Role;
import com.support_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByRole(Role role);
}
