import "./TodoApp.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponents";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

// 사용자 인증이 됬는지 확인하는 함수
function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  // 사용자 인증이 됬을경우, 자식 컴포넌트 반환
  if (authContext.isAuthenticated) {
    return children;
  }

  // 사용자 인증이 안됬을경우, 기본페이지 반환
  return <Navigate to="/" />;
}

// useNavigate = 다른페이지를 탐색. 위치를 변경하는 명령메서드 반환
// 브라우저라우터에 등록된 라우트가, useNavigate로 사용가능한거같음
// "/welcome/:username" 파라미터가 username값을 받아옴
// useParams = 라우팅 파라미터와 일치하는 값이 뭐든, 이걸로 반환
// AuthenticatedRoute 사용자 인증이 되었을때만 자식 컴포넌트 작동시킴

export default function TodoApp() {
  return (
    <div className="Todo-app">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosComponent />
                </AuthenticatedRoute>
              }
            />
              <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
