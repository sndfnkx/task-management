package com.example.tm.repo;

import com.example.tm.model.Task;
import com.example.tm.model.Task.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByPriorityLevel(Priority priority);
    List<Task> findByAssignee_Id(Long userId);
}
