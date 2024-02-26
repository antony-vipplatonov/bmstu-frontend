import { useState, useEffect, FC } from 'react'
import './ModerCompaundList.css'
import {Breadcrumb, Button, Table} from 'react-bootstrap'
import InputField from './components/InputField.tsx'

import { Ship, searchInShipList } from './modules/search-in-ship-list.ts'
import {setNameSQModerAction, useNameSearchQueryModer} from "./slices/dataSlice.ts";
import {useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom'




const ModerShipList: FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState(useNameSearchQueryModer())
  const [ships, setShips] = useState<Ship[]>([])
  const searchQuery = useNameSearchQueryModer()
  const navigate = useNavigate();


  const handleSearch = async () =>{
    const response = await searchInShipList(searchValue)
    await setShips(response.ships)
}



useEffect(() => {
  handleSearch();
  }, [searchQuery]);



  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item href="/bmstu-frontend/">Главная</Breadcrumb.Item>
      <Breadcrumb.Item active>Редактрование кораблей</Breadcrumb.Item>
    </Breadcrumb>
    <div className='topBar'>
      <div className='inputField'><InputField
                error ={false}
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => dispatch(setNameSQModerAction(searchvalue))}
                placeHolder="Поиск"
            /></div><Button className='createBtn' onClick={()=>navigate(`/bmstu-frontend/moder/seabattles/create`)}>Создать</Button>
            </div>
        <br/>
        <div className="table2">
        <Table className="w-100" responsive="sm">
            <thead>
            <tr>
                <th><div className='idField'>ID</div></th>
                <th>Название</th>
                <th>Год ввода в строй</th>
                <th className='shipImgCell'>Архивное фото</th>
            </tr>
            </thead>
            <tbody>
            {ships.map((item)=> (
                        <><tr  onClick={()=>navigate(`/bmstu-frontend/moder/seabattles/${item.id}`)}> 
                            <td><p className="idField">{item.id}</p></td>
                            <td>{item.name}</td>
                            <td>{item.year}</td>
                            <td className='shipImgCell'><img className='shipImg' src={item.image_src || 'https://dostavka.phali-hinkali.ru/murino/api2/images/placeholder_1000x.jpg'}></img></td>
                            </tr></>
                ))}
            </tbody>
        </Table>
        </div>
    </>
  )
}

export default ModerShipList



