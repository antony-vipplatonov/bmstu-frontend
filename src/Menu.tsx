import { Button } from "react-bootstrap";
import "./Menu.css"
import { Link } from 'react-router-dom';



function MenuPage() {    


  return ( 
    <>
    <div className="bodyimg">
    <h2 className="h2Ship">Цель проекта - предоставить систему для внесения информации о соединениях кораблей, участвовавших на Тихоокеанском театре военных действий, при помощи интерактивных инструментов</h2>
    <Button className="buttonMenu"><Link to="/bmstu-frontend/seabattles" className="textButton">Архив</Link></Button> 
    </div>
    </>
  )
}

export default MenuPage
