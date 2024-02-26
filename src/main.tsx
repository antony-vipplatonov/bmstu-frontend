import React from 'react'
import ReactDOM from 'react-dom/client'
import Ships from './Ships.tsx'
import ShipPage from './Ship.tsx'
import {BrowserRouter as HashRouter,Route,Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/navbar'
import AuthPage from './authPage.tsx'
import RegistrationPage from './registrationPage.tsx'
import ApplList from './applList.tsx'
import store from "./store";
import { Provider } from "react-redux";
import DraftAppl from './draftAppl.tsx'
import "./main.css"
import ModerShipList from './ModerCompaundList.tsx'
import EditShip from './EditShip.tsx'

const App: React.FC = () => {
  return (
      <HashRouter>
      <NavBar/>
          <Routes>
              <Route path="/bmstu-frontend/" element={<p className="gText gMain">Главная</p>}/>
              <Route path="/bmstu-frontend/seabattles" element={<Ships/>}/>
              <Route path="/bmstu-frontend/applications" element={<ApplList/>} />
              <Route path="/bmstu-frontend/seabattles/:id" element={<ShipPage/>} />
              <Route path="/bmstu-frontend/auth" element={<AuthPage/>}/>
              <Route path="/bmstu-frontend/auth/reg" element={<RegistrationPage/>} />
              <Route path="/bmstu-frontend/applications/:id" element={<DraftAppl/>} />
              <Route path="/bmstu-frontend/moder/seabattles" element={<ModerShipList/>}/>
              <Route path="/bmstu-frontend/moder/seabattles/:id" element={<EditShip/>}/>
          </Routes>
      </HashRouter>

  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)