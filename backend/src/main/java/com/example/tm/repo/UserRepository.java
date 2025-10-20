package com.example.tm.repo;

import com.example.tm.model.User;
import com.example.tm.model.User.AvailabilityStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("select u from User u where u.availabilityStatus = ?1")
    List<User> findByAvailability(AvailabilityStatus status);
}
