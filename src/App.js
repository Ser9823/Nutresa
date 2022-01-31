import React from 'react';
import Login from './componentes/Login'; 
import './App.css';
import Barraprincipal from './componentes/pagmain';
import Cajon from './componentes/cajon';
import {auth} from './componentes/firebase-config'
import WindowsMain from './componentes/windowsmain';
import { BrowserRouter as  Router} from 'react-router-dom';
//import { useState } from 'react';
//<Login></Login>
//const [esgado, setEstado] = useState();
//<Barraprincipal></Barraprincipal>
  //    <Cajon></Cajon>
//auth.onAuthStateChanged

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      auten : false,
      valiadminDatos:'none',
      valiaddDispo:'none',
    }
     auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({auten:true})
      } else {
        this.setState({auten:false})
      }
    });
  }

  adminidatos= (value) =>{
    this.setState({valiadminDatos:value})
  }
  addDispositivo= (value) =>{
    this.setState({valiaddDispo:value})
  }

  render() { 
    return ( 
      <div>
      {this.state.auten
      ?<div>
      <Router>
      <Barraprincipal adminidatos={this.adminidatos}></Barraprincipal>
      <Cajon addDispositivo={this.addDispositivo}></Cajon>
      <WindowsMain viewAdmindatos={this.state.valiadminDatos} viewAddequipo={this.state.valiaddDispo}></WindowsMain>
      </Router>
      </div>
      :<Login></Login>
      }
    </div>
     );
  }
}
 
export default App;
