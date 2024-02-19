import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './ShipCard.css'
import axios from 'axios';
import {searchInShipList } from '../modules/search-in-ship-list.ts'



function ShipCard( id: number, name: string, image_src: any, func: any ){
    const addHandler = async (id:number) =>{
        axios.post(`../../api/seabattles/${id}/addToAppl/`)
        const response = await searchInShipList()
        func(response.draftID)
    }
    return (
    <Card className = "d-inline-block">
        <Card.Img className="card-img-top" src={image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'} alt = {name} />
        <Card.Body>                
            <div className="card-title">
                <Card.Title><div className="gText">{name}</div></Card.Title>
            </div>
            <div className = "execBtn">
            <Link className="link" to={`/bmstu-frontend/seabattles/${id}`}><Button className="cardButton" variant="primary"><div className="buttonShip">Перейти на страницу описания корабля</div></Button></Link>
                <a className = "add" onClick={()=>addHandler(id)}>
                    <img src="http://localhost:9000/images/bucket/bucket.png" alt="Добавить в корзину" height = "33rem"/>
                </a>
            </div>
        </Card.Body>
    </Card>
)}
   
export default ShipCard;