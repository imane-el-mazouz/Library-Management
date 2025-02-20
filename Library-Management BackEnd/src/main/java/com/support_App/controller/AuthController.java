package com.support_App.controller;


import com.support_App.dto.AuthRequestDTO;
import com.support_App.dto.JwtResponseDTO;
import com.support_App.model.User;
import com.support_App.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

  private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDTO authRequestDTO) {
        try {
            JwtResponseDTO jwtResponseDTO = authService.login(authRequestDTO);
            return ResponseEntity.ok(jwtResponseDTO);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Utilisateur ou mot de passe incorrect.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur est survenue.");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<JwtResponseDTO> registerUser(@RequestBody User user) {
        try {
            JwtResponseDTO response = authService.signUp(user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JwtResponseDTO("Error", null));
        }
    }
}
