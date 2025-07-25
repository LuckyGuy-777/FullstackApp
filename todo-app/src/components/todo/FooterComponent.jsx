import { AuthContext } from "./security/AuthContext";
import { useContext } from "react";

function FooterComponent() {
  //AuthContext에 접근해서, number값을 받아옴.
  const authContext = useContext(AuthContext);

  console.log(`Footer component - ${authContext.number}`);

  return (
    <footer className="footer">
      <div className="container">Your Footer</div>
    </footer>
  );
}

export default FooterComponent;
