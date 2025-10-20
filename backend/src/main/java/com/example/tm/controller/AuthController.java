package com.example.tm.controller;

import com.example.tm.dto.LoginRequest;
import com.example.tm.dto.LoginResponse;
import com.example.tm.model.User;
import com.example.tm.repo.UserRepository;
import com.example.tm.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    public AuthController(UserRepository userRepo, PasswordEncoder encoder, JwtUtil jwt) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) {
        User u = userRepo.findByEmail(req.email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));

        // Диагностика:
        System.out.println("LOGIN email=" + req.email);
        System.out.println("RAW password=" + req.password);
        String hash = u.getHashedPassword();
        System.out.println("HASH prefix=" + (hash == null ? "null" : hash.substring(0, Math.min(10, hash.length()))));
        boolean ok = encoder.matches(req.password, hash);
        // покажем текущую длину хэша и сгенерим эталон прямо тут
        System.out.println("HASH len=" + (hash == null ? -1 : hash.length()));
        String generated = encoder.encode("password");
        System.out.println("GENERATED hash=" + generated); // <- эту строку потом скопируешь в БД
        System.out.println("GENERATED len=" + generated.length());

        System.out.println("MATCHES=" + ok);

        if (!ok) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        try {
            String token = jwt.generateToken(u.getEmail());
            return new LoginResponse(token, u.getUsername(), u.getEmail());
        } catch (Exception e) {
            e.printStackTrace(); // важно: покажет реальную причину в консоли
            throw new IllegalArgumentException("JWT error: " + e.getClass().getSimpleName());
        }
    }


}
