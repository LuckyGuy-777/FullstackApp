import { apiClient } from "./ApiClient";

// 토큰을 이용해서, 
// 이 함수는, 인증토큰을 통해, basicauth를 호출하고,

// 기본인증이 성공인지 아닌지 알수있음.
export const executeBasicAuthenticationService
    = (token) => apiClient.get(`/basicauth`,{
        headers: {
            // 토큰이 인증헤더로서 전송이됨
            Authorization: token
        }
    })

// JWT 인증. username과 password가 입력값으로 전달됨
// username,password를 객체로 전달해서, apiClient.get(`/authenticate`)를
export const executeJwtAuthenticationService
    = (username, password) => 
        apiClient.post(`/authenticate`,{username,password})