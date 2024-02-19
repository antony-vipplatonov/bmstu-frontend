import { useEffect, useState } from 'react'
import './draftAppl.css'
import { useNavigate, useParams } from 'react-router-dom';
import {Breadcrumb, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { applShip, application } from './modules/applications';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import InputField from './components/InputField';

function DraftAppl() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [nam, setName] = useState('')
    const [admiralnam, setAdmiralName] = useState('')
    const [countr, setCountry] = useState('')
    const [victor, setVictory] = useState('')
    const [battledat, setBattledate] = useState('')


    const [cap, setCaptain] = useState(new Map());

    const [applic, setApplication] = useState<applShip>({Application:{id:0, name: null, admiralname: null, country: null, victory: null, creatorname:null, moderatorname:null, status:'',
    datacreate:null, dataform:null, dataend:null, battledate:null}, Ships:[]})

    const getAppl = async () =>{
        const response = await application(id)
        if (response.Ships.length == 0){
            await axios.delete(`../../api/applications/delete/`)
            navigate("/bmstu-frontend/seabattles");
        }

        setName(response.Application.name || "")
        setAdmiralName(response.Application.admiralname || "")
        setCountry(response.Application.country || "")
        setVictory(response.Application.victory || "")
        setBattledate(response.Application.battledate || "")
        await response.Ships.map((item)=>setCaptain(new Map(cap.set(item.id,{value:(item.captain || ""),error:false}))))
        await setApplication(response)
    }
    useEffect(() => {
        getAppl();
        }, []);
    
    
    
    const delFromApplHandler = async (Appl:string, Serv:string) =>{
        /*setApplication({Application:{id:0, name: null, admiralname: null, country: null, victory: null, creatorname:null, moderatorname:null, status:'',
        datacreate:null, dataform:null, dataend:null, battledate:null}, Ships:[]})
        setCaptain(new Map());*/
        await axios.delete(`../../api/applications/${Appl}/${Serv}/`)
        await getAppl();
        
    }
    const formAppl = async () =>{
        await axios.put(`../../api/applications/form/`)
        axios.post(`../../async/calculate_losses`, {id:applic.Application.id, quantity: applic.Ships.length})
        navigate("/bmstu-frontend/seabattles");
        
    }

    const updateName = async (value:string, id:string) =>{
        await axios.put(`../../api/applications/${id}/`,{
            name:value
        })
    }
    const updateAdmiralName = async (value:string, id:string) =>{
        await axios.put(`../../api/applications/${id}/`,{
            admiralname:value
        })
    }
    const updateCountry = async (value:string, id:string) =>{
        await axios.put(`../../api/applications/${id}/`,{
            country:value
        })
    }
    const updateVictory = async (value:string, id:string) =>{
        await axios.put(`../../api/applications/${id}/`,{
            victory:value
        })
    }
    const updateBattledate = async (value:string, id:string) =>{
        await axios.put(`../../api/applications/${id}/`,{
            battledate:value
        })
    }
    const updateCaptain = async (idAppl:string, idServ:string, value:string) =>{
        await axios.put(`../../api/applications/${idAppl}/${idServ}/`,{
            captain:value
        })
        }
        
    


  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="/bmstu-frontend/">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/bmstu-frontend/applications">Соединения</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        {id}
        </Breadcrumb.Item>
    </Breadcrumb>
    <div className="fields">
    <div className='nonTable'>
        <div className='field id'>id: {applic.Application.id}</div>
        <div className='field status'>статус: {applic.Application.status}</div>
        <div className='field creator'>Создатель: {applic.Application.creatorname?applic.Application.creatorname:'-'}</div>
        <div className='field date_of_creation'>Дата создания: {applic.Application.datacreate? applic.Application.datacreate.slice(0,19).replace('T', " "): "-"}</div>
        <div className='field date_of_formation'>Дата формирования: {applic.Application.dataform? applic.Application.dataform.slice(0,19).replace('T', " "): "-"}</div>
        <div className='field date_of_completion'>Дата завершения: {applic.Application.dataend? applic.Application.dataend.slice(0,19).replace('T', " "): "-"}</div>
        <div className="name">
        {applic.Application.status=="черновик"?<div className='field description'><InputField
                                error={false}
                                value={nam}
                                searchvalue={nam}
                                setValue={(value) => setName(value)}
                                onEnter={(value) => updateName(value, applic.Application.id+'')}
                                placeHolder="Название соединения"
                            /></div>:<div className='field description'>Название соединения: {applic.Application.name || "-"}</div>}
        </div>
        <div className="admiralname">
        {applic.Application.status=="черновик"?<div className='field description'><InputField
                                error={false}
                                value={admiralnam}
                                searchvalue={admiralnam}
                                setValue={(value) => setAdmiralName(value)}
                                onEnter={(value) => updateAdmiralName(value, applic.Application.id+'')}
                                placeHolder="Фамилия адмирала"
                            /></div>:<div className='field description'>Фамилия адмирала: {applic.Application.admiralname || "-"}</div>}
        </div>
        <div className="country">
        {applic.Application.status=="черновик"?<div className='field description'><InputField
                                error={false}
                                value={countr}
                                searchvalue={countr}
                                setValue={(value) => setCountry(value)}
                                onEnter={(value) => updateCountry(value, applic.Application.id+'')}
                                placeHolder="Страна"
                            /></div>:<div className='field description'>Страна: {applic.Application.country || "-"}</div>}
        </div>
        <div className="victory">
        {applic.Application.status=="черновик"?<div className='field description'><InputField
                                error={false}
                                value={victor}
                                searchvalue={victor}
                                setValue={(value) => setVictory(value)}
                                onEnter={(value) => updateVictory(value, applic.Application.id+'')}
                                placeHolder="Победа"
                            /></div>:<div className='field description'>Победа: {applic.Application.victory || "-"}</div>}
        </div>
        <div className="battledate">
        {applic.Application.status=="черновик"?<div className='field description'><InputField
                                error={false}
                                value={battledat}
                                searchvalue={battledat}
                                setValue={(value) => setBattledate(value)}
                                onEnter={(value) => updateBattledate(value, applic.Application.id+'')}
                                placeHolder="Дата сражения"
                            /></div>:<div className='field description'>Дата сражения: {applic.Application.battledate || "-"}</div>}
        </div>
        </div>
        <div className='table1'>
        <Table className='w-100' responsive="sm">
        <thead>
          <tr>
            <th><div className='idField'>ID</div></th>
            <th style={{width:"20%"}}>Название</th>
            <th>Капитан</th>
            {(applic.Application.status=="черновик")?<th  style={{width:"28%"}}>Удалить из соединения</th>:<th>Потери</th>}
          </tr>
        </thead>
        <tbody>
        {applic.Ships.map((item)=> (
            <><tr> 
            <td><Link className='link' to={`/bmstu-frontend/seabattles/${item.id}`}><p className='idField'>{item.id}</p></Link></td>
            <td onClick={()=>navigate(`/bmstu-frontend/seabattles/${item.id}`)}>{item.name}</td>
            {applic.Application.status=="черновик"?<td><InputField
                                error={cap.get(item.id).error}
                                value={cap.get(item.id).value}
                                searchvalue={''}
                                setValue={(value) => setCaptain(new Map(cap.set(item.id,{value:value,error:false})))}
                                onEnter={(value) => updateCaptain(applic.Application.id+'', item.id+'', value)}
                                placeHolder=""
                            /></td>:
                        <td onClick={()=>navigate(`/bmstu-frontend/seabattles/${item.id}`)}>{item.captain}</td>
                        }
                         {(applic.Application.status=="черновик")?<td><Button onClick={()=>delFromApplHandler(applic.Application.id+'', item.id+'')} className='delFromAppl'>Удалить из соединения</Button></td>: <td><Link className='link' to={`/bmstu-frontend/seabattles/${item.id}`}><p className='idField'>{item.losses}</p></Link></td>}
                      </tr></>
              ))}
          </tbody>
      </Table>
      </div>

        
        {(applic.Application.status=="черновик")&&<Button className='form1' onClick={()=>formAppl()}>Сформировать</Button>}
        </div>
    
    </>
  )
}

export default DraftAppl


