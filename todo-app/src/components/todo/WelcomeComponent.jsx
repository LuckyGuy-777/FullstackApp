import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";

function WelcomeComponent() {
  const { username } = useParams();

  const [message,setMessage] = useState(null)

  function callHelloWorldRestApi(){
    console.log('called')

    // axios를 사용해서, Rest api 호출
    // 호출 성공시, 200응답과, .then 발생.
    // 실패시 .catch와 error. 성공과 무관하게 finally
        retrieveHelloWorldPathVariable('choi')
          .then((response) => successfulResponse(response))
          .catch( (error) => errorResponse(error))
          .finally( () => console.log('cleanup') )
  }


  function successfulResponse(response){
    console.log(response)
    // setMessage(response.data)
    setMessage(response.data.message)
  }

  function errorResponse(error){
    console.log(error)
  }

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage Your todos. <Link to="/todos">Go here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>call hello world</button>
      </div>
      <div className="text-info">{message}</div>
    </div>
  );
}

export default WelcomeComponent;
