INSERT INTO users(id, username, email, hashed_password, availability_status) VALUES
 (1,'Alice','alice@example.com','$2a$10$Dow1b6Fq3NT0bkkCm1cWnOMc1qz9DuY3gHkJQpM3E9mS8Gxq0w5Q','AVAILABLE'),
 (2,'Bob','bob@example.com','$2a$10$Dow1b6Fq3NT0bkkCm1cWnOMc1qz9DuY3gHkJQpM3E9mS8Gxq0w5Q','BUSY'),
 (3,'Cara','cara@example.com','$2a$10$Dow1b6Fq3NT0bkkCm1cWnOMc1qz9DuY3gHkJQpM3E9mS8Gxq0w5Q','AVAILABLE');

INSERT INTO tasks(id, title, description, priority_level, assignee_id, creation_timestamp) VALUES
 (1,'Setup project','Initialize repo','HIGH',1, NOW()),
 (2,'Design schema','Create ER diagram','MEDIUM',1, NOW()),
 (3,'Implement login','JWT flow','HIGH',NULL, NOW()),
 (4,'Build UI','React screens','LOW',2, NOW()),
 (5,'Write tests','JUnit + RTL','MEDIUM',NULL, NOW());
