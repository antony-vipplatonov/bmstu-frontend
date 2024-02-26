import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { chLogAction, chModerAction, setUsernameAction, useIsLogged, useIsModer, useUsername } from '../slices/dataSlice';
import { useEffect } from 'react';
import { checkName } from '../modules/checkName';
import { useDispatch } from 'react-redux';
import { logout } from '../modules/logout'
import { searchInShipList } from '../modules/search-in-ship-list';
import Cookies from 'js-cookie';

function NavBar() {
  const username = useUsername()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const authCheck = async () =>{
    const userInfo = await checkName()
    const name = userInfo? userInfo.username: ""
    console.log(name)
    const isStaff = userInfo.is_staff
    dispatch(setUsernameAction(name));
    if (name != ""){
      dispatch(chLogAction(true));
    }
    if (isStaff){
      dispatch(chModerAction(true));
    }
    const prom = await searchInShipList()
    prom
}
  
const SubmitLogout = async () =>{
  await logout();
  dispatch(chLogAction(false));
  dispatch(chModerAction(false));
  Cookies.remove("session_id")
  navigate("/bmstu-frontend/seabattles");
  }
  


  useEffect(() => {
    authCheck()
    
    }, []);
  

  return (
    <Navbar className="navbar-light navbar-expand" expand="lg">
      <Container fluid className="new flex-column" style={{width:"100%"}}>
        <Navbar.Brand as={Link} to="/bmstu-frontend/" className="brand text-center" style={{fontSize:"2em"}}><div className="gText gTitle">Морские сражения на Тихом океане</div></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100 d-flex justify-content-center ">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/bmstu-frontend/" className="li mx-3" style={{flex:"1"}}><div className="gText">Главная</div></Nav.Link>
            <Nav.Link as={Link} to="/bmstu-frontend/seabattles" className="li mx-3" style={{flex:"1"}}><div className="gText">Архив</div></Nav.Link>
            {useIsLogged() && <><Nav.Link as={Link} to="/bmstu-frontend/applications" className="li mx-3 left" style={{flex:"1"}}><div className="gText">Соединения</div></Nav.Link></>}
            {useIsModer() && <><Nav.Link as={Link} to="/bmstu-frontend/moder/seabattles" className="li mx-3 left"><div className="gText">Редактирование кораблей</div></Nav.Link></>}
          </Nav>
          <Nav className="d-flex me-2">
            <>
            
            {
              useIsLogged()?(
                <Nav.Link onClick={()=>SubmitLogout()} className="ml-auto  rightnav"><div className="gText">({username}) Выйти</div></Nav.Link>
                ): <><Nav.Link as={Link} to="/bmstu-frontend/auth/reg" className="ml-auto rightnav"><div className="gText">Регистрация</div></Nav.Link>
                <Nav.Link as={Link} to="/bmstu-frontend/auth" className="ml-auto rightnav"><div className="gText">Войти</div></Nav.Link></>
            }</></Nav>
        </Navbar.Collapse>
      </Container>
</Navbar>
  );
}

export default NavBar;