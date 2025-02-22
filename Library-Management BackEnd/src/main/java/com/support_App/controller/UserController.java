package com.support_App.controller;

import com.support_App.dto.UserDTO;
import com.support_App.model.User;
import com.support_App.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('LIBRARIAN')")
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @PreAuthorize("hasRole('LIBRARIAN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PreAuthorize("hasAnyRole('LIBRARIAN')")
    @PostMapping("/create-user")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PreAuthorize("hasAnyRole('LIBRARIAN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('LIBRARIAN')")
    @GetMapping("/readers")
    public ResponseEntity<List<UserDTO>> getAllReaders() {
        return ResponseEntity.ok(userService.getAllReaders());
    }
    @PreAuthorize("hasRole('LIBRARIAN')")
    @PostMapping("/readers")
    public UserDTO addReader(@RequestBody User userDTO) {
        return userService.addReader(userDTO);
    }
}
