import './registrationPage.css'
import { registr } from './modules/registration.ts'
import { useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkName } from './modules/checkName.ts';
import { login } from './modules/login.ts';
import { chLogAction, setUsernameAction } from './slices/dataSlice.ts';



function RegistrationPage() {
  const [nameValue, setNameValue] = useState<string | null>(null);
  const [phoneValue, setPhoneValue] = useState<string | null>(null);
  const [passwordValue, setPasswordValue] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState<string | null>(null);
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const SubmitReg = async () =>{
    const response = await registr(nameValue, emailValue, phoneValue, passwordValue)
    if (response.status == "error"){
      setError(true)
    }
    else {
      await login(nameValue, passwordValue)
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
          <h3 className="Auth-form-title">Регистрация</h3>
          <div className="form-group mt-3">
            <label>Имя пользователя*</label>
            <input
              type="text"
              name="name"
              className="form-control mt-1"
              placeholder="Введите имя пользователя"

              onChange={(event => setNameValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control mt-1"
              placeholder="Введите email"

              onChange={(event => setEmailValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Номер телефона</label>
            <input
              name="phone"
              type="tel"
              className="form-control mt-1"
              placeholder="Введите номер телефона"

              onChange={(event => setPhoneValue(event.target.value))}
            />
          </div>
          <div className="form-group mt-3">
            <label>Пароль*</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Введите пароль"

              onChange={(event => setPasswordValue(event.target.value))}
            />
          </div>
          <p className="pReg">Поля отмеченные * обязательны для заполнения</p>
          {error && <div className="error-message">*Имя пользователя, email или номер телефона уже заняты или не введены обязательные поля</div>}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={()=>SubmitReg()}>
              Подтвердить
            </button>
          </div>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default RegistrationPage
