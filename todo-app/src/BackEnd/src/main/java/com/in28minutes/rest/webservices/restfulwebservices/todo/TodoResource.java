package com.in28minutes.rest.webservices.restfulwebservices.todo;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TodoResource {
	
	private TodoService todoService;
	
	public TodoResource(TodoService todoService) {
		this.todoService = todoService;
	}
	
	// 전체 Todo 목록 조회
	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		return todoService.findByUsername(username);
	}

	

	// 단일 Todo 조회
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodos(@PathVariable String username,
			@PathVariable int id) {
		return todoService.findById(id);
	}
	
	// 삭제 메서드. NO CONTENT 리턴함.
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodos(@PathVariable String username,
			@PathVariable int id) {
		todoService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	// 업데이트 요청 메서드
	// 업데이트를 할때 put매핑을 사용할거라함
	@PutMapping("/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username,
			@PathVariable int id, @RequestBody Todo todo) {
		todoService.updateTodo(todo);
		return todo;
	}
	
	// 목록생성 메서드
	@PostMapping("/users/{username}/todos")
	public Todo createTodo(@PathVariable String username,
			@RequestBody Todo todo) {
		Todo createTodo = todoService.addTodo(username,todo.getDescription(),
				todo.getTargetDate(),todo.isDone());
		
		return createTodo;
	}
}
