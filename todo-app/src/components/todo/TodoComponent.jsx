import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Field, Formik,Form, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent(){

    const {id} = useParams()

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()

    const username = authContext.username

    // Todo 페이지를 로딩할때, retrieveTodos()를 호출
    // 파라미터로 id값을 줌
    useEffect(
        () => retrieveTodos(),
        [id]
    )
    // 이 함수로 값을 받고 있고, 그 값을 Description,TargetDate에 설정함
    function retrieveTodos(){

        if(id != -1){
            retrieveTodoApi(username, id)
            .then(response =>{
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
     

    }
    // 제출한 값 콘솔에 띄우기
    function onsubmit(values){
        console.log(values)
        // update에 넣어줄 내용
        const todo = {
            id: id,
            username : username,
            description : values.description,
            targetDate : values.targetDate,
            done:false
        }

        console.log(todo)
        if(id==-1){
            createTodoApi(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        } else{
            // update에 넣어줄 파라미터들
            // 성공적으로 응답을 받으면, navigate() 로 인해,
            // ./todos 로 이동
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
      
    }
    // 양식 검증 함수
    // 오류가 있으면 onsubmit이 작동안하게함
    // 에러 필드에 있는 값의 문자열이 에러시에 표시됨
    // moment는, 프레임워크. 여기선, targetDate가 유효한지 검증에 사용
    // 사용하려면, 관련 의존성을 추가해 줘야한다고 함.
    function validate(values){
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid targetDate'
        }

        // 디스크립션 검증
        if(values.description.length<5)
            errors.description = 'Enter atleast 5 characters'

        // 타겟 데이트 검증
        if(values.targetDate == null || values.targetDate=='' || !moment(values.targetDate).isValid())
            errors.targetDate = 'Enter a targetDate'

        console.log(values)
        return errors
    }

// Formik, Form, moment 는, 양식 관련 라이브러리. 양식을 간단하게 처리가능 
// Formik으로, onChange 핸들러를 대신할수 있음
// enableReinitialize 는 양식 재설정 초기화
// initialValues 는 초기값 표현
// 양식에 설정되있는 값 띄우는 작업.
// m-n 은 위아래 칸을 띄우는거 같음. 
// validateOnChange = {false} 와
//  validateOnBlur = {false} 은, 양식제출시에만 검증 하도록 하게함
// ErrorMessage 로 에러메세지를 띄워줌
    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                 
                <Formik initialValues={ {description, targetDate} }
                    enableReinitialize={true}
                    onSubmit={onsubmit}
                    validate={validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                              name = "description"
                              component="div"
                              className="alert alert-warning"
                            />
                            <ErrorMessage
                              name = "targetDate"
                              component="div"
                              className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type="text" className="form-control" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate" />
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-5" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>
        </div>
    )
}