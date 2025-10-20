package com.example.tm.controller;

import com.example.tm.dto.UserDto;
import com.example.tm.model.User;
import com.example.tm.repo.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {
    private final UserRepository userRepo;
    public UserController(UserRepository userRepo){ this.userRepo = userRepo; }

    @GetMapping
    public List<UserDto> all(){
        return userRepo.findAll().stream().map(UserDto::from).collect(Collectors.toList());
    }

    @PostMapping
    public UserDto create(@RequestBody @Valid User user){
        return UserDto.from(userRepo.save(user));
    }

    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @RequestBody @Valid User user){
        user.setId(id);
        return UserDto.from(userRepo.save(user));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){ userRepo.deleteById(id); }
}
