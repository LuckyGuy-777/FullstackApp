import { Component } from "react";

// 요소 여러개를 하고싶을땐, div로 감싸야함
// 빈 태그로 감싸도 됨
export default class ForthComponent extends Component {
  render() {
    return (
      <>
        <div className="ForthComponent">Forth Component</div>
        <div className="ForthComponent2">Forth Component 2</div>
      </>
    );
  }
}
