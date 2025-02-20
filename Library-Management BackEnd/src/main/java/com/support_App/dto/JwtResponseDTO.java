package com.support_App.dto;

import com.support_App.model.User;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class JwtResponseDTO {
    private String accessToken;
    private UserDTO userDTO;
    private User user;



    public JwtResponseDTO(String accessToken, UserDTO userDTO, User user) {
        this.accessToken = accessToken;
        this.userDTO = userDTO;
        this.user = user;
    }

    public JwtResponseDTO(String errorMessage, UserDTO userDTO) {
        this.accessToken = errorMessage;
        this.userDTO = userDTO;
    }

}