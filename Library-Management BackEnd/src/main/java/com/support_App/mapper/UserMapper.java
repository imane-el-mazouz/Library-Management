package com.support_App.mapper;

import com.support_App.dto.UserDTO;
import com.support_App.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        return new UserDTO(user.getId(), user.getFirstName(), user.getLastName(), user.getPhone(), user.getEmail(), user.getRole());
    }

    public User toEntity(UserDTO userDTO) {
        return new User(userDTO.getId(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getPhone(), userDTO.getEmail(), userDTO.getRole());
    }
}
