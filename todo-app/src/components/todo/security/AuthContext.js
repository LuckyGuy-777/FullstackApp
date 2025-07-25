import { createContext, useState } from "react";

// 여러 컴포넌트에 State 공유하는 방법.

// 컨텍스트 생성.(인증컨텍스트 반환), 설정
// number 상태값을 다른컴포넌트에서 쓰게하려고함. export
export const AuthContext = createContext();

//2.  생성한 컨택스트를 다른컴포넌트에 공유
// AuthProvider의 children은, 지금까지 만든 모든 컴포넌트.
export default function AuthProvider({ children }) {
  // 컨택스트에 state 추가
  const [number, setNumber] = useState(10);

  return (
    <AuthContext.Provider value={{ number }}>{children}</AuthContext.Provider>
  );
}
