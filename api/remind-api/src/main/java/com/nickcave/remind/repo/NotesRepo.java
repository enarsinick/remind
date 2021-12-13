package com.nickcave.remind.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nickcave.remind.domain.Note;

@Repository
public interface NotesRepo extends JpaRepository<Note, Integer> {

}
