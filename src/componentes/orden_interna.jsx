import React, { useEffect, useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import imgPrecaucion from '../img/precaucion.png'
import { db } from './firebase-config';
import { useHistory } from 'react-router-dom';



const styles = makeStyles(theme => ({
    griditem: {
        margin: theme.spacing(0, 1, 0, 1),
    },
    divPrecau: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    imgP: {
        width: '50%',
        margin: theme.spacing(1, 1, 1, 5)
    },
    typogra: {
        margin: theme.spacing(5, 1, 1, 0)
    }
}))

export default function FrmOrdeninterna(props){
    const [listReg, setListReg] = useState([]);
    const [listCosto, setListCosto] = useState([]);
    //Datos registro orden interna
    const [regional, setRegional] = useState('');
    const [costo, setCosto] = useState('');
    const [ordeninter, setOrdenint] = useState(' ');
    const [pa, setPa] = useState(' ');
///URL control
const history = useHistory();
    const traerRegionales = async () => {
        try{
        db.collection('Regionales').onSnapshot((objeReg) => {
            const array = [];
            objeReg.forEach((obj) => {
                const auxobj = {
                    ...obj.data(),
                    nombre: obj.data().nombre,
                    id:obj.id
                }
                array.push(auxobj);
                console.log(auxobj.id)
            });
            setListReg(array);
            
            if (array.length != 0) {
                setRegional(array[0].nombre)
            }
        });}catch(error){
            alert('Error en RED');
        }
    }
    const traerCosto = async () => {
        db.collection('CentroCosto').onSnapshot((objeReg) => {
            const array = [];
            objeReg.forEach((obj) => {
                const auxobj = {
                    numCosto: obj.data().numCosto,
                    id: obj.data().id
                }
                array.push(auxobj);
            });
            setListCosto(array);
            if (array.length != 0) {
                setCosto(array[0].numCosto)
            }
        });
    }
    const llenarespacio = async(auxid) =>{
        const aux = await db.collection('Regionales').doc(auxid).get();
        setOrdenint(aux.data().ordenInt);
        setPa(aux.data().PA);
    }
    useEffect(() => {
        traerRegionales();
        traerCosto();
    },[])
const enviarNom = () =>{
    props.funOndeint(ordeninter,costo);
    if(ordeninter!=' ' && regional!=' '&& costo !=''){
        history.push(`/adddispo/frmRegEquipo?regional=${regional}`);
    }
    
}
    const classes = styles();
    return (
        <div>
            <Grid container component={Paper}>
                <Grid item xs={12} className={classes.griditem}>
                    <h1>Orden interna de los equipos a registrar</h1>
                </Grid>
                <Grid item xs={5} className={classes.griditem}>
                    <InputLabel >Seleccionar la regional del o los equipos</InputLabel>
                    <Select
                        //Tipo Almacenamiento
                        fullWidth
                        displayEmpty
                        variant='outlined'
                        value={regional}
                        onClick={(ev) => setRegional(ev.target.value)}
                    >
                        {
                            listReg.map((obj) => {
                                //console.log(obj.nombre);
                                if (obj.nombre != 'undefined') {
                                    return <MenuItem onClick={(ev) => llenarespacio(obj.id)} key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                                }
                            })
                        }
                    </Select>
                </Grid>
                <Grid item xs={5} className={classes.griditem}>
                    <TextField
                        fullWidth
                        type='text'
                        color='primary'
                        margin='normal'
                        variant='outlined'
                        label='#Orden interna'
                        name='ordenInterna'
                        value={ordeninter}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={5} className={classes.griditem}>
                    <InputLabel >Seleccionar centra de costo</InputLabel>
                    <Select
                        //Tipo Almacenamiento
                        fullWidth
                        displayEmpty
                        variant='outlined'
                        value={costo}
                        onClick={(e) => setCosto(e.target.value)}
                    >
                        {
                            listCosto.map((obj) => {
                                //console.log(obj.nombre);
                                if (obj.numCosto != 'undefined') {
                                    return <MenuItem key={obj.id} value={obj.numCosto}>{obj.numCosto}</MenuItem>
                                }
                            })
                        }
                    </Select>
                </Grid>
                <Grid item xs={5} className={classes.griditem}>
                    <TextField
                        fullWidth
                        type='text'
                        color='primary'
                        margin='normal'
                        variant='outlined'
                        label='PA'
                        name='capacidad'
                        value={pa}
                        disabled={true}
                    />
                </Grid>
                <Grid item xs={2} className={classes.griditem}>
                    <img className={classes.imgP} src={imgPrecaucion}></img>
                </Grid>
                <Grid item xs={5} className={classes.griditem}>
                    <Typography className={classes.typogra} variant="h6">Precaucion,La orden interna seleccionada no podra ser modificada en esta plataforma, se realizara de manera interna con
                        <a target='_blank' href="https://gruponutresa.com/inversionistas/servicios-para-el-accionista/contacto/"> Contacto +</a>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.griditem}>
                    <Button
                        fullWidth
                        color='primary'
                        variant='contained'
                        onClick={(ev)=>enviarNom()}
                    >VALIDAR</Button>
                </Grid>
            </Grid>
        </div>
    );
}