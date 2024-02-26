import { useEffect, useRef, useState } from 'react'
import './applList.css'
import { useNavigate } from 'react-router-dom';
import {Breadcrumb, Button, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appls, applications } from './modules/applications';
import { delDateFromAction, delDateToAction, delStatusAction, setDateFromAction, setDateToAction, setStatusAction, setUsernameSQAction, useCompaundDateFromSearchQuery, useCompaundDateToSearchQuery, useCompaundStatusSearchQuery, useIsModer, useUsernameSearchQuery } from './slices/dataSlice';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import InputField from './components/InputField';

function ApplList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dateFrom = useCompaundDateFromSearchQuery()
    const dateTo = useCompaundDateToSearchQuery()
    const isModer = useIsModer();
    const [inputType, setInputType] = useState("text");
    const [inputTypeF, setInputTypeF] = useState("text");
    const [application, setApplications] = useState<appls[]>([])
    const searchStatusValueRef = useRef(useCompaundStatusSearchQuery());
    const [searchStatusValue, setSearchStatusValue] = useState(useCompaundStatusSearchQuery())
    const searchDateToValueRef = useRef(useCompaundDateToSearchQuery());
    const [searchDateFromValue, setSearchDateFromValue] = useState(useCompaundDateFromSearchQuery())
    const searchQueryRef = useRef(useUsernameSearchQuery());
    const [searchDateToValue, setSearchDateToValue] = useState(useCompaundDateToSearchQuery())
    const [searchValue, setSearchValue] = useState(useUsernameSearchQuery())
    const searchQuery = useUsernameSearchQuery()
    const searchDateFromValueRef = useRef(useCompaundDateFromSearchQuery());
    const handleSearch = async () =>{
        const response = await applications(searchStatusValueRef.current, searchDateFromValueRef.current, searchDateToValueRef.current)
        const res = response.filter(({
          creatorname
        }) => creatorname?creatorname.includes(searchQueryRef.current):1);
        await setApplications(res)
    }
    useEffect(() => {
      handleSearch();
      searchStatusValueRef.current = searchStatusValue;
      searchDateFromValueRef.current = searchDateFromValue;
      searchDateToValueRef.current = searchDateToValue;
      searchQueryRef.current = searchQuery;
      }, [searchStatusValue, searchDateFromValue, searchDateToValue, searchQuery]);

      function statusHandler(value: string){
        setSearchStatusValue(value);
        dispatch(setStatusAction(value));
        }
    function dateFromHandler(value: string){
        if (value==''){
            dispatch(delDateFromAction());
            setSearchDateFromValue('0001-01-01');
        }
        else{
            dispatch(setDateFromAction(value));
            setSearchDateFromValue(value);
        }
        
        }
    function dateToHandler(value: string){
        if (value==''){
            dispatch(delDateToAction());
            setSearchDateToValue('9999-12-01');
        }
        else{
            dispatch(setDateToAction(value));
            setSearchDateToValue(value);
        }
        
        }
    function clearHandler(){
        setSearchStatusValue('');
        dispatch(delStatusAction());
        dispatch(delDateToAction());
        dispatch(setUsernameSQAction(''));
        setSearchValue('')
        setSearchDateToValue('9999-12-01');
        dispatch(delDateFromAction());
        setSearchDateFromValue('0001-01-01');
    }
    const chStatus = async (id:number, value:string) =>{
      await axios.put(`../../api/applications/${id}/chstatus/?status=${value}`)
    }
      useEffect(() => {
        const fetchData = () => {
          handleSearch();
        };
    
        const pollingInterval = setInterval(fetchData, 1000); 
    
        fetchData(); // сделать первый запрос сразу
    
        return () => clearInterval(pollingInterval); // очистить интервал при размонтировании компонента
      }, [dispatch]);


  return ( 
    <>
    <Breadcrumb>
        <Breadcrumb.Item><Link to="/bmstu-frontend">Главная</Link></Breadcrumb.Item>
        <Breadcrumb.Item active>
        Соединения
        </Breadcrumb.Item>
    </Breadcrumb>
    <div className="filters">
    <DropdownButton id="dropdown-basic-button status" title={useCompaundStatusSearchQuery()}>
      <Dropdown.Item onClick={()=>statusHandler("сформирован")}>Сформирован</Dropdown.Item>
      <Dropdown.Item onClick={()=>statusHandler("отменён")}>Отменён</Dropdown.Item>
      <Dropdown.Item onClick={()=>statusHandler("завершён")}>Завершён</Dropdown.Item>
    </DropdownButton>
    
                <div className="dateFrom">
                <Form>
                {(useCompaundDateFromSearchQuery()!='0001-01-01')?
                    <Form.Control
                    type={inputTypeF}
                    placeholder="После"
                    onFocus={() => setInputTypeF("date")}
                    onBlur={() => setInputTypeF("text")}
                    onChange={(e) => dateFromHandler(e.target.value)}
                    defaultValue={dateFrom}
                    />:
                    <Form.Control
                    value=''
                    type={inputTypeF}
                    placeholder="После"
                    onFocus={() => setInputTypeF("date")}
                    onBlur={() => setInputTypeF("text")}
                    onChange={(e) => dateFromHandler(e.target.value)}
                    />}
                </Form>
                </div>
                <div className="dateTo">
                <Form>
                {(useCompaundDateToSearchQuery()!='9999-12-01')?
                    <Form.Control
                    type={inputType}
                    placeholder="До"
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                    onChange={(e) => dateToHandler(e.target.value)}
                    defaultValue={dateTo}
                    />:
                    <Form.Control
                    value=''
                    type={inputType}
                    placeholder="До"
                    onFocus={() => setInputType("date")}
                    onBlur={() => setInputType("text")}
                    onChange={(e) => dateToHandler(e.target.value)}
                    />}
                </Form>
                </div>
                {isModer &&<div className='usernameSearch'>
                <InputField
                error ={false}
                value={searchValue}
                searchvalue={searchQuery}
                setValue={(value) => setSearchValue(value)}
                onEnter={(searchvalue) => dispatch(setUsernameSQAction(searchvalue))}
                placeHolder="Создатель"
            />
                </div>}

                <Button onClick={()=>clearHandler()} className='clear'>Сбросить фильтры</Button>
        </div>
    <div className="table2">
    <Table className="w-100" responsive="sm">
        <thead>
          <tr>
            <th><div className='idField'>ID</div></th>
            <th>Статус</th>
            <th>Создатель</th>
            <th >Дата создания</th>
            <th >Дата формирования</th>
            <th >Дата завершения</th>
            <th>Название соединения</th>
            {isModer && <th style={{width:"7em"}}>Одобрение</th>}
          </tr>
        </thead>
        <tbody>
        {application.map((item)=> (
                      <><tr> 
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)}><Link className='link' to={`/bmstu-frontend/applications/${item.id}`}><p className="idField">{item.id}</p></Link></td>
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)}><img src={item.status == "завершён"?`data:image/svg+xml,%3Csvg width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E  %3Cpath d%3D%22M3 23.5V2.5C3 1.67157 3.67157 1 4.5 1V1C5.32843 1 6 1.67157 6 2.5V23.5%22 stroke%3D%22%232DC36A%22 stroke-width%3D%221.5%22%2F%3E  %3Cline x1%3D%221.75%22 y1%3D%2223.25%22 x2%3D%227.25%22 y2%3D%2223.25%22 stroke%3D%22%232DC36A%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22%2F%3E  %3Cpath d%3D%22M6 2H11C12.1046 2 13 2.89543 13 4V5M13 5H21.5L18.5 9L21.5 13.5H14C13.4477 13.5 13 13.0523 13 12.5V12M13 5V12M13 12H6%22 stroke%3D%22%232DC36A%22 stroke-width%3D%221.5%22 stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E`:item.status == "сформирован"?`data:image/svg+xml,%3Csvg width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E  %3Ccircle cx%3D%2212%22 cy%3D%2212%22 r%3D%2211.25%22 stroke%3D%22%23F8B200%22 stroke-width%3D%221.5%22%2F%3E  %3Cpath d%3D%22M12 6.5V12L16 15%22 stroke%3D%22%23F8B200%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E`:`data:image/svg+xml,%3Csvg width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E  %3Cline x1%3D%223.06066%22 y1%3D%223%22 x2%3D%2221.0919%22 y2%3D%2221.0312%22 stroke%3D%22%23EE3F58%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%2F%3E  %3Cline x1%3D%220.75%22 y1%3D%22-0.75%22 x2%3D%2226.25%22 y2%3D%22-0.75%22 transform%3D%22matrix(-0.707107 0.707107 0.707107 0.707107 22.0938 3)%22 stroke%3D%22%23EE3F58%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E`}></img></td>
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)}>{item.creatorname}</td>
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)}>{item.datacreate? item.datacreate.slice(0,19).replace('T','\n'): "-"}</td>
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)}>{item.dataform? item.dataform.slice(0,19).replace('T','\n'): "-"}</td>
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)}>{item.dataend? item.dataend.slice(0,19).replace('T','\n'): "-"}</td>
                        <td onClick={()=>navigate(`/bmstu-frontend/applications/${item.id}`)} className='name'><div className="descDiv">{item.name || "-"}</div></td>
                        {isModer && <td className='approval'>{item.status == "сформирован"?<><button onClick={()=>chStatus(item.id, "отменён")} className='approvalBtn btnRej'><img src='data:image/svg+xml,%3Csvg width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E  %3Cline x1%3D%223.06066%22 y1%3D%223%22 x2%3D%2221.0919%22 y2%3D%2221.0312%22 stroke%3D%22%23EE3F58%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%2F%3E  %3Cline x1%3D%220.75%22 y1%3D%22-0.75%22 x2%3D%2226.25%22 y2%3D%22-0.75%22 transform%3D%22matrix(-0.707107 0.707107 0.707107 0.707107 22.0938 3)%22 stroke%3D%22%23EE3F58%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'></img></button>
                        <button onClick={()=>chStatus(item.id, "завершён")} className='approvalBtn btnConf'><img src='data:image/svg+xml,%3Csvg width%3D%2224%22 height%3D%2224%22 viewBox%3D%220 0 24 24%22 fill%3D%22none%22 xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E  %3Cpath d%3D%22M1 13.5L7.5 20L23 4.5%22 stroke%3D%22%232DC36A%22 stroke-width%3D%221.5%22 stroke-linecap%3D%22round%22 stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'></img></button></>:`${item.status}`}</td>}
                      </tr></>
              ))}
          </tbody>
      </Table>
      </div>
    </>
  )
}

export default ApplList