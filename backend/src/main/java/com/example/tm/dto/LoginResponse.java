package com.example.tm.dto;

public class LoginResponse {
    public String token;
    public String username;
    public String email;
    public LoginResponse(String token, String username, String email) {
        this.token = token; this.username = username; this.email = email;
    }
}
