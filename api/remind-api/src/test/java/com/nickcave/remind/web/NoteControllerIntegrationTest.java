package com.nickcave.remind.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nickcave.remind.domain.Note;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = { "classpath:note-schema.sql", "classpath:note-data.sql"}, executionPhase = ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles("test")
public class NoteControllerIntegrationTest {
	
	@Autowired
	private MockMvc mvc;
	
	@Autowired
	private ObjectMapper mapper;
	
	@Test
	public void testCreate() throws Exception {
		Note note = new Note("Test note", "This is a test description", "14 December 2021", "#FFFFFF");
		String noteAsJSON = this.mapper.writeValueAsString(note);
		RequestBuilder req = post("/create").contentType(MediaType.APPLICATION_JSON).content(noteAsJSON);
		
		Note testCreatedNote = new Note(2, "Test note", "This is a test description", "14 December 2021", "#FFFFFF");
		String testCreatedNoteAsJSON = this.mapper.writeValueAsString(testCreatedNote);
		
		ResultMatcher checkStatus = status().isCreated();
		ResultMatcher checkBody = content().json(testCreatedNoteAsJSON);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
		
	}
	
	@Test
	public void testGetAll() throws Exception {
		Note note = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		String noteAsJSON = this.mapper.writeValueAsString(List.of(note));
		
		RequestBuilder req = get("/getAll");
		
		ResultMatcher checkStatus = status().isOk();
		ResultMatcher checkBody = content().json(noteAsJSON);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void testGetNote() throws Exception {
		Note note = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		String noteAsJSON = this.mapper.writeValueAsString(note);
		RequestBuilder req = get("/get/" + note.getId()).contentType(MediaType.APPLICATION_JSON).content(noteAsJSON);
		
		ResultMatcher checkStatus = status().isOk();
		ResultMatcher checkBody = content().json(noteAsJSON);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void testUpdateNote() throws Exception {
		Note note = new Note(1, "Test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		String noteAsJSON = this.mapper.writeValueAsString(note);
		RequestBuilder req = put("/update/" + note.getId()).contentType(MediaType.APPLICATION_JSON).content(noteAsJSON);
		
		ResultMatcher checkStatus = status().isAccepted();
		ResultMatcher checkBody = content().json(noteAsJSON);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void testDelete() throws Exception {
		Note note = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		RequestBuilder req = delete("/delete/" + note.getId()).contentType(MediaType.APPLICATION_JSON);
		ResultMatcher checkStatus = status().isNoContent();
		this.mvc.perform(req).andExpect(checkStatus);
	}

}













