package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

// 스프링시큐리티 설정파일
// 기본 보안인증이 안잡히기 위해서 어노테이션 비활성
//@Configuration
public class BasicAuthenticationSecurityConfiguration {

	// #요약.
	// 모든요청에 대해 인증을 활성화해서, 우리는 모든상태로 되돌리고,
	// 기본인증을 활성화하고, 그다음에 우린 상태가 없는 세션을 설정함.
	// 그리고 CSRF를 비활성함
	
	
	
	// 1. 스프링시큐리티 필터체인 설정
		// HttpServletRequest에 매칭될수있는 필터체인을 정의
		// 요청이 들어오면, 스프링시큐리티는, 이 필터체인을 사용하게됨
		// HttpSecurity는, 우리가 특정한 HTTP요청에 대해 웹기반 보안을
		// 설정할수 있게 함
	
	// 2. CSRF 비활성화
		// 체인을 정의하기 시작하면, 그 체인 전체를 정의해야함
		// 기본값으로 모든 요청이 인증됨
		// 세션이 전혀 없도록 만들기 위함이다.(세션이 필요없어서)
		// 만약, 우리에게 세션이 있으면, CSRF를 반드시 활성화해야함
	
	// 3. 기본적으로 모든 요청을 인증하려고 한다
	// http는 기본적으로 체인 기능을 가진다.
	// 그래서 http
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		// 1. preflight 요청에 대한 응답이, 엑세스 제어 체크를 통과하지 못하는 오류 해결
		// 2. 기본인증 생성
		return 
				http.authorizeHttpRequests(
						// 모든 HTTP요청이 인증되어야 한다는 구문
						// HttpMethod를 넣으려면, new AntPathRequestMatcher를 쓰라함
						auth ->
							auth
							.requestMatchers(new AntPathRequestMatcher("/**", "OPTIONS")).permitAll()// 1번 구현
							.anyRequest().authenticated()
						)
					// HTTP 기본인증 설정
					// 인증페이지 대신에, 아이디랑 패스워드를 입력하라는 팝업이 나오는걸
					// 기본인증이라고 함
					.httpBasic(Customizer.withDefaults())
					// 파라미터는 session. 상태가 없는 세션을 만듬.
					// CSRF를 비활성화한다면, 세션에 상태가 없어야 한다는걸 기억
					.sessionManagement(
							session -> session.sessionCreationPolicy
							(SessionCreationPolicy.STATELESS))
					// CSRF 비활성.
					.csrf(csrf -> csrf.disable())
				
					// http.build()에 오류가 나는 이유는, 예외를 내기 때문임
					// 마지막으로 http.build()를 리턴
					.build();
		
	}
	
}
