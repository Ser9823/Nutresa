import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Button, InputLabel, makeStyles, MenuItem, Select, TextField, Grid, FormControlLabel, Radio } from '@material-ui/core';
import devolucion from '../img/icons/devolcion.png'
import { db } from './firebase-config'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
//constantes equipo
const Form_SearchEquipo = () => {
    const useStyle = makeStyles((theme) => ({
        paper: {
            padding: '6px 16px',
        },
        divmain: {
            display: 'flex',
            //alignSelf: 'flex-start',
            flexDirection: 'row',
            with: '100%'
        },
        txt: {
            //margin: theme.spacing(1, 1, 1, 1),
        },
        btn: {
            margin: theme.spacing(3, 0, 1, 0),
            width: '30%',
            align: 'center'
        },
        btnvalidar: {
            margin: theme.spacing(3, 0, 0, 0),
            width: '30%',
            align: 'center'
        },
        divopc: {
            margin: theme.spacing(0, 2, 0, 2),
            with: '100%'
        },
        griditem: {
            margin: theme.spacing(0, 1, 0, 1),
        },
        divgif: {
            margin: theme.spacing(20, 1, 0, 1),
        },
        contenedormain: {
            margin: theme.spacing(0, 0, 2, 0)
        },
        btndevolu:{
            margin: theme.spacing(1, 0, 3, 0),
        }
    }))

    //Lista de prestamos


    const [ListaServiceTAGPrestamo, setListaServiceTAGPrestamo] = useState([]);
    const [auxListidMonit, setAuxListidMonit] = useState([]);
    const [auxListidTeclados, setAuxListidTeclados] = useState([]);
    const [auxListidMouse, setAuxListidMouse] = useState([]);
    const [auxListidCargad, setAuxListidCargad] = useState([]);
    const [serviceTAG, setServiceTAG] = useState('');
    const [tipoEquipo, setTipoEquipo] = useState('');
    const [marcaEqui, setMarcaEqui] = useState('');
    const [modeloEqui, setModeloEqui] = useState('');
    const [serialMonitor, setSerialMonitor] = useState('');
    const [serialteclado, setSerialteclado] = useState('');
    const [serialMouse, setSerialMouse] = useState('');
    const [serialCargador, setSerialCargador] = useState('');
    const [mostrar, setmostrar] = useState(true);
    const [guaya, setguaya] = useState(false);
    const [moral, setmoral] = useState(false);
    const [descripcion, setdescripcion] = useState('');
    const [arraymonitor, setAarraymonitor] = useState([]);
    const [arrayteclado, setAarrayteclado] = useState([]);
    const [arraymouse, setAarraymouse] = useState([]);
    const [arraycargador, setAarraycargador] = useState([]);
    const [idfirebase, setidfirebase] = useState('');
    const [idUser, setidUser] = useState('');

    const mayus = (e) => {
        e.target.value = e.target.value.toUpperCase();
    };
    ///Funcoines buscadoras de perifericos
    const searchmonitor = (auxid) => {
        db.collection('Pantallas').onSnapshot((objeReg) => {
            var cont = 0;
            var array = [];
            const arrayids = [];
            objeReg.forEach((obj) => {
                const auxobj = {
                    id: obj.id,
                    marca: obj.data().marca,
                    serial: obj.data().serial,
                    servicetag: obj.data().ServiceTAG
                }
                if (auxobj.servicetag == auxid) {
                    array.push(auxobj);
                    arrayids.push(auxobj.id);
                    cont = 1;
                }
            });
            setAarraymonitor(array);
            setAuxListidMonit(arrayids);
            if (cont == 0) {

            }
        });
    }
    const searchteclado = (auxid) => {
        db.collection('Teclados').onSnapshot((objeReg) => {
            var cont = 0;
            var array = [];
            const arrayids = [];
            objeReg.forEach((obj) => {
                const auxobj = {
                    id: obj.id,
                    marca: obj.data().marca,
                    serial: obj.data().serial,
                    servicetag: obj.data().ServiceTAG
                }
                if (auxobj.servicetag == auxid) {
                    array.push(auxobj);
                    arrayids.push(auxobj.id);
                    cont = 1;
                }
            });
            setAarrayteclado(array);
            setAuxListidTeclados(arrayids);
            if (cont == 0) {

            }
        });
    }
    const searchmouses = (auxid) => {
        db.collection('Mouses').onSnapshot((objeReg) => {
            var cont = 0;
            var array = [];
            const arrayids = [];
            objeReg.forEach((obj) => {
                const auxobj = {
                    id: obj.id,
                    marca: obj.data().marca,
                    serial: obj.data().serial,
                    servicetag: obj.data().ServiceTAG
                }
                if (auxobj.servicetag == auxid) {
                    array.push(auxobj);
                    arrayids.push(auxobj.id);
                    cont = 1;
                }
            });
            setAarraymouse(array);
            setAuxListidMouse(arrayids);
            if (cont == 0) {

            }
        });
    }
    const searchcargadores = (auxid) => {
        db.collection('Cargadores').onSnapshot((objeReg) => {
            var cont = 0;
            var array = [];
            const arrayids = [];
            objeReg.forEach((obj) => {
                const auxobj = {
                    id: obj.id,
                    marca: obj.data().marca,
                    serial: obj.data().serial,
                    servicetag: obj.data().ServiceTAG
                }
                if (auxobj.servicetag == auxid) {
                    array.push(auxobj);
                    arrayids.push(auxobj.id);
                    cont = 1;
                }
            });
            setAarraycargador(array);
            setAuxListidCargad(arrayids);
            if (cont == 0) {

            }
        });
    }
    //
    const buscarequipo = async (auxid) => {
        db.collection('Equipos').onSnapshot((objeReg) => {
            objeReg.forEach((obj) => {
                var auxobj = {
                    id: obj.id,
                    servicetag: obj.data().Serial,
                    tipo: obj.data().Tipo,
                    modelo: obj.data().Modelo,
                    marca: obj.data().Marca,
                }
                if (auxobj.servicetag == auxid) {
                    //console.log(auxobj);
                    return auxobj;
                }

            });
        });
        return null;
    }
    //
    const validarequipo = async (auxid) => {
        db.collection('Equipos').onSnapshot((objeReg) => {
            var cont = 0;
            objeReg.forEach((obj) => {
                const auxobj = {
                    id: obj.id,
                    servicetag: obj.data().Serial,
                    tipo: obj.data().Tipo,
                    modelo: obj.data().Modelo,
                    marca: obj.data().Marca,
                }
                if (auxobj.servicetag == auxid) {
                    setTipoEquipo(auxobj.tipo);
                    setMarcaEqui(auxobj.marca);
                    setModeloEqui(auxobj.modelo);
                    cont = 1;
                    searchmonitor(auxid);
                    searchteclado(auxid);
                    searchmouses(auxid);
                    searchcargadores(auxid);
                    setidfirebase(auxobj.id);
                    setServiceTAG(auxobj.servicetag);
                    return auxobj;
                }

            });

            if (cont == 0) {
                alert('El ServiceTAG del equipo no existe en la BD');
            }
            return null;
        });
    }
    //
    const addDevolucionr = (auxid) => {

    }
    const validarUser = async (auxid) => {
        var cont = 0;
        var auxcont = 1;
        try {
            db.collection('Leasing').onSnapshot((objeReg) => {
                objeReg.forEach((obj) => {
                    const auxobj = {
                        id: obj.id,
                        id_User: obj.data().id_User,
                        servicetag: obj.data().id_equipo,
                        descrip: obj.data().descripcion,
                        guaya: obj.data().guaya,
                        morral: obj.data().morral,
                        observa: obj.data().observaciones,
                        estado: obj.data().estado,

                    }
                    if (auxobj.id_User == auxid && auxobj.estado === 'Activo') {
                        cont = 1;
                        db.collection('Equipos').onSnapshot((objeReg) => {

                            objeReg.forEach((obj) => {

                                const auxobj2 = {
                                    id: auxobj.id,
                                    servicetag: obj.data().Serial,
                                    tipo: obj.data().Tipo,
                                    modelo: obj.data().Modelo,
                                    marca: obj.data().Marca,
                                    contador: 0,
                                    guaya: auxobj.guaya,
                                    morral: auxobj.morral,
                                    descripcion: auxobj.descrip,
                                    observaciones: auxobj.observa
                                }
                                if (auxobj.servicetag == auxobj2.servicetag) {
                                    auxobj2.contador = auxcont++;
                                    ListaServiceTAGPrestamo.push(auxobj2);
                                    searchteclado(auxobj2.servicetag);
                                }
                            });

                        });


                    }
                });
            });
        } catch (error) {
            alert('Posibles errores de conexion');
        }

    }
    const buscarperife = (id,tag, guaya, morral, descrip,tipo,marca,modelo) => {
        searchcargadores(tag);
        searchmonitor(tag);
        searchmouses(tag);
        searchteclado(tag);
        setguaya(guaya);
        setmoral(morral);
        setdescripcion(descrip);
        setmostrar(true);
        setTipoEquipo(tipo);
        setMarcaEqui(marca);
        setModeloEqui(modelo);
        setServiceTAG(tag);
        var aux =id; 
        console.log('Id'+id);
    }
    const classes = useStyle();
    useEffect(() => {

    }, []);
    return (
        <div>
            <TimelineOppositeContent>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot>
                    <img width='45px' src={devolucion}></img>
                </TimelineDot>
            </TimelineSeparator>
            <Paper elevation={24} className={classes.paper}>
                <Typography variant="h6" component="inherit">
                    Devolucion equipos Leasing
                </Typography>
                <Grid container className={classes.contenedormain}>
                    <Grid item xs={7} className={classes.griditem}>
                        <TextField
                            fullWidth
                            margin='normal'
                            variant='outlined'
                            label='Identificacion del usuario :'
                            name='iduser'
                            value={idUser}
                            type={'number'}
                            onChange={(e) => setidUser(e.target.value)}
                        /></Grid>
                    <Grid item xs={4} className={classes.griditem}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.btnvalidar}
                            onClick={(ev) => validarUser(idUser)}

                        >
                            Consultar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Grid item xs={12} className={classes.griditem}>
                <h1></h1>
            </Grid>
            {
                mostrar ?
                    <Paper elevation={24} className={classes.paper}>
                        <Grid container>
                            <Grid item xs={2} className={classes.griditem}>
                                <InputLabel >Service TAG</InputLabel>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Service TAG'
                                    name='tag'
                                    type='text'
                                    value={serviceTAG}
                                    className={classes.txt}
                                    disabled={true}

                                />
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                                <InputLabel >Tipo Equipo</InputLabel>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Tipo Equipo'
                                    name='tag'
                                    type='text'
                                    value={tipoEquipo}
                                    className={classes.txt}
                                    disabled={true}
                                />
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                                <InputLabel >Marca Equipo</InputLabel>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Marca Equipo'
                                    name='tag'
                                    type='text'
                                    value={marcaEqui}
                                    className={classes.txt}
                                    disabled={true}

                                />
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                                <InputLabel >Modelo Equipo</InputLabel>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Modelo Equipo'
                                    name='tag'
                                    type='text'
                                    value={modeloEqui}
                                    className={classes.txt}
                                    disabled={true}

                                />
                            </Grid>
                            <Grid item xs={12} className={classes.griditem}>
                                <Typography variant="h6" component="inherit">
                                    Perifericos relacionados
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.griditem}>
                                <hr></hr>
                                <Typography variant="h6" component="inherit">
                                    Monitores
                                </Typography>
                            </Grid>
                            {
                                arraymonitor.map((obj) => {

                                    return <Grid container>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Serial Monitor</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Serial monitor'
                                                name='tagmonitor'
                                                type='text'
                                                value={obj.serial}
                                                onChange={(ev) => setSerialMonitor(obj.serial)}
                                                className={classes.txt}
                                                disabled={true}

                                            />
                                        </Grid>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Marca o referencia</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Marca Monitor'
                                                name='marmonitor'
                                                type='text'
                                                value={obj.marca}
                                                className={classes.txt}
                                                disabled={true}

                                            />
                                        </Grid>
                                    </Grid>
                                })
                            }
                            <Grid item xs={12} className={classes.griditem}>
                                <hr></hr>
                                <Typography variant="h6" component="inherit">
                                    Teclados
                                </Typography>
                            </Grid>
                            {
                                arrayteclado.map((obj) => {

                                    return <Grid container>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Serial Teclador</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Serial Teclado'
                                                name='tagmonitor'
                                                type='text'
                                                value={obj.serial}
                                                onChange={(ev) => setSerialteclado(obj.serial)}
                                                className={classes.txt}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Marca o referencia</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Marca teclado'
                                                name='marmonitor'
                                                type='text'
                                                value={obj.marca}
                                                className={classes.txt}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                })
                            }
                            <Grid item xs={12} className={classes.griditem}>
                                <hr></hr>
                                <Typography variant="h6" component="inherit">
                                    Mouses
                                </Typography>
                            </Grid>
                            {
                                arraymouse.map((obj) => {

                                    return <Grid container>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Serial Mouse</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Serial mouse'
                                                name='tagmonitor'
                                                type='text'
                                                value={obj.serial}
                                                onChange={(ev) => setSerialMouse(obj.serial)}
                                                className={classes.txt}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Marca o referencia</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Marca Mouse'
                                                name='marmonitor'
                                                type='text'
                                                value={obj.marca}
                                                className={classes.txt}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                })
                            }
                            <Grid item xs={12} className={classes.griditem}>
                                <hr></hr>
                                <Typography variant="h6" component="inherit">
                                    Cargadores
                                </Typography>
                            </Grid>
                            {
                                arraycargador.map((obj) => {

                                    return <Grid container>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Serial Cargador</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Serial Cargador'
                                                name='tagmonitor'
                                                type='text'
                                                value={obj.serial}
                                                onChange={(ev) => setSerialCargador(obj.serial)}
                                                className={classes.txt}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item xs={4} className={classes.griditem}>
                                            <InputLabel >Marca o referencia</InputLabel>
                                            <TextField
                                                fullWidth
                                                color='primary'
                                                margin='normal'
                                                variant='outlined'
                                                label='Marca Cargador'
                                                name='marmonitor'
                                                type='text'
                                                value={obj.marca}
                                                className={classes.txt}
                                                disabled={true}
                                            />
                                        </Grid>
                                    </Grid>
                                })
                            }
                            <Grid item xs={12} className={classes.griditem}>
                                <hr></hr>
                            </Grid>
                            <Grid item xs={4} className={classes.griditem}>
                                <InputLabel align='left'>Contiene Guaya?</InputLabel>
                                <Select
                                    fullWidth
                                    displayEmpty
                                    variant='outlined'
                                    value={guaya}
                                    onClick={(ev) => { setguaya(ev.target.value) }}
                                >
                                    <MenuItem value='true'>SI</MenuItem>
                                    <MenuItem value='false'>NO</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={4} className={classes.griditem}>
                                <InputLabel align='left'>Contiene Morral?</InputLabel>
                                <Select
                                    fullWidth
                                    displayEmpty
                                    variant='outlined'
                                    value={moral}
                                    onClick={(ev) => { setmoral(ev.target.value) }}
                                >
                                    <MenuItem value='true' >SI</MenuItem>
                                    <MenuItem value='false'>NO</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                                <InputLabel >Describa serial y nombre de elementos adicionales</InputLabel>
                                <textarea value={descripcion} onChange={(ev) => { setdescripcion(ev.target.value) }} name="comentarios" rows="10" cols="40"></textarea>
                            </Grid>
                        </Grid>
                        <Grid item xs={5} className={classes.btndevolu}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.btnvalidar}
                            onClick={(ev) => addDevolucionr(idUser)}

                        >
                            Generar entrega
                        </Button>
                    </Grid>
                    </Paper> : <h1></h1>
            }
            {
                ListaServiceTAGPrestamo.map((obj) => {
                    return <div>
                        <br></br>
                        <Paper elevation={24} className={classes.paper}>
                            <Typography variant="h6" component="inherit">
                                Prestamo N° {obj.contador}
                            </Typography>
                            <Grid container>
                                <Grid item xs={5} className={classes.griditem}>
                                    <TextField
                                        fullWidth
                                        margin='normal'
                                        variant='outlined'
                                        label='Service TAG'
                                        name='servicetag'
                                        value={obj.servicetag}
                                        onKeyUp={mayus}
                                        disabled={true}
                                        key={obj.contador}
                                    /></Grid>
                                <Grid item xs={5} className={classes.griditem}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Tipo de equipo'
                                        name='tipoequipo'
                                        type='text'
                                        value={obj.tipo}
                                        className={classes.txt}
                                        disabled={true}
                                        key={obj.contador}
                                    />
                                </Grid>
                                <Grid item xs={4} className={classes.griditem}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Marca Equipo'
                                        name='marcequipo'
                                        type='text'
                                        value={obj.marca}
                                        className={classes.txt}
                                        disabled={true}
                                        key={obj.contador}
                                    />
                                </Grid>
                                <Grid item xs={7} className={classes.griditem}>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Modelo equipo'
                                        name='modequipo'
                                        type='text'
                                        value={obj.modelo}
                                        className={classes.txt}
                                        disabled={true}
                                        key={obj.contador}
                                    />
                                </Grid>
                                <Grid item xs={7} className={classes.griditem}>
                                    <LoadingButton
                                        color="secondary"
                                        onClick={(ev) => buscarperife(obj.id,obj.servicetag, obj.guaya, obj.morral, obj.descripcion,obj.tipo,obj.marca,obj.modelo)}
                                        //loading={loading}
                                        loadingPosition="start"
                                        startIcon={<SendIcon />}
                                        variant="contained"
                                    >
                                        Datos devolucion
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Paper>

                    </div>
                })}
        </div>

    );
}
export default Form_SearchEquipo;