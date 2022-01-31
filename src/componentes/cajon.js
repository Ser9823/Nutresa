import React, { useEffect, useState } from 'react'
import { Divider, Drawer, makeStyles } from '@material-ui/core';
import Listaopc from './listOpc'
import imgnutresa from '../img/logempresas/logonvar.png'
import imgPastadoria from '../img/logempresas/pastaDoria.png'
import imgRecetta from '../img/logempresas/recetta.png'
import imgcremHelado from '../img/logempresas/cremHelado.png'


const Cajon = (props) => {
    const [compania, setCompania] = useState('');
    useEffect(() => {
        const auxCompany = JSON.parse(localStorage.getItem('compania'));
        setCompania(auxCompany);
    }, [])
    const estilos = makeStyles(theme => ({
        drawer: {
            width: 260,
            flexShrink: 0,
        },
        drawerPaper: {
            width: `265px`,
        },
        toolbar: theme.mixins.toolbar,
        img: {
            width: '265px',
            height: '70px'
        },
    }))
    const valiaddEquipo = (value) => {
        props.addDispositivo(value);
    }
    const classes = estilos();
    return (
        <Drawer className={classes.drawer}
            variant='permanent'
            classes={{ paper: classes.drawerPaper }}
            //Posicion de drawer
            anchor='left'
        >
            <div className={classes.toolbar}>
                {compania == 'Crem Helado' ? <img className={classes.img} src={imgcremHelado} />
                    : compania == 'La Recetta' ? <img className={classes.img} src={imgRecetta} />
                        : compania == 'Pasta Doria' ? <img className={classes.img} src={imgPastadoria} />
                            : <img className={classes.img} src={imgnutresa} />
                }

            </div>
            <Divider />
            <Listaopc validador={valiaddEquipo}></Listaopc>
        </Drawer>
    )

}
export default Cajon;