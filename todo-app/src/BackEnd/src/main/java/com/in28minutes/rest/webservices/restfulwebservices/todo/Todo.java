package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

// 엔터티가 되도록 관리. 해당 클래스를 엔터티라고 선언함.
@Entity
public class Todo {

	public Todo() {
		
	}
	
	// id값이 null이라면 todo를 삽입. id가 값을 가지면, 기존에있는 todo를 업데이트. todo가 integer을 사용하도록 변경하자
	// int타입인 요소들을 모두 Integer으로 변경
	public Todo(Integer id, String username, String description, LocalDate targetDate, boolean done) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.done = done;
	}
	// h2-console은, 인메모리데이터베이스이기에, 스프링부트의 자동설정이,
	// 자동으로 테이블을 생성해준다.
	@Id
	@GeneratedValue
	private Integer id;
	private String description;
	private boolean done;
	private LocalDate targetDate;
	private String username;
	
	
	
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(LocalDate targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", targetDate="
				+ targetDate + ", done=" + done + "]";
	}

}