import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

// export default로 되어있지 않으면, {}를 사용해야함

// 머리글 컴포넌트
function HeaderComponent() {
  //AuthContext에 접근해서, number값을 받아옴.
  // //useAuth() 훅을 만든걸, 임포트해서 사용
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;

  function logout() {
    authContext.logout();
  }

  //console.log(authContext);
  //const authContext = useContext(AuthContext);
  // 사용자 로그인 성공여부에따라 뜨는메뉴 달라짐
  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a
              className="navbar-brand ms-2 fs-2 fw-bold text-black"
              href="https://www.in28minutes.com"
            >
              in28minutes
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item fs-5">
                  {isAuthenticated && (
                    <Link className="nav-link" to="/welcome/in28minutes">
                      Home
                    </Link>
                  )}
                </li>
                <li className="nav-item fs-5">
                  {isAuthenticated && (
                    <Link className="nav-link" to="/todos">
                      Todos
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
                {!isAuthenticated && (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item fs-5">
                {isAuthenticated && (
                  <Link className="nav-link" to="/logout" onClick={logout}>
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
