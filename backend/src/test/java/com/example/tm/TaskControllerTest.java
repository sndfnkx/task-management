package com.example.tm;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// Запускаем реальный контекст
@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {

    @Autowired MockMvc mvc;
    @Autowired ObjectMapper om;

    String token;

    @BeforeEach
    void getToken() throws Exception {
        var res = mvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"alice@example.com\",\"password\":\"password\"}"))
                .andExpect(status().isOk())
                .andReturn();
        var body = res.getResponse().getContentAsString();
        token = om.readTree(body).get("token").asText();
    }

    @Test
    void create_get_update_delete() throws Exception {
        // create
        var create = mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer "+token)
                        .content("{\"title\":\"Test\",\"description\":\"D\",\"priorityLevel\":\"HIGH\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andReturn();
        long id = om.readTree(create.getResponse().getContentAsString()).get("id").asLong();

        // get all
        mvc.perform(get("/api/tasks").header("Authorization","Bearer "+token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", not(empty())));

        // update
        mvc.perform(put("/api/tasks/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer "+token)
                        .content("{\"title\":\"Updated\",\"description\":\"D2\",\"priorityLevel\":\"MEDIUM\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated"));

        // delete
        mvc.perform(delete("/api/tasks/{id}", id)
                        .header("Authorization","Bearer "+token))
                .andExpect(status().isOk());
    }

    @Test
    void auto_assign_picks_available() throws Exception {
        mvc.perform(post("/api/tasks/assign")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer "+token)
                        .content("{\"title\":\"Auto\",\"description\":\"\",\"priorityLevel\":\"LOW\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.assigneeId").isNumber());
    }

    @Test
    void patch_completed() throws Exception {
        // создаём
        var create = mvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer "+token)
                        .content("{\"title\":\"Done me\",\"priorityLevel\":\"LOW\"}"))
                .andReturn();
        long id = om.readTree(create.getResponse().getContentAsString()).get("id").asLong();

        // PATCH /completed
        mvc.perform(patch("/api/tasks/{id}/completed", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization","Bearer "+token)
                        .content("{\"completed\":true}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.completed").value(true));
    }
}
