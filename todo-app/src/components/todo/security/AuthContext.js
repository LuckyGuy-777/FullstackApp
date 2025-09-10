import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import {  executeJwtAuthenticationService } from "../api/AuthenticationApiService";

// 여러 컴포넌트에 State 공유하는 방법.
// 인증관련 로직임.
// 컨텍스트 생성.(인증컨텍스트 반환), 설정
// number 상태값을 다른컴포넌트에서 쓰게하려고함. export
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
 
//2.  생성한 컨택스트를 다른컴포넌트에 공유
// AuthProvider의 children은, 지금까지 만든 모든 컴포넌트.
export default function AuthProvider({ children }) {
  // 로그인 인증 상태값
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [token, setToken] = useState(null);

  // 다른 컴포넌트에서도, state값을 사용할수있게하려면, value={}에 입력
  // 로그인 컴포넌트는 setAuthenticated에 접근함.
  // 변수로, 상태값을 전달
  // function login(username, password) {
  //   if (username === "in28minutes" && password === "dummy") {
  //     setAuthenticated(true); //로그인 성공 true
  //     setUsername(username)
  //     return true;
  //   } else {
  //     setAuthenticated(false); // 로그인 실패 false
  //     setUsername(null)
  //     return false;
  //   }
  // }

  
// 응답을 받을때까지 실행중지, 응답을 받으면 true를 리턴하려고함 -> async 사용
  async function login(username, password) {

    // API를 요청할때 토큰이 리턴될것임

   
    try{
      
      // 기본인증 토큰상수를 이용해서 아래의 함수를 호출함.
      // 응답을받으면, 콘솔로 response, 오류를 받으면, 오류 출력
      // async를 쓰면, await을 쓸수있음
      // 기본인증서비스가 실행될때까지 기다렸다가, reponse를 리턴
      const response = await executeJwtAuthenticationService(username,password)

      // 로그인 데이터가 유효하면,아래로직
      // 응답이 성공적이면 아래를 실행
      if (response.status == 200) {
        // JWT에서 받는 응답데이터를, response.data. 여기의 토큰을 추가함
        // 리턴되는 Json객체의 일부로서 토큰을 받게됨. 그것을 사용함
        const jwtToken = 'Bearer '+response.data.token

        setAuthenticated(true); //로그인 성공 true
        setUsername(username)
        setToken(jwtToken) // Jwt토큰을 컨텍스트에 설정

        // 사용자가 로그인을 하자마자, 모든 apiClient
        // 호출에 토큰을 헤더에 추가하려함. 모든 요청에대해,
        // 인터셉터를 생성함.
          //모든 API호출을 이것이 가로채고 있고,
          //모든 API호출에 인증헤더를 추가하고 있음.
        // 요약해서.. 인터셉터를 설정해서, 모든 REST API호출에
        // 인증토큰을 추가하라고 하고있음
        // JWT추가하고 후반부에 JWT인증에 문제가 있을떄,
        // 인증헤더가 이상하면, 인터셉터를 확인해라
        // 인터셉터가 인증헤더에 추가하고 있다.
        apiClient.interceptors.request.use(
          (config) => {
            console.log('intercepting and adding a token')
            
            // # 요청설정에 인증헤더를 추가하고있음
            // 인증헤더를 설정할때도 JWT토큰을 사용
            config.headers.Authorization=jwtToken
            return config
          }
        )

        return true;
      } else {
        logout()
        return false;
      }
    } catch(error){
      // 메서드 실행에, 오류가 하나라도 있다면, false 리턴.
      // 유효하지 않은 인증이면, 로그아웃 호출로, 모든토큰 정리. 
        logout()
        return false;
    }


  }

  // 로그아웃시, 토큰과 유저네임을 null로 처리
  // 또는, 유효하지 않은 인증이 있다면 모든 토큰을 정리하려는 용도
  function logout() {
    setAuthenticated(false);
    setToken(null)
    setUsername(null)
  }

  // 토큰을 리턴해서, REST API가 사용할수 있도록 하려함
  // 크롬-> 검사 -> 컴포넌트 -> Context.Provider에서, token등 아래요소 확인가능
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }}>
      {children}
    </AuthContext.Provider>
  );
}
