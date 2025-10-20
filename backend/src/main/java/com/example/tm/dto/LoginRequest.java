package com.example.tm.dto;

public class LoginRequest {
    public String email;
    public String password;

    public LoginRequest() {} // важно для десериализации Jackson
}