import { apiClient } from './ApiClient'

// export function retrieveHelloWorldBean(){
//     return axios.get('http://localhost:8080/hello-world-bean')
// }

// 공통 api 클라이언트 임포트함


// 함수선언 대신, 화살표함수로 대체 
export const retrieveHelloWorldBean 
    = () => apiClient.get('/hello-world-bean')


// 만일 JWT인증에 문제가 있을떄,
// JWT를 설정하는 초기단계에 있다면 여기가 문제일수있음. (요청의 일부로서 인증토큰을 전송하려함)
//preflight 요청에 대한 응답에 엑세스제어 체크를 통과하지 못했다.(에러) => Authorization header
export const retrieveHelloWorldPathVariable
    = (username, token) => apiClient.get(`/hello-world/path-variable/${username}`
        // ,{
        // // 이 함수를 호출할때, 넣어주고 있는 토큰을 사용하지 않으려 하고,
        // // 아래의 것이 자동으로 이루어 지게 하고싶음 (인터셉트로 인해 자동으로 되는듯)
        //     // headers: {
        //     //     // 로그인할때, 인증헤더를 받은걸 변수에 입력해야함
        //     //     Authorization: token
        //     // }
        // }
    )
