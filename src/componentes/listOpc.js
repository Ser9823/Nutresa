import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Iconaddpc from '../img/icons/addpc.png'
import Icoprestamo from '../img/icons/prestamo.png'
import Icodevolucion from '../img/icons/devolucion.png'
import Icogarantia from '../img/icons/garantia.png'
import { NavLink } from 'react-router-dom';

const style = makeStyles(theme => ({
    img: {
        //height:'10%',
        width: '50px',
        align: 'ligh'
    },
    div: {
        height: '70%',
        textAlign: 'ligh',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemtext: {
        margin: theme.spacing(0, 3, 0),
    },
}))
export default function Lista(){
    const classes = style();
    //Constantes permisos
    const [pCread,setpCread] = useState(false);

    useEffect(() => {
        setpCread(JSON.parse(localStorage.getItem('cread')))    
    }, [])
    return (
        <div>
            <List component='nav'>
                {pCread?
                <NavLink to="/addispo"
                    style={{
                        color: "black",
                        textDecoration: "none"
                    }}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "black",
                        textDecoration: "none",
                    }}
                >
                    <ListItem button>
                        <ListItemIcon>
                            <div className={classes.div}>
                                <img className={classes.img} src={Iconaddpc} />

                                <ListItemText className={classes.itemtext} primary='Agregar dispositivo' />

                            </div>
                        </ListItemIcon>
                    </ListItem>
                </NavLink>
                :<div></div>}
                <NavLink to="/addprestamos"
                    style={{
                        color: "black",
                        textDecoration: "none"
                    }}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "black",
                        textDecoration: "none",
                    }}
                >
                <ListItem button>
                    <ListItemIcon>
                        <div className={classes.div}>
                            <img className={classes.img} src={Icoprestamo} />
                            <ListItemText className={classes.itemtext} primary='Generar prestamo' />
                        </div>
                    </ListItemIcon>
                </ListItem>
                </NavLink>
                <NavLink to="/adddevolucion"
                    style={{
                        color: "black",
                        textDecoration: "none"
                    }}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "black",
                        textDecoration: "none",
                    }}
                >
                <ListItem button>
                    <ListItemIcon>
                        <div className={classes.div}>
                            <img className={classes.img} src={Icodevolucion} />
                            <ListItemText className={classes.itemtext} primary='Devolucion de equipo' />
                        </div>
                    </ListItemIcon>
                </ListItem>
                </NavLink>
                <ListItem button>
                    <ListItemIcon>
                        <div className={classes.div}>
                            <img className={classes.img} src={Icogarantia} />
                            <ListItemText className={classes.itemtext} primary='Aplicar Garantia' />
                        </div>
                    </ListItemIcon>
                </ListItem>
            </List>
        </div>
    )
}