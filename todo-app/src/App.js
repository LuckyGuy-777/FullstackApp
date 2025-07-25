import "./App.css";
import TodoApp from "./components/todo/TodoApp";

function App() {
  return (
    // className에, App.css에서 정의한 스타일을 적용
    // 러닝 컴포넌트에, 임포트요소들 존재함
    // 프로퍼티 전달방법.
    // {} 써야 숫자를 넘길수 있음
    <div className="App">
      <TodoApp />
    </div>
  );
}

// {property1: 'value1', property2: 'value2'}
// function PlayingWithProps(properties) {
//   console.log(properties);
//   console.log(properties.property1);
//   console.log(properties.property2);

//   return <div>Props</div>;
// }

// 모던 자바스크립트에서는, 함수의 매개변수에 객체를 바로 넣을 수 있음
// {} 을 사용하면, 구조분해가 일어남 (프로퍼티 안에 있는 값이 각각의 변수에 할당됨)
// function PlayingWithProps({ property1, property2 }) {
//   console.log(property1);
//   console.log(property2);

//   return <div>Props</div>;
// }

export default App;
