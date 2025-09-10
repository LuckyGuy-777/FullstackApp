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

import com.in28minutes.rest.webservices.restfulwebservices.todo.repository.TodoRepository;

// 데이터베이스와 통신하기위한 클래스
@RestController
public class TodoJpaResource {
	
	private TodoService todoService;
	
	// 데이터베이스와 통신하기위해 TodoRepository 가져옴
	private TodoRepository todoRepository;
	
	// 레포지터리 등을 사용위해, 생성자에 파라미터 추가.
	public TodoJpaResource(TodoService todoService,TodoRepository todoRepository) {
		this.todoService = todoService;
		this.todoRepository=todoRepository;
	}
	
	// 레포지터리에서, 전체 Todo 목록 조회
	// h2-console에 저장되어있는 데이터들이 출력되나봄
	@GetMapping("/users/{username}/todos")
	public List<Todo> retrieveTodos(@PathVariable String username) {
		//return todoService.findByUsername(username);
		return todoRepository.findByUsername(username);
	}

	

	// 단일 Todo 조회
	// todoRepository의 findById를 사용
	@GetMapping("/users/{username}/todos/{id}")
	public Todo retrieveTodo(@PathVariable String username,
			@PathVariable int id) {
		//return todoService.findById(id);
		// optional 타입이기에 null을 반환할수 있어서, get()을 뒤에 추가
		return todoRepository.findById(id).get();
	}
	
	// 삭제 메서드. NO CONTENT 리턴함.
	// todoRepository의 deleteById 사용
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodos(@PathVariable String username,
			@PathVariable int id) {
		todoRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	// TodoRepository에는 update와 create 메서드가 없다고함.
	
	// 업데이트 요청 메서드
	// 업데이트를 할때 put매핑을 사용할거라함
	// save메서드가 insert, update 모두에 사용됨
	@PutMapping("/users/{username}/todos/{id}")
	public Todo updateTodo(@PathVariable String username,
			@PathVariable int id, @RequestBody Todo todo) {
		//todoService.updateTodo(todo);
		todoRepository.save(todo);
		return todo;
	}
	
	// 목록생성 메서드
	// 새로운 목록 생성시에 쓰이는 메서드
	@PostMapping("/users/{username}/todos")
	public Todo createTodo(@PathVariable String username,
			@RequestBody Todo todo) {
		// Todo가 올바른 유저명을 가지도록함.
		// 목록 만들때 입력된 username을 입력받음
		todo.setUsername(username);
		// DB에 ID가 저장될때, 새로운 엔터티를 인식하고, 
		// DB에서 자동으로 NULL -> ID값으로 수정해서 저장함
		todo.setId(null);
		return todoRepository.save(todo);
		// .save(todo)가 같은 엔터티를 반환하기때문에, 저장한 엔터티 반환.
//		Todo createTodo = todoService.addTodo(username,todo.getDescription(),
//				todo.getTargetDate(),todo.isDone());
		
//		return createTodo;
	}
}
