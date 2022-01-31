import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddDispositivo from './addDispositivo';
import Admindatos from './adminDatos';
import FrmOrdeninterna from './orden_interna';
import AddPrestamo from './addPrestamo';
import { Switch, Route } from 'react-router-dom';
import AddUserDispo from './addUserDispo';
import { useHistory } from 'react-router-dom';
import Buscarserial from './busquedaSerial';
import Form_SearchEquipo from './formBuscar';

const WindowsMain = (props) => {
    const history = useHistory();
    useEffect(()=>{
        history.push("/");
    },[]);

    const [viewteclado, setViewteclado] = useState('none');
    const [viewmouse, setViewmouse] = useState('none');
    const [viewcargador, setViewcargador] = useState('none');
    const [viewpantalla, setViewpantalla] = useState('none');
    //Aux ordenen y costo
    const [ordenint, setordenint] = useState('');
    const [cencosto, setcencosto] = useState('');

    const styles = makeStyles(theme => ({
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            width: `calc(100% - ${310}px)`,
            marginLeft: 260,
            marginTop: theme.spacing(6),
            textAlign: 'left',
            //display: 'flex'
        },
        contentaux: {
            display: 'flex',
            //flexDirection:'row',
            //justifyContent: 'right',

        },
        containerT: {
            display: viewteclado
        },
        containerM: {
            display: viewmouse
        },
        containerC: {
            display: viewcargador
        },
        containerP: {
            display: viewpantalla
        },
        veradmindatos: {
            display: props.viewAdmindatos
        },
        veraddequipos: {
            display: props.viewAddequipo
        },
    }))
    /////
    const valueOrdenintandcentrocosto = (orden,costo) =>{
        setordenint(orden);
        setcencosto(costo);
    }

    const classes = styles();
    return (
        <div className={classes.content}>
            <Switch>
                <Route path="/addispo">
                    <FrmOrdeninterna funOndeint={(orden,costo)=>{
                        valueOrdenintandcentrocosto(orden,costo);
                    }}/>
                </Route>
                <Route path="/admindatos">
                    <Admindatos/>
                </Route>
                <Route path="/addprestamos">
                    <AddPrestamo/>
                </Route>
                    <Route path="/adddevolucion">
                    <Form_SearchEquipo/>
                </Route>
                <Route path="/adddispo/frmRegEquipo">
                    <div className={classes.addEquipos}>
                        <AddDispositivo
                            valueordenanint= {()=>{
                                return ordenint;
                            }}
                            valuecentralcosto= {()=>{
                                return cencosto;
                            }}
                            fucionviewT={(estadoT) => {
                                setViewteclado(estadoT)
                            }
                            }
                            fucionviewM={(estadoM) => {
                                setViewmouse(estadoM)
                            }}
                            fucionviewC={(estadoC) => {
                                setViewcargador(estadoC)
                            }}
                            fucionviewP={(estadoP) => {
                                setViewpantalla(estadoP)
                            }}
                        ></AddDispositivo>
                    </div>
                </Route>
                <Route path="/addUserComany">
                <AddUserDispo></AddUserDispo>
                </Route>
                <Route path="/searchSerial">
                    <Buscarserial></Buscarserial>
                </Route>
                <Route path="/">
                    <h1>Pagina inicial [noticias, equipos a vencer.......ect]</h1>
                </Route>
            </Switch>

        </div>
    )
}

export default WindowsMain;