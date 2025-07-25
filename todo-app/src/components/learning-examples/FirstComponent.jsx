// 모듈당, 하나의 export default만 가능
// 함수 컴포넌트
export default function MyFirstComponent() {
  return <div className="FirstComponent">First Component</div>;
}

// 다른 파일은, export만 가능
export function FifthComponent() {
  return <div className="FifthComponent">Fifth Component</div>;
}
