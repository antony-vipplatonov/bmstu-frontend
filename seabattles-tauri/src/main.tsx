import React from 'react'
import ReactDOM from 'react-dom/client'
import Ships from './Ships.tsx'
import ShipPage from './Ship.tsx'
import {BrowserRouter as HashRouter,Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar'
import "./main.css"

const App: React.FC = () => {
  return (
      <HashRouter>
      <NavBar/>
          <Routes>
              <Route path="/bmstu-frontend/" element={<p className="gText gMain">Главная</p>}/>
              <Route path="/bmstu-frontend/seabattles" element={<Ships/>}/>
              <Route path="/bmstu-frontend/seabattles/:id" element={<ShipPage/>} />
          </Routes>
      </HashRouter>

  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)