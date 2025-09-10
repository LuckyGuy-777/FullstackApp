import axios from "axios"

// 모든요청에서, 사용할 공통API 클라이언트
// 다른 파일에서, 임포트해서 사용함

// localhost:8080 대신..
// create는 소괄호
// 아래 구문으로 백엔드 기본주소를 받아옴
export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)