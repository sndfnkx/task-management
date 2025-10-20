package com.example.tm.dto;

import com.example.tm.model.User;

public class UserDto {
    public Long id;
    public String username;
    public String email;
    public String availabilityStatus;

    public static UserDto from(User u){
        UserDto d = new UserDto();
        d.id = u.getId();
        d.username = u.getUsername();
        d.email = u.getEmail();
        d.availabilityStatus = u.getAvailabilityStatus().name();
        return d;
    }
}
