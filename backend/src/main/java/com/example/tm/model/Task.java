package com.example.tm.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.Instant;

@Entity
@Table(name = "tasks")
public class Task {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private Priority priorityLevel = Priority.MEDIUM;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private User assignee;

    private Instant creationTimestamp = Instant.now();

    public enum Priority { LOW, MEDIUM, HIGH }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Priority getPriorityLevel() { return priorityLevel; }
    public void setPriorityLevel(Priority priorityLevel) { this.priorityLevel = priorityLevel; }
    public User getAssignee() { return assignee; }
    public void setAssignee(User assignee) { this.assignee = assignee; }
    public java.time.Instant getCreationTimestamp() { return creationTimestamp; }
    public void setCreationTimestamp(java.time.Instant creationTimestamp) { this.creationTimestamp = creationTimestamp; }


    @Column(nullable = false)
    private boolean completed = false;

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }


}
