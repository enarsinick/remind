package com.nickcave.remind.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
public class NoteTest {
	
	@Test
	public void testToString() {
		Note note = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		String expected = "Note: Id=1, title=Morbi at feugiat un, vel mollis justo, description=Lorem ipsum dolor sit amet, consectetur adipiscing elit., date=13 December 2021, colour=#DEAF62]";
		String result = note.toString();
		assertEquals(expected, result);
	}

	@Test
	public void testEquals() {
		Note note1 = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		Note note2 = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		assertTrue(note1.equals(note2));
	}
	
	@Test
	public void testHash() {
		Note note1 = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		Note note2 = new Note(1, "Morbi at feugiat un, vel mollis justo", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "13 December 2021", "#DEAF62");
		assertEquals(note1.hashCode(), note2.hashCode());
	}
}
