package com.nickcave.remind.service;

import java.util.List;

import com.nickcave.remind.domain.Note;

public interface NoteService {
	
	public Note createNote(Note note);
	
	public List<Note> getAll();
	
	public Note getById(int id);
	
}
