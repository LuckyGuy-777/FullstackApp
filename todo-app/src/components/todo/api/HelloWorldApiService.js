import axios from 'axios'

// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

// localhost:8080 대신..
// create는 소괄호
const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)


// 함수선언 대신, 화살표함수로 대체 
export const retrieveHelloWorldBean 
    = () => apiClient.get('/hello-world-bean')


//preflight 요청에 대한 응답에 엑세스제어 체크를 통과하지 못했다.(에러) => Authorization header
export const retrieveHelloWorldPathVariable
    = (username) => apiClient.get(`/hello-world/path-variable/${username}`,{
        headers: {
            // 로그인할때, 인증헤더를 받은걸 변수에 입력해야함
            //Authorization: 'Basic aW4yOG1pbnV0ZXM6ZHVtbXk='
        }
    })