package com.nickcave.remind.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import com.nickcave.remind.domain.Note;
import com.nickcave.remind.repo.NotesRepo;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class NoteServiceDBTest {
	
	@Autowired
	private NoteServiceDB service;
	
	@MockBean
	private NotesRepo repo;
	
	@Test
	public void testCreate() {
		final String COLOUR = "#FFFFFF";
		final String TITLE = "This is a test title";
		final String DESC = "This is a test description";
		final String DATE =  "13 December 2021";
		final Note note = new Note(TITLE, DESC, DATE, COLOUR);
		
		Mockito.when(this.repo.save(note)).thenReturn(note);
		
		assertEquals(note, this.service.createNote(note));
		
		Mockito.verify(this.repo, Mockito.times(1)).save(note);
	}
	
	@Test
	public void testReadAll() {
		List<Note> notes = new ArrayList<>();
		final String COLOUR = "#FFFFFF";
		final String TITLE = "This is a test title";
		final String DESC = "This is a test description";
		final String DATE =  "13 December 2021";
		final Note note = new Note(TITLE, DESC, DATE, COLOUR);
		notes.add(note);
		
		Mockito.when(this.repo.findAll()).thenReturn(notes);
		
		assertEquals(notes, this.service.getAll());
		
		Mockito.verify(this.repo, Mockito.times(1)).findAll();
	}
	
	@Test
	public void testGetNote() {
		final int ID = 1;
		final String COLOUR = "#FFFFFF";
		final String TITLE = "This is a test title";
		final String DESC = "This is a test description";
		final String DATE =  "13 December 2021";
		final Note note = new Note(ID, TITLE, DESC, DATE, COLOUR);
		
		Mockito.when(this.repo.findById(ID)).thenReturn(Optional.of(note));
		
		assertEquals(note, this.service.getById(ID));
		
		Mockito.verify(this.repo, Mockito.times(1)).findById(ID);
	}
	
	@Test
	public void testUpdate() {
		Note oldNote = new Note(1, "This is a test description", "This is a test title", "13 December 2021", "#FFFFFF");
		Note newNote = new Note(1, "This is a test title", "This is a test description", "13 December 2021", "#FFFFFF");
		
		Mockito.when(this.repo.findById(1)).thenReturn(Optional.of(oldNote));
		Mockito.when(this.repo.save(newNote)).thenReturn(newNote);
		
		assertEquals(newNote, this.service.updateNote(1, newNote));
		
		Mockito.verify(this.repo, Mockito.times(1)).findById(1);
		Mockito.verify(this.repo, Mockito.times(1)).save(newNote);
		
	}

}











