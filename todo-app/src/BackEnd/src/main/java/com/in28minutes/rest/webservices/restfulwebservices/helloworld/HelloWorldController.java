package com.in28minutes.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	
	// 시큐리티 필터체인의.. 1번 구현
		// 로그인 정보를 입력받고, 올바르면, 토큰이 생성되고,
		// 응답이 200이면, 올바른 정보를 입력한것.
		// 틀린 정보라면, 토큰이 유효하지 않을것임 -> 인증실패 리턴
	@GetMapping(path = "/basicauth")
	public String basicAuthCheck() {
		return "Success"; 
	}
	
	@GetMapping(path = "/hello-world")
	public String helloWorld() {
		return "Hello World"; 
	}
	
	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World v3"); 
	}
	
	@GetMapping(path = "/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World, %s", name)); 
	}	
}
