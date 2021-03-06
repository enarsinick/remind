package com.nickcave.remind.service;

import java.util.List;

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

	@Override
	public List<Note> getAll() {
		return this.repo.findAll();
	}

	@Override
	public Note getById(int id) {
		return this.repo.findById(id).get();
	}

	@Override
	public Note updateNote(int id, Note note) {
		Note existing = this.repo.findById(id).get();
		existing.setTitle(note.getTitle());
		existing.setColour(note.getColour());
		existing.setDate(note.getDate());
		existing.setDescription(note.getDescription());
		return this.repo.save(existing);
	}

	@Override
	public void delete(int id) {
		this.repo.deleteById(id);
	}
}
