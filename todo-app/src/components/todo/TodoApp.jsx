import "./TodoApp.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";
import HeaderComponent from "./HeaderComponent";
import ListTodosComponent from "./ListTodosComponents";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider from "./security/AuthContext";

// useNavigate = 다른페이지를 탐색. 위치를 변경하는 명령메서드 반환
// 브라우저라우터에 등록된 라우트가, useNavigate로 사용가능한거같음
// "/welcome/:username" 파라미터가 username값을 받아옴
// useParams = 라우팅 파라미터와 일치하는 값이 뭐든, 이걸로 반환

export default function TodoApp() {
  return (
    <div className="Todo-app">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/welcome/:username" element={<WelcomeComponent />} />
            <Route path="/todos" element={<ListTodosComponent />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
