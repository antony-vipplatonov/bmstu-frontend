import { useState, useEffect, FC } from 'react'
import './Ships.css'
import {Breadcrumb} from 'react-bootstrap'
import InputField from './components/InputField.tsx'
import ShipCard from './components/ShipCard.tsx'
import { Link } from 'react-router-dom';

import { Ship, searchInShipList } from './modules/search-in-ship-list.ts'



const ShipList: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [ships, setShips] = useState<Ship[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  const handleSearch = async () =>{
    const response = await searchInShipList(searchValue)
    await setShips(response.ships)
}
useEffect(()=>{
  handleSearch();
},[])


useEffect(() => {
  handleSearch();
  }, [searchQuery]);



  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item><Link to="/bmstu-frontend/">Главная</Link></Breadcrumb.Item>
      <Breadcrumb.Item active>Архив</Breadcrumb.Item>
    </Breadcrumb>
      <InputField
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => setSearchQuery(searchvalue)}
            />
        <br/>
        <div className="card-deck">
              {ships.map((item)=> (
                      <ShipCard {...item} />
              ))}
        </div>
    </>
  )
}

export default ShipList



