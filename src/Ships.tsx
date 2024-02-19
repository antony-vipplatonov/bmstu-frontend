import { useState, useEffect, FC } from 'react'
import './Ships.css'
import {Breadcrumb} from 'react-bootstrap'
import InputField from './components/InputField.tsx'
import ShipCard from './components/ShipCard.tsx'
import { Link } from 'react-router-dom';

import { Ship, searchInShipList } from './modules/search-in-ship-list.ts'
import { useDispatch } from 'react-redux'
import { setNameSQAction, useIsLogged, useNameSearchQuery } from './slices/dataSlice.ts'



const ShipList: FC = () => {
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState(useNameSearchQuery())
  const [ships, setShips] = useState<Ship[]>([])
  const searchQuery = useNameSearchQuery()
  const [draft, setDraft] = useState<number|null>(null)
  
  const handleSearch = async () =>{
    const response = await searchInShipList(searchValue)
    await setShips(response.ships)
    await setDraft(response.draftID)
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
      <div><InputField
                error ={false}
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => dispatch(setNameSQAction(searchvalue))}
                placeHolder="Поиск"
            />
            {useIsLogged()&&(draft?<Link to={`/bmstu-frontend/applications/${draft}`} className="ml-auto rightnav">Черновик соединения</Link>:
                <p className="ml-auto">Черновик соединения</p>)}
        </div>
        <br/>
        <div className="card-deck">
              {ships.map((item)=> (
                      ShipCard(item.id, item.name, item.image_src, setDraft)
              ))}
        </div>
    </>
  )
}

export default ShipList



