import axios from 'axios'

// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

// localhost:8080 대신..
// create는 소괄호
// 아래 구문으로 백엔드 기본주소를 받아옴
const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)


// // 함수선언 대신, 화살표함수로 대체 
// export const retrieveHelloWorldBean 
//     = () => apiClient.get('/hello-world-bean')

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
   