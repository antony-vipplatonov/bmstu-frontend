import { ChangeEvent, useEffect, useState } from 'react'
import './EditShip.css'
import { useNavigate, useParams } from 'react-router-dom';
import {Breadcrumb, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';
import InputField from './components/InputField';
import { useDispatch } from 'react-redux';
import { Ship, shipById } from './modules/ship-by-id';

function EditShip() {
    const navigate = useNavigate();
    const [errorImg, setErrorImg] = useState(false)
    const [error, setError] = useState(false)
    const { id } = useParams<{ id: string }>();
    const [armoring, setArmoring] = useState('')
    const [weapon, setWeapon] = useState('')
    const [year, setYear] = useState('')
    const [displacement, setDisplacement] = useState('')
    const [length, setLength] = useState('')
    const [speed, setSpeed] = useState('')
    const dispatch = useDispatch()
    const [name, setName] = useState('');


    const [ships, setShip] = useState<Ship>({id: 0, name: '', weapon: '', armoring: '',  year: 0, displacement: 0, length: 0, speed: 0,status: '', image_src: ''})

    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0]);
      }
    };

    const fetchShip = async () =>{
        const response = await shipById(id)
        setShip(response)
        return response
    }
    useEffect(()=>{
        if (id!="create"){
            const res = async()=>{ 
                const res = await fetchShip()
                setName(res.name)
                setWeapon(res.weapon)
                setArmoring(res.armoring)
                setYear(res.year.toString())
                setDisplacement(res.displacement.toString())
                setLength(res.length.toString())
                setSpeed(res.speed.toString())
            }
            res()
        }
    },[dispatch]);
    
    
    function isInteger(value:string) {
        if(parseInt(value,10).toString()===value) {
          return true
        }
        return false;
    }
    
    
    const delServHandler = async (Serv:number) =>{
        await axios.delete(`../../../api/seabattles/${Serv}/`) 
        navigate("/bmstu-frontend/moder/seabattles");
    }
    const chServ = async (idServ:number) =>{
        if (name && (isInteger(year) || year=="") && (isInteger(displacement) || displacement=="") && (isInteger(length) || length=="") && (isInteger(speed) || speed=="")) {
            
            setError(false);
            if(file){
        
        
            if ((file.type).includes("image")){
                await axios.put(`../../../api/seabattles/${idServ}/`, {
                    name:name,
                    weapon:weapon?weapon:null,
                    armoring:armoring?armoring:null,
                    year:year?year:null,
                    displacement:displacement?displacement:null,
                    length:length?length:null,
                    speed:speed?speed:null
            })
                setErrorImg(false);
                const formData = new FormData();
                formData.append('image', file)
                await axios.put(`../../../api/seabattles/${idServ}/addImg/`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                fetchShip();
        }
        else{
            setErrorImg(true);
        }
    }else{
        await axios.put(`../../../api/seabattles/${idServ}/`, {
            name:name,
            weapon:weapon?weapon:null,
            armoring:armoring?armoring:null,
            year:year?year:null,
            displacement:displacement?displacement:null,
            length:length?length:null,
            speed:speed?speed:null
    })
    }
        
    } else{
        setError(true);
        if(file){
            if (!(file.type).includes("image")){
                setErrorImg(true);
            }
        else{
            setErrorImg(false);
        }}else{
            setErrorImg(false);
        }
    }
}
    const createServ = async () =>{
        if (name && (isInteger(year) || year=="") && (isInteger(displacement) || displacement=="") && (isInteger(length) || length=="") && (isInteger(speed) || speed=="")) {
            
            setError(false);
            if(file){
        
        
            if ((file.type).includes("image")){
                const idServ = await axios.post(`../../../api/seabattles/`, {
                    name:name,
                    weapon:weapon?weapon:null,
                    armoring:armoring?armoring:null,
                    year:year?year:null,
                    displacement:displacement?displacement:null,
                    length:length?length:null,
                    speed:speed?speed:null
            }).then(response=>response.data.id)
                setErrorImg(false);
                const formData = new FormData();
                formData.append('image', file)
                await axios.put(`../../../api/seabattles/${idServ}/addImg/`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                })
                navigate("/bmstu-frontend/moder/seabattles");
        }
        else{
            setErrorImg(true);
        }
    }else{
        await axios.post(`../../../api/seabattles/`, {
            name:name,
            weapon:weapon?weapon:null,
            armoring:armoring?armoring:null,
            year:year?year:null,
            displacement:displacement?displacement:null,
            length:length?length:null,
            speed:speed?speed:null
    })
    navigate("/bmstu-frontend/moder/seabattles");
    }
        
    } else{
        setError(true);
        if(file){
            if (!(file.type).includes("image")){
                setErrorImg(true);
            }
        else{
            setErrorImg(false);
        }}else{
            setErrorImg(false);
        }
    }
    }


  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="/bmstu-frontend/">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/bmstu-frontend/moder/seabattles">Редактирование кораблей</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        {(id=="create")?"Создание":id}
        </Breadcrumb.Item>
    </Breadcrumb>
    <div className="page">
    <div className='shipFields'>
        {Boolean(ships.id) && <div className='field id'>id: {ships.id}</div>}
        <div className='field name'>Название: <InputField
                                error={false}
                                value={name}
                                searchvalue={name}
                                setValue={(value) => setName(value)}
                                onEnter={(value) => setName(value)}
                                placeHolder="введите название"
                            /></div>
        <div className='field type'>Вооружение корабля: <InputField
                                error={false}
                                value={weapon}
                                searchvalue={weapon}
                                setValue={(value) => setWeapon(value)}
                                onEnter={(value) => setWeapon(value)}
                                placeHolder="введите вооружение корабля"
                            /></div>
        <div className='field type'>Бронирование корабля: <InputField
                                error={false}
                                value={armoring}
                                searchvalue={armoring}
                                setValue={(value) => setArmoring(value)}
                                onEnter={(value) => setArmoring(value)}
                                placeHolder="введите бронирование корабля"
                            /></div>
        <div className='field type'>Год ввода в строй: <InputField
                                error={false}
                                value={year}
                                searchvalue={year}
                                setValue={(value) => setYear(value)}
                                onEnter={(value) => setYear(value)}
                                placeHolder="введите год ввода в строй"
                            /></div>
        <div className='field type'>Водоизмещение(в тоннах): <InputField
                                error={false}
                                value={displacement}
                                searchvalue={displacement}
                                setValue={(value) => setDisplacement(value)}
                                onEnter={(value) => setDisplacement(value)}
                                placeHolder="введите водоизмещение(в тоннах)"
                            /></div>
        <div className='field type'>Длина корпуса(в метрах): <InputField
                                error={false}
                                value={length}
                                searchvalue={length}
                                setValue={(value) => setLength(value)}
                                onEnter={(value) => setLength(value)}
                                placeHolder="введите длину корпуса(в метрах)"
                            /></div>
        <div className='field type'>Скорость хода(в узлах): <InputField
                                error={false}
                                value={speed}
                                searchvalue={speed}
                                setValue={(value) => setSpeed(value)}
                                onEnter={(value) => setSpeed(value)}
                                placeHolder="введите скорость хода(в узлах)"
                            /></div>
        {Boolean(ships.id) && <div className='field'>Архивное фото: {ships.image_src?<img className="image" src={ships.image_src}></img>: "архивное фото не выбрано"}</div>}
        <div className='chImage'><div className='field'>{Boolean(ships.id) ? 'Новое архивное фото:':"Архивное фото:"}<input className='form-control' type="file" onChange={handleFileChange} /></div></div>
        </div>
        {(id=="create")?<Button className='form1' onClick={()=>createServ()}>Создать</Button>:(ships.status != "удалён")&&<><Button className='form1' onClick={()=>chServ(ships.id)}>Сохранить изменения</Button><Button className='form1 del' onClick={()=>delServHandler(ships.id)}>Удалить</Button></>}
        {error && <div className="error-message1">*Имя не может быть пустым, а поля "год ввода в строй", "водоизмещение", "длина корпуса", "скорость хода" должны быть числовыми</div>}
        {errorImg && <div className="error-message1">*Тип файла не подходит</div>}
        </div>
    
    </>
  )
}

export default EditShip


