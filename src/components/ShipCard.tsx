import { FC } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './ShipCard.css'

interface Props {
    id: number
    name: string
    weapon: string
    armoring: string
    year: number
    displacement: number
    length: number
    speed: number
    status: string
    image_src: string
}

const ShipCard: FC<Props> = ({ id, name, image_src }) => (
    <Card className = "d-inline-block">
        <Card.Img className="card-img-top" src={image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'} alt = {name} />
        <Card.Body>                
            <div className="card-title">
                <Card.Title><div className="gText">{name}</div></Card.Title>
            </div>
            <div className = "execBtn">
            <Link className="link" to={`/bmstu-frontend/seabattles/${id}`}><Button className="cardButton" variant="primary"><div className="buttonShip">Перейти на страницу описания корабля</div></Button></Link>
                <a className = "add" href='#'>
                    <img src="https://pic.onlinewebfonts.com/svg/img_140864.png" alt="Добавить в корзину" height = "33rem"/>
                </a>
            </div>
        </Card.Body>
    </Card>
)
   
export default ShipCard;