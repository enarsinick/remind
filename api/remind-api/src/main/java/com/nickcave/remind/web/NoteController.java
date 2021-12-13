package com.nickcave.remind.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nickcave.remind.domain.Note;
import com.nickcave.remind.service.NoteService;

@RestController
public class NoteController {
	
	private NoteService service;

	@Autowired
	public NoteController(NoteService service) {
		super();
		this.service = service;
	}
	
	@PostMapping("/create")
	public ResponseEntity<Note> createDog(@RequestBody Note note) {
		return new ResponseEntity<Note>(this.service.createNote(note), HttpStatus.CREATED);
	}
	
	@GetMapping("/getAll")
	public List<Note> getAll() {
		return this.service.getAll();
	}
	
	@GetMapping("/get/{id}")
	public Note getById(@PathVariable int id) {
		return this.service.getById(id);
	}
	
	@PutMapping("update/{id}")
	public ResponseEntity<Note> updateNote(@PathVariable int id, @RequestBody Note note) {
		return new ResponseEntity<Note>(this.service.updateNote(id, note), HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<Note> delete(@PathVariable int id) {
		this.service.delete(id);
		return new ResponseEntity<Note>(HttpStatus.NO_CONTENT);
	}

}









