import React, {useContext, useEffect} from 'react';
import  {checkHandler} from './http/userAPI'
import Header from './components/header/header';
import { Route, Routes } from "react-router-dom";
import {publicRoutes, authRoutes, adminRoutes} from "./routes/routes"
import './style.scss'
import { Context } from './index';
import { observer } from 'mobx-react-lite';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Footer from './components/footer/footer';



const App = observer(() => {
  const {user} = useContext(Context)
  useEffect(() => {
    checkHandler().then(data => {
      if (data !== 401){
        user.setUser(data)
        user.setIsAuth(true)
      }
    }) 
  }, [user])
  
  return (
    <React.Fragment>
      <Header />
 
      <div className='container'>
        <Routes>
          {!user.isAuth ? authRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact/> ) : null}
          {user.isAdmin ? adminRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact />) : null}
          {publicRoutes.map(({path, Component}) => <Route key={path} path={path} element={ <Component />} exact />)}
       
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
})

export default App;
