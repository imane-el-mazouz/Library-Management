package com.support_App.service;

import com.support_App.dto.UserDTO;
import com.support_App.exception.UserNotFoundException;
import com.support_App.model.User;
import com.support_App.repository.UserRepository;
import com.support_App.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    public User createUser(User user) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String passwordToHash = (user.getPassword() == null || user.getPassword().isEmpty()) ? "0000" : user.getPassword();

        String hashedPassword = passwordEncoder.encode(passwordToHash);

        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setPhone(userDTO.getPhone());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user = userRepository.save(user);
        return userMapper.toDTO(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));
        userRepository.delete(user);
    }




    @Autowired
    public UserService(UserRepository userRepository ) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }





}
