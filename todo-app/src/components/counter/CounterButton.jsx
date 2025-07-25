import PropTypes from "prop-types";

// App.js에서 by 프로퍼티를 전달받음, 상위메소드에서,someMethodInParent 프로퍼티를 받아옴
// 프로퍼티 기본값은 1로 설정
// 이렇게 되면, CounterButton 안에서, 상위메서드에 접근가능함
export default function CounterButton({
  by = 1,
  incremetMethod,
  decremetMethod,
}) {
  // 함수를 연결할때, 중괄호로 감싸서 넣어야함.
  // 스타일은 중괄호 2개
  // 중괄호를 사용해서, count값을 표현. {상태값}
  // by 프로퍼티만큼 증감함
  // 증가함수 참조값 대신, 화살표 메서드로 by 프로퍼티를 넘김
  return (
    <div className="Counter">
      <div>
        <button className="counterButton" onClick={() => incremetMethod(by)}>
          +{by}
        </button>
        <button className="counterButton" onClick={() => decremetMethod(by)}>
          -{by}
        </button>
      </div>
    </div>
  );
}

// 프로퍼티에 특정타입의 값만 넣게하려면, propTypes를 사용
// propTypes 임포트 해주고 사용
CounterButton.propTypes = {
  by: PropTypes.number,
};

// 프로퍼티 기본값 설정
// 함수형 컴포넌트에선 18부턴 사용안됨. 클래스형 컴포넌트는 가능하다고함
// 리액트 18부터는, defaultProps를 사용하지 않고, 함수의 매개변수에 기본값을 설정할 수 있음
// Counter.defaultProps = {
//   by: 1, // 기본값은 1
// };
