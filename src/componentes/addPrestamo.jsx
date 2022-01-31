import React, { useEffect, useState } from 'react';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Paper from '@material-ui/core/Paper';
import { Button, InputLabel, makeStyles, MenuItem, Select, TextField, Grid, Chip } from '@material-ui/core';
import iconprestamo from '../img/icons/prestamoicon.png';
import equipo from '../img/icons/equipo.png'
import { db } from './firebase-config'
import { Stack } from '@mui/material';
import Form_SearchEquipo from './formBuscar';

///Constantes 

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
    }
}))


export default function CustomizedTimeline() {
    //List aux Reg Prestamo
    const [auxListidMonit, setAuxListidMonit] = useState([]);
    const [auxListidTeclados, setAuxListidTeclados] = useState([]);
    const [auxListidMouse, setAuxListidMouse] = useState([]);
    const [auxListidCargad, setAuxListidCargad] = useState([]);
    const [auxListidSoft, setAuxListidSoft] = useState([]);
    //Id fire base equipo
    const [idfirebase, setidfirebase] = useState('');
    //
    const [auxList, setAuxList] = useState([]);
    const [listSoftware, setlistSoftware] = useState([]);
    const [software, setSoftware] = useState('');
    //Datos usuario

    const [numActa, setnumActa] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [sede, setSede] = useState('');
    const [numContacto, setnumContacto] = useState('');
    const [exten, setExten] = useState('');
    const [userADS, setuserADS] = useState('');
    //constantes equipo
    const [serviceTAG, setServiceTAG] = useState('');
    const [tipoEquipo, setTipoEquipo] = useState('');
    const [marcaEqui, setMarcaEqui] = useState('');
    const [modeloEqui, setModeloEqui] = useState('');
    const [serialMonitor, setSerialMonitor] = useState('');
    const [serialteclado, setSerialteclado] = useState('');
    const [serialMouse, setSerialMouse] = useState('');
    const [serialCargador, setSerialCargador] = useState('');
    const [guaya, setguaya] = useState(false);
    const [moral, setmoral] = useState(false);
    const [descripcion, setdescripcion] = useState('');
    const [observaciones, setObservaciones] = useState('');
    //Validar si trae equipo de devolucion
    const [EquipoDevolucion, setEquipoDevolucion] = useState(false);
    //Constantes add user
    const [iduser, setIduser] = useState('');
    //Listas de perifericos
    const [arraymonitor, setAarraymonitor] = useState([]);
    const [arrayteclado, setAarrayteclado] = useState([]);
    const [arraymouse, setAarraymouse] = useState([]);
    const [arraycargador, setAarraycargador] = useState([]);

    //Limpiar espacions
    const limpiartext = () => {
        setIduser('');
        setnumActa('');
        setEmpresa('');
        setCargo('');
        setSede('');
        setnumContacto('');
        setExten('');
        setuserADS('');
        //constantes equipo
        setServiceTAG('');
        setTipoEquipo('');
        setMarcaEqui('');
        setModeloEqui('');
        setAarraymonitor([]);
        setAarrayteclado([]);
        setAarraymouse([]);
        setAarraycargador([]);
        setguaya(false);
        setmoral(false);
        setdescripcion('');
        setAuxListidSoft([]);
        setAuxList([]);
        setObservaciones('');
    }
    //Boton x
    const handleDelete = (nomDelete) => {
        //console.log(nomDelete +"Hola");
        var cont = -1;
        //var lista = auxList
        auxList.map((obj) => {
            cont++;
            if (obj == nomDelete) {
                auxList.splice(cont, 1);
                auxListidSoft.splice(cont, 1);
            }
        });
        llenadoSoftware();
    };
    const listSelectSoftware = (value, objaux) => {
        var auxcont = 0;

        auxList.map((obj) => {
            if (obj == value) { auxcont = auxcont + 1; }
        });
        if (auxcont == 0) {
            auxList.push(value);
            auxListidSoft.push(objaux.id);
        }
    }
    //
    const llenadoSoftware = async () => {
        try {
            db.collection('Software').onSnapshot((objReg) => {
                const arregloaux = [];
                objReg.forEach((obj) => {
                    obj = {
                        //...obj.data().id,
                        nombre: obj.data().Nombre,
                        id: obj.id
                    }
                    arregloaux.push(obj);
                });
                setlistSoftware(arregloaux);
                setSoftware(arregloaux[0]?.nombre);
            })
        } catch (error) { alert('BD Vacio'); }
    }
    const consultacompania = async (reg) => {
        try {
            db.collection('Companias').onSnapshot((objeReg) => {
                const array = [];
                objeReg.forEach((obj) => {
                    const auxobj = {
                        nombre: obj.data().nombre,
                        regional: obj.data().regional,
                    }
                    if (auxobj.regional == reg) {
                        setEmpresa(auxobj.nombre);

                    } else { setEmpresa(''); }
                });
            });
        } catch (error) {
            alert('Error de red')
        }
    }
    const mayus = (e) => {
        e.target.value = e.target.value.toUpperCase();
    };
    //Crear prestamo
    const addprestamo = async () => {
        var fecha = new Date();
        if (serviceTAG != '') {
            try {
                const objaux = {
                    id_User: iduser,
                    id_equipo: serviceTAG,
                    List_monitores: auxListidMonit,
                    List_teclados: auxListidTeclados,
                    List_mouse: auxListidMouse,
                    List_cargador: auxListidCargad,
                    guaya: guaya,
                    morral: moral,
                    descripcion: descripcion,
                    List_software: auxListidSoft,
                    observaciones: observaciones,
                    estado:'Activo',
                    fecha: fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()

                }
                const aux = db.collection('Equipos').doc(idfirebase);
                const obj = {
                    estado: 'Prestado',
                }
                aux.update(obj);
                db.collection('Leasing').doc().set(objaux);
                alert('Se registro satisfactoriamente el prestamo')
                limpiartext();

            } catch (error) {
                alert('Error Conexion al agregar Prestamo')
            }
        } else alert('Se debe digitar un Service TAG para el equipo valido');


    }
    const validarUser = async (auxid) => {
        db.collection('UsuariosPlanta').onSnapshot((objeReg) => {
            var cont = 0;
            objeReg.forEach((obj) => {
                const auxobj = {
                    ADS: obj.data().ADS,
                    id: obj.data().id,
                    contacto: obj.data().contacto,
                    regional: obj.data().regional,
                    cargo: obj.data().cargo,
                    extension: obj.data().extension,
                }
                if (auxobj.id == auxid) {
                    setSede(auxobj.regional);
                    setuserADS(auxobj.ADS);
                    setnumContacto(auxobj.contacto);
                    setCargo(auxobj.cargo);
                    setExten(auxobj.extension);
                    consultacompania(auxobj.regional);
                    cont = 1;

                }
            });
            if (cont == 0) {
                alert('El ID digitado no existe en la BD');
            }
        });
    }
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
                }

            });

            if (cont == 0) {
                alert('El ServiceTAG del equipo no existe en la BD');
            }
        });
    }
    useEffect(() => {
        llenadoSoftware();
    }, [])
    const classes = useStyle();
    return (
        <div>
            <div >
                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot>
                        <img width='45px' src={iconprestamo}></img>
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <Paper elevation={24} className={classes.paper}>
                    <Typography variant="h6" component="inherit">
                        Datos Usuario a realizar prestamo
                    </Typography>
                    <Grid container>
                        <Grid item xs={7} className={classes.griditem}>
                            <TextField
                                fullWidth
                                autoFocus
                                margin='normal'
                                variant='outlined'
                                label='N° Identificacion'
                                name='contacto'
                                value={iduser}
                                onChange={(e) => setIduser(e.target.value)}
                            /></Grid>
                        <Grid item xs={4} className={classes.griditem}>
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.btnvalidar}
                                onClick={(ev) => validarUser(iduser)}
                            >
                                Validar usuario
                            </Button>
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                            <TextField
                                fullWidth
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='N° Acta entrega'
                                name='id'
                                type='text'
                                value={numActa}
                                onChange={(ev) => setnumActa(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.griditem}>
                            <TextField
                                fullWidth
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Empresa'
                                name='empresa'
                                type='text'
                                value={empresa}
                                onChange={(ev) => setEmpresa(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                            <TextField
                                fullWidth
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Cargo responsable'
                                name='cargo'
                                type='text'
                                value={cargo}
                                onChange={(ev) => setCargo(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.griditem}>
                            <TextField
                                fullWidth
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Sede'
                                name='sede'
                                type='text'
                                value={sede}
                                onChange={(ev) => setSede(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.griditem}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='N° Contacto'
                                name='contacto'
                                className={classes.txt}
                                value={numContacto}
                                onChange={(e) => setnumContacto(e.target.value)}
                                disabled={true}
                            /></Grid>
                        <Grid item xs={3} className={classes.griditem}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='Extension'
                                name='Extension'
                                className={classes.txt}
                                disabled={true}
                                value={exten}
                                onChange={(e) => setExten(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4} className={classes.griditem}>
                            <TextField
                                fullWidth
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Usuario ADS'
                                name='userads'
                                type='text'
                                //onKeyUp={mayus}
                                value={userADS}
                                onChange={(ev) => setuserADS(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                <TimelineOppositeContent>
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <img width='45px' src={equipo}></img>
                    </TimelineDot>
                </TimelineSeparator>
                <Paper elevation={24} className={classes.paper}>
                    <Typography variant="h6" component="inherit">
                        Informacion equipo a Prestar
                    </Typography>
                    <Grid container>
                        <Grid item xs={7} className={classes.griditem}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='Service TAG'
                                name='servicetag'
                                value={serviceTAG}
                                onKeyUp={mayus}
                                onChange={(e) => setServiceTAG(e.target.value)}
                            /></Grid>
                        <Grid item xs={4} className={classes.griditem}>
                            <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                className={classes.btnvalidar}
                                onClick={(ev) => validarequipo(serviceTAG)}
                            >
                                Validar Equipo
                            </Button>
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                            <TextField
                                fullWidth
                                autoFocus
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Tipo de equipo'
                                name='tipoequipo'
                                type='text'
                                value={tipoEquipo}
                                onChange={(ev) => setTipoEquipo(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
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
                                value={marcaEqui}
                                onChange={(ev) => setMarcaEqui(ev.target.value)}
                                className={classes.txt}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.griditem}>
                            <TextField
                                fullWidth
                                autoFocus
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                label='Modelo equipo'
                                name='modequipo'
                                type='text'
                                value={modeloEqui}
                                onChange={(ev) => setModeloEqui(ev.target.value)}
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
                    <hr></hr>
                    
                    <Alert severity="info">
                        <AlertTitle>Informacion</AlertTitle>
                        Este equipo ha sido configurado con los programas estándar que se manejan en la Compañía y se encuentran legalmente licenciados.  Por esta razón se deben abstener de instalar cualquier software adicional sin haber coordinado antes con el área de Soporte Técnico.
                    </Alert>
                    <InputLabel align='left'>Software Adicional</InputLabel>
                    <Select
                        fullWidth
                        displayEmpty
                        variant='outlined'
                        value={software}
                        onClick={(ev) => { setSoftware(ev.target.value) }}
                    >
                        {
                            listSoftware.map((obj) => {
                                if (obj.nombre != '') {
                                    return <MenuItem key={obj.id} onClick={(ev) => listSelectSoftware(obj.nombre, obj)} value={obj.nombre}>{obj.nombre}</MenuItem>
                                }
                            })
                        }
                    </Select>
                    <hr></hr>
                    <InputLabel>Lista Software adicional</InputLabel>
                    <table>
                        {auxList.map((obj) => {
                            return <td><Stack direction="row" spacing={1}>
                                <Chip label={obj} variant="outlined" onDelete={(ev) => handleDelete(obj)} />
                            </Stack></td>
                        })}
                    </table>
                    <Typography variant="h6" color="inherit">
                        Observaciones
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label=""
                        multiline
                        rows={4}
                        fullWidth
                        value={observaciones}
                        onChange={(ev) => { setObservaciones(ev.target.value) }}
                    />
                    <Alert severity="warning">
                        <AlertTitle>Atencion</AlertTitle>
                        "EL EMPLEADO hace constar que ha recibido de EL EMPLEADOR, en perfecto estado y únicamente para el desarrollo de las labores a su cargo, los activos antes relacionados, obligándose a realizar una administración y custodia idónea de los mismos; lo cual permita la conservación y restitución de los activos en buen estado, salvo su deterioro natural y obvio.<br></br> <br></br>Acepta EL EMPLEADO que es su responsabilidad el salvaguardar los activos y no darles un uso diverso al establecido por la Empresa; así como no exponerlo de manera negligente a situaciones de posible hurto o perdida. EL EMPLEADO se compromete a informar oportunamente al área de TI cualquier perdida o hurto y a formular de inmediato la respectiva denuncia ante las autoridades competentes, así como a entregarle a EL EMPLEADOR copia de dicho documento para con él gestionar lo pertinente. <br></br><br></br>AUTORIZACIÓN DE DESCUENTOS POR DAÑOS, PERDIDA Y HURTOS. En caso de pérdida, hurto o daño de los activos relacionados por negligencia, falta de control o incumplimiento de los instructivos y reglamentos definidos para la conservación y custodia de los mismos por parte del EMPLEADO previamente comprobada, éste autoriza expresamente a EL EMPLEADOR para que del valor de sus salarios le sea descontada la cantidad necesaria para reparar o restituir el o los activos que le fueron entregados, asimismo faculta a EL EMPLEADOR, para que compense, una vez terminado su contrato de trabajo, el saldo insoluto con cualquier suma de dinero que le corresponda en su liquidación final de prestaciones, salarios e indemnizaciones, de conformidad con lo dispuesto para tal evento en los artículos 59, numeral 1o. y 149, inciso 1o., del Código Sustantivo del Trabajo, todo ello, bajo los parámetros de ley".                    </Alert>
                    <Button
                        color='secondary'
                        variant='contained'
                        className={classes.btn}
                        onClick={() => { addprestamo() }}
                    >Agregar</Button>
                </Paper>
            </div>
        </div>
    );
}
