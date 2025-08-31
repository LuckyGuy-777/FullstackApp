import { useEffect, useState } from "react";
import { deleteTodoApi, retrieveAllTodosForUsernameApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

function ListTodosComponent() {
  const today = new Date();

  const authContext = useAuth();

  const username = authContext.username

  const navigate = useNavigate()

  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(), // ✅ 월
    today.getDate() // ✅ 날짜
  );

  const [todos, setTodos] = useState([])

  const [message, setMessage] = useState(null)

  // const todos = [
  //   // { id: 1, description: "Learn AWS", done: false, targetDate: targetDate },
  //   // {
  //   //   id: 2,
  //   //   description: "Learn Full Stack Dev",
  //   //   done: false,
  //   //   targetDate: targetDate,
  //   // },
  //   // { id: 3, description: "Learn DevOps", done: false, targetDate: targetDate },
  // ];

  // useEffect는 함수호출이니까 ()를써야함. {}는 코드블록
  useEffect (
    () => refreshTodos(),[]
  )
  
  function refreshTodos(){
    retrieveAllTodosForUsernameApi(username)
      .then(response => {
        //console.log(response.data)
        setTodos(response.data)
      } 
    
    )
      .catch(error => console.log(error))
  }
  
  function deleteTodo(id){
    console.log('clicked' + id)
    deleteTodoApi(username, id)
    .then(
      () => {
        setMessage(`Delete of todo with id = ${id} successful`)
        refreshTodos()
      }

      // 1. 삭제성공 메세지
      // 2. 업데이트 todo list
    )
    .catch(error => console.log(error))
  }

  function updateTodo(id){
    console.log('clicked' + id)
    navigate(`/todo/${id}`)
  }

   function addNewTodo(){
    navigate(`/todo/-1`)
  }

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}


      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>is Done?</th>
              <th>Target Date</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.description}</td>
                <td>{todo.done.toString()}</td>
                {/* <td>{todo.targetDate.toDateString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td><button className="btn btn-warning"
                           onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                <td><button className="btn btn-success"
                          onClick={() => updateTodo(todo.id)}>Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
    </div>
  );
}

export default ListTodosComponent;
