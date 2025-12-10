package com.typingrpg.backend.exception;

public class InsufficientGoldException extends RuntimeException {
    public InsufficientGoldException(String message) {
        super(message);
    }
}
