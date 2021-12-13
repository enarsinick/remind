package com.nickcave.remind.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nickcave.remind.domain.Note;
import com.nickcave.remind.repo.NotesRepo;

@Service
public class NoteServiceDB implements NoteService {

	private NotesRepo repo;
	
	
	@Autowired
	public NoteServiceDB(NotesRepo repo) {
		super();
		this.repo = repo;
	}

	@Override
	public Note createNote(Note note) {
		return this.repo.save(note);
	}

}
