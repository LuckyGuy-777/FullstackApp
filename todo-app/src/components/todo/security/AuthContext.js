import { createContext, useContext, useState } from "react";

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

  // 다른 컴포넌트에서도, state값을 사용할수있게하려면, value={}에 입력
  // 로그인 컴포넌트는 setAuthenticated에 접근함.
  // 변수로, 상태값을 전달
  function login(username, password) {
    if (username === "in28minutes" && password === "dummy") {
      setAuthenticated(true); //로그인 성공 true
      setUsername(username)
      return true;
    } else {
      setAuthenticated(false); // 로그인 실패 false
      setUsername(null)
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
