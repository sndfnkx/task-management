package com.example.tm.service;

import com.example.tm.model.Task;
import com.example.tm.model.User;
import com.example.tm.repo.TaskRepository;
import com.example.tm.repo.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepo;
    private final UserRepository userRepo;
    public TaskService(TaskRepository taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo; this.userRepo = userRepo;
    }

    @Transactional
    public Task autoAssign(Task task){
        List<User> available = userRepo.findByAvailability(User.AvailabilityStatus.AVAILABLE);
        if(available.isEmpty()) throw new IllegalStateException("No available users");
        User leastLoaded = available.stream().min(Comparator.comparingInt(u -> u.getTasks().size()))
                .orElseThrow();
        task.setAssignee(leastLoaded);
        return taskRepo.save(task);
    }
}
