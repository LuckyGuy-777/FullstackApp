import MyFirstComponent from "./FirstComponent";
import MySecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import ForthComponent from "./FourthComponent";
import { FifthComponent } from "./FirstComponent";
import LearningJavaScript from "./LearningJavaScript";

// JSX 에서는, 컴포넌트는 대문자로 시작해야함
// 왜냐면, 소문자로 시작하는 컴포넌트는 HTML 태그로 인식하기 때문
// JSX 에서는 class 대신 className을 사용해야함
// 중괄호가 없으면, export default로 내보낸 컴포넌트가 사용됨

// 임포트한 요소들을, 다른파일로 옮길수 있음

export default function LearningComponent() {
  return (
    // className에, App.css에서 정의한 스타일을 적용
    <div className="App">
      <MyFirstComponent />
      <MySecondComponent />
      <ThirdComponent />
      <ForthComponent />
      <FifthComponent />
      <LearningJavaScript />
    </div>
  );
}
