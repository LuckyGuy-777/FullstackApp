package com.in28minutes.rest.webservices.restfulwebservices.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.in28minutes.rest.webservices.restfulwebservices.todo.Todo;


// 관리할 엔터티, 그리고 엔터티의 ID의 타입
public interface TodoRepository extends JpaRepository<Todo, Integer>{
	
	// Todo에, username이라는 필드가 있기때문에 작동가능. username을 바탕으로 검색할수있음
	List<Todo> findByUsername(String username);
}
