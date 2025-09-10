import { apiClient } from './ApiClient'

// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }




// // 함수선언 대신, 화살표함수로 대체 
// export const retrieveHelloWorldBean 
//     = () => apiClient.get('/hello-world-bean')

// API호출을 할때마다 인증을 위해서 토큰을 전송하려고함
// 어떻게 하면 그걸 일반화 시킬까? 토큰을 공통적으로 적용시키는 방법은?

export const retrieveAllTodosForUsernameApi
    = (username) => apiClient.get(`/users/${username}/todos`)
   

export const deleteTodoApi
    = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`)


export const retrieveTodoApi
    = (username, id) => apiClient.get(`/users/${username}/todos/${id}`)
   

export const updateTodoApi
    = (username, id,todo) => apiClient.put(`/users/${username}/todos/${id}`,todo)
   
export const createTodoApi
    = (username,todo) => apiClient.post(`/users/${username}/todos`, todo)
   