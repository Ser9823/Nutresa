import { Button, Container, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { db } from './firebase-config'

const estilos = makeStyles((theme) => ({
    container: {
        width: '400px',
        margin: theme.spacing(1, 1, 1, 1),
    },
    text: {
        margin: theme.spacing(1, 0, 2, 0),
    }
}));

const Addteclado = (props) => {
    const classes = estilos();
    const [marca, setMarca] = useState('');
    const [serial, setSerial] = useState('');
    
    const registrarT = () => {
        
        const equipo = {
            marca: marca,
            serial: serial,
            ServiceTAG:props.serial(),
        }
        if(props.serial()!=''){db.collection('Teclados').doc().set(equipo);}
        else(alert('Digite un Service TAG para enlasarlo con el periferico'));
    }
    return (
        
        <div>
            <form>
                <Container component={Paper} elevation={5} className={classes.container}>
                    <h2>Agregar Teclado</h2>
                    <TextField
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        label='Marca'
                        name='Marca'
                        onChange={(e) => { setMarca(e.target.value); }}
                        className={classes.text}
                    ></TextField>
                    <TextField
                        fullWidth
                        margin='normal'
                        variant='outlined'
                        label='Serial'
                        name='serial'
                        onChange={(e) => { setSerial(e.target.value) }}
                        className={classes.text}
                    ></TextField>
                    <Button
                        onClick={registrarT}
                        variant='contained'
                        color='secondary'
                    >
                        Agregar
                    </Button>
                </Container>
            </form>
        </div>
    );
}

export default Addteclado;