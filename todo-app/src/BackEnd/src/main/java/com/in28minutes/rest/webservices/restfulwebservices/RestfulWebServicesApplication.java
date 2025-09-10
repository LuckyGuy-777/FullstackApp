package com.in28minutes.rest.webservices.restfulwebservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RestfulWebServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestfulWebServicesApplication.class, args);
	}

	// http://localhost:3000/ to 8080
	// 이걸 Cross Origin Requests
	// 3000번 만 허용하게끔 하자
	// addMapping은 특정한 패턴에대해, 크로스 오리진 리퀘스트처리를
	// 가능하게 해줌
	// Jwt패키지가, com.in28minutes.rest.webservices.restfulwebservices;
	// 패키지의 서브패키지 이여야 함. -> @스프링부트어플리케이션 이 있는 클래스의 패키지의 서브패키지에 존재해야함
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
					.allowedMethods("*")
					.allowedOrigins("http://localhost:3000");
			}
		};
	}
}
