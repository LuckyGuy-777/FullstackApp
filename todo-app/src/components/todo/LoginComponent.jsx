import { useState } from "react";
import { useNavigate } from "react-router-dom";
// 아이디, 패스워드 컴포넌트를 제어 컴포넌트로 만듦
// 리액트 스테이트 양식에 변화발생 -> 동시에 양식 요소도 변화
function LoginComponent() {
  // 로그인 탭 상태값
  const [username, setUsername] = useState("in28minutes");
  const [password, setPassword] = useState("");

  // 로그인 성공/실패시 상태값
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // 페이지 반환위해서, useNavigate 훅을 사용
  const navigate = useNavigate();

  // 아이디 입력값을, 상태값으로 변경하는 함수
  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }
  // 패스워드 입력값을, 상태값으로 변경하는 함수
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // 사용자 인증 로직
  function handleSubmit() {
    if (username === "in28minutes" && password === "dummy") {
      console.log("Authenticated Successfully");
      setShowSuccessMessage(true);
      setShowErrorMessage(false);
      navigate(`/welcome/${username}`); // 로그인 성공시 /welcome 페이지로 이동. 여기서 변수쓰려면 `(틱) 사용
    } else {
      console.log("Authentication Failed. Please check your credentials.");
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
    }
  }

  // onChange 이벤트를 통해 아이디/ 패스워드 입력값이 변경될 때마다 상태값을 업데이트
  //true 일때 성공/에러 메세지. (true && "문자") = true일 때 "문자" 출력
  return (
    <div className="Login">
      <h1>Time to Login</h1>
      {showSuccessMessage && (
        <div className="successMessage">Authenticated Successfully</div>
      )}
      {showErrorMessage && (
        <div className="errorMessage">
          Authentication Failed. Please check your credentials.
        </div>
      )}
      <div className="LoginForm">
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button type="button" name="login" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
