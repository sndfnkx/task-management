package com.example.tm.dto;

import com.example.tm.model.Task;

public class TaskDto {
    public Long id;
    public String title;
    public String description;
    public String priorityLevel;
    public Long assigneeId;
    public boolean completed;

    public static TaskDto from(Task t){
        TaskDto d = new TaskDto();
        d.id = t.getId();
        d.title = t.getTitle();
        d.description = t.getDescription();
        d.priorityLevel = t.getPriorityLevel().name();
        d.assigneeId = t.getAssignee() != null ? t.getAssignee().getId() : null;
        d.completed = t.isCompleted();
        return d;
    }
}
