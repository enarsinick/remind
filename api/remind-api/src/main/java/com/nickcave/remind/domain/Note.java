package com.nickcave.remind.domain;

import java.util.Objects;

import javax.persistence.*;

@Entity
public class Note {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int Id;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private String date;
	
	@Column(nullable = false)
	private String colour;

	public Note() {
		super();
	}

	public Note(int id, String title, String description, String date, String colour) {
		super();
		Id = id;
		this.title = title;
		this.description = description;
		this.date = date;
		this.colour = colour;
	}

	public Note(String title, String description, String date, String colour) {
		super();
		this.title = title;
		this.description = description;
		this.date = date;
		this.colour = colour;
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getColour() {
		return colour;
	}

	public void setColour(String colour) {
		this.colour = colour;
	}

	@Override
	public int hashCode() {
		return Objects.hash(Id, colour, date, description, title);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Note other = (Note) obj;
		return Id == other.Id && Objects.equals(colour, other.colour) && Objects.equals(date, other.date)
				&& Objects.equals(description, other.description) && Objects.equals(title, other.title);
	}

	@Override
	public String toString() {
		return "Note: Id=" + Id + ", title=" + title + ", description=" + description + ", date=" + date + ", colour="
				+ colour + "]";
	}
	
	
}
