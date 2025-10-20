package com.example.tm.controller;

import com.example.tm.dto.TaskDto;
import com.example.tm.model.Task;
import com.example.tm.model.Task.Priority;
import com.example.tm.model.User;
import com.example.tm.repo.TaskRepository;
import com.example.tm.repo.UserRepository;
import com.example.tm.service.TaskService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin
public class TaskController {
    private final TaskRepository taskRepo;
    private final UserRepository userRepo;
    private final TaskService taskService;

    public TaskController(TaskRepository taskRepo, UserRepository userRepo, TaskService taskService) {
        this.taskRepo = taskRepo; this.userRepo = userRepo; this.taskService = taskService;
    }

    @GetMapping
    public List<TaskDto> all(@RequestParam(required = false) Priority priority,
                             @RequestParam(required = false) Long assigneeId){
        List<Task> list;
        if(priority != null) list = taskRepo.findByPriorityLevel(priority);
        else if(assigneeId != null) list = taskRepo.findByAssignee_Id(assigneeId);
        else list = taskRepo.findAll();
        return list.stream().map(TaskDto::from).collect(Collectors.toList());
    }

    @PostMapping
    public TaskDto create(@RequestBody @Valid Task task){
        if(task.getAssignee() != null && task.getAssignee().getId() != null){
            User u = userRepo.findById(task.getAssignee().getId()).orElseThrow();
            task.setAssignee(u);
        }
        return TaskDto.from(taskRepo.save(task));
    }

    @PostMapping("/assign")
    public TaskDto autoAssign(@RequestBody @Valid Task task){
        return TaskDto.from(taskService.autoAssign(task));
    }

    @PutMapping("/{id}")
    public TaskDto update(@PathVariable Long id, @RequestBody @Valid Task task){
        task.setId(id);
        if(task.getAssignee() != null && task.getAssignee().getId() != null){
            User u = userRepo.findById(task.getAssignee().getId()).orElseThrow();
            task.setAssignee(u);
        }
        return TaskDto.from(taskRepo.save(task));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        taskRepo.deleteById(id);
    }



    @PatchMapping("/{id}/completed")
    public TaskDto setCompleted(@PathVariable Long id, @RequestBody java.util.Map<String, Boolean> body) {
        boolean value = Boolean.TRUE.equals(body.get("completed"));
        Task t = taskRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        t.setCompleted(value);
        return TaskDto.from(taskRepo.save(t));
    }


}
