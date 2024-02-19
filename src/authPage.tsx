import './authPage.css'
import { login } from './modules/login.ts'
import { useState } from 'react'
import { chLogAction, setUsernameAction } from './slices/dataSlice.ts'
import { useNavigate } from 'react-router-dom'
import { checkName } from './modules/checkName.ts'
import { useDispatch } from 'react-redux'


function AuthPage() {
  const [nameValue, setNameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const SubmitLog = async () =>{
    const response = await login(nameValue, passwordValue)
    if (response.status == "error"){
      setError(true)
    }
    else {
      
      dispatch(chLogAction());
      dispatch(setUsernameAction(await checkName()));
      navigate("/bmstu-frontend/seabattles");
    }
    
  }



  return ( 
    <>
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Вход</h3>
          <div className="form-group mt-3">
            <label>Имя пользователя</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Введите имя пользователя"
              onChange={(event => setNameValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Пароль</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Введите пароль"
              onChange={(event => setPasswordValue(event.target.value))}
            />
          </div>
          {error && <div className="error-message">*Неверное имя пользователя или пароль</div>}
          <div className="d-grid gap-2 mt-3">
            <button  onClick={()=>SubmitLog()} className="btn btn-primary">
              Подтвердить
            </button>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default AuthPage
