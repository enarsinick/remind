package com.nickcave.remind.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

}
