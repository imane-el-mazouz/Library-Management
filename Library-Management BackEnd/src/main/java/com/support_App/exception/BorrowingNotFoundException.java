package com.support_App.exception;

public class BorrowingNotFoundException extends RuntimeException {
    public BorrowingNotFoundException(String message) {
        super(message);
    }
}