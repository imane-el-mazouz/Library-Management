package com.support_App.config;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHasher {
    public static void main(String[] args) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String rawPassword = "0000";
        String hashedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Hashed password: " + hashedPassword);
    }
}
