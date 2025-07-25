import { useState } from "react";
import "./Counter.css";
import CounterButton from "./CounterButton";

// 프로퍼티 전달방법.
// {} 써야 숫자를 넘길수 있음
export default function Counter() {
  // 첫번째 값은 상태값, 두번째 값은 상태를 변경하는 함수
  // useState는 배열을 반환함
  // 증가, 감소, 리셋 함수
  const [count, setCount] = useState(0);

  function incrementCounterFunction(by) {
    setCount(count + by);
  }

  function decrementCounterFunction(by) {
    setCount(count - by);
  }

  function resetCounter() {
    setCount(0);
  }

  return (
    <>
      <span className="totalCount">{count}</span>
      <CounterButton
        by={1}
        incremetMethod={incrementCounterFunction}
        decremetMethod={decrementCounterFunction}
      />
      <CounterButton
        by={2}
        incremetMethod={incrementCounterFunction}
        decremetMethod={decrementCounterFunction}
      />
      <CounterButton
        by={5}
        incremetMethod={incrementCounterFunction}
        decremetMethod={decrementCounterFunction}
      />
      <button className="resetButton" onClick={resetCounter}>
        Reset
      </button>
    </>
  );
}
