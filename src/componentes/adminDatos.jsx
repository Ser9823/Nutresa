import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconRegional from '../img/icons/regional.png'
import IconResponsable from '../img/icons/responsable.png'
import IconContrato from '../img/icons/contrato.png'
import Iconsoftware from '../img/icons/software.png'
import IconAdicionales from '../img/icons/adicionales.png'
import { Button, Divider, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { db } from './firebase-config'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  txt: {

  },
  btn2: {
    margin: theme.spacing(3, 0, 1, 0),
    width: '50%',
    align: 'center'
  },
  btn: {
    margin: theme.spacing(1, 0, 1, 0),
    width: '30%',
    align: 'center'
  },
  boxdate: {
    margin: theme.spacing(1, 1, 1, 1),
  },
  divdate: {
    display: 'flex',
    flexDirection: 'row'
  },
  grid: {
    margin: theme.spacing(0, 1, 0, 1)
  }
}));

export default function CustomizedTimeline() {
  const classes = useStyles();
  //dato
  const [auxList, setAuxList] = useState([]);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [respon, setResponsalble] = useState('');
  const [compania, setCompania] = useState('');
  const [companiaRegi, setCompaniaRegi] = useState('');
  const [pa, setPa] = useState('');
  const [ordenInt, setOrdenint] = useState('');
  //Datos software
  const [nomSoft, setNomSoft] = useState('');
  const [versionsoft, setversionSoft] = useState('');
  const [licenciasoft, setLicenciaSoft] = useState('');
  //Datos usuario
  const [nombreR, setNombreR] = useState('');
  const [id, setId] = useState('');
  const [contacto, setContacto] = useState('');
  const [correo, setCorreo] = useState('');
  //Datos Contrato
  const [contratoo, setContrato] = useState('');
  const [finicio, setFinicio] = useState(new Date());
  const [ffinal, setFfinal] = useState(new Date());
  const [arrayResp, setArrayresp] = useState([]);
  //Array de compañias
  const [arrayCompani, setArrayCompani] = useState([]);
  ////Adicionales
  const [numCosto, setNumcosto] = useState('');
  const [tipoAlmacen, setTipoalmacen] = useState('');
  const [tipoEquipo, setTipoequipo] = useState('');

  const fechafinal = (date) => {
    setFfinal(date);
  };
  const fechainicio = (date) => {
    setFinicio(date);
  };
  //const formatfecha = (date) => {
  //const aux='';
  //aux=date.getDate() +'-'+ date.getMonth()+ '-' +date.getFullYear();
  //return aux;
  //};
  const regional = {
    nombre: nombre,
    direccion: direccion,
    PA: pa,
    ordenInt: ordenInt,
    compania: companiaRegi
  }
  const responsable = {
    nombre: nombreR,
    id: id,
    contacto: contacto,
    correo: correo,
    companias: auxList,
  }
  const contrato = {
    contrato: contratoo,
    fechainicio: finicio,
    fechafin: ffinal
  }
  const software = {
    Nombre: nomSoft,
    version: versionsoft,
    licencia: licenciasoft
  }
  ////
  const handleDelete = (nomDelete) => {
    //console.log(nomDelete +"Hola");
    var cont = -1;
    //var lista = auxList
    auxList.map((obj) => {
      cont++;
      if (obj == nomDelete) {
        auxList.splice(cont, 1);
      }
    });
    llegadoCompani();
  };
  ///
  const regFirebas = async (nomTb, obj) => {
    try {
      db.collection(nomTb).doc().set(obj);
      alert('Registro satisfactorio de ' + { nomTb });
    } catch (error) {
      alert('Error en crear ' + { nomTb });
    }
    if (nomTb == 'Responsables') {
      setNombreR('');
      setId('');
      setContacto('');
      setCorreo('');
      llegadoinicial();
    }
    else if (nomTb == 'Regionales') {
      setNombre('');
      setDireccion('');
      setPa('');
      setOrdenint('')
    }
    else if (nomTb == 'Software') {
      setNomSoft('');
      setversionSoft('');
      setLicenciaSoft('');
    }
  }
  const llegadoinicial = async () => {
    db.collection('Responsables').onSnapshot((objResp) => {
      const areegloResp = [];
      objResp.forEach((obj) => {
        obj = {
          nombre: obj.data().nombre,
          id: obj.data().id,
        }
        areegloResp.push(obj);
        //console.log(areegloResp);
        //areegloResp.push(obj.data());
      });
      setArrayresp(areegloResp);
      setResponsalble(areegloResp[0]?.nombre)
    });
  }
  //funcion llendo de conpañias
  const llegadoCompani = async () => {
    db.collection('Companias').onSnapshot((objResp) => {
      const areegloCom = [];
      objResp.forEach((obj) => {
        obj = {
          nombre: obj.data().nombre,
          id: obj.data().id,
        }
        areegloCom.push(obj);
        //console.log(areegloResp);
        //areegloResp.push(obj.data());
      });
      setArrayCompani(areegloCom);
      setCompania(areegloCom[0]?.nombre)
    });
  }
  ////////
  const listSelectCompani = (value) => {
    var auxcont = 0;
    auxList.map((obj) => {
      if (obj == value) { auxcont = auxcont + 1; }
    });
    if (auxcont == 0) { auxList.push(value); }
  }
  /////
  useEffect(() => {
    //llenartb();
    llegadoinicial();
    llegadoCompani();
  }, [])
  ///Datos adicionales fuinciones
  const addcentralcosto = () => {
    const obj = {
      numCosto: numCosto
    }
    try {
      db.collection('CentroCosto').doc().set(obj);
      alert('Se agrego central de costo');
      setNumcosto('')
    }
    catch (error) {
      alert('Error al agregar central de costo')
    }
  }
  const addTalmacenamiento = () => {
    const obj = {
      tipo: tipoAlmacen
    }
    try {
      db.collection('TipoAlmacenamiento').doc().set(obj);
      alert('Se agrego Tipo de Almacenamiento');
      setTipoalmacen('')
    }
    catch (error) {
      alert('Error al agregar Tipo de almacenamiento')
    }
  }
  const addTequipo = () => {
    const obj = {
      tipo: tipoEquipo
    }
    try {
      db.collection('TipoEquipo').doc().set(obj);
      alert('Se agrego Tipo de equipo');
      setTipoequipo('')
    }
    catch (error) {
      alert('Error al agregar Tipo de equipo')
    }
  }
  return (
    <form>
      <Timeline align="alternate">
        <form>
          <TimelineItem>
            <TimelineOppositeContent>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot>
                <img width='45px' src={IconRegional}></img>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" color="inherit">
                Agregar Regional
              </Typography>
              <Paper elevation={3} className={classes.paper}>
                <TextField
                  fullWidth
                  color='primary'
                  margin='normal'
                  variant='outlined'
                  label='Nombre'
                  name='nombre'
                  value={nombre}
                  onChange={(ev) => setNombre(ev.target.value)}
                  className={classes.txt}
                />
                <TextField
                  fullWidth
                  color='primary'
                  margin='normal'
                  variant='outlined'
                  label='Direccion'
                  name='direccion'
                  value={direccion}
                  onChange={(ev) => setDireccion(ev.target.value)}
                  className={classes.txt}
                />
                <TextField
                  fullWidth
                  color='primary'
                  margin='normal'
                  variant='outlined'
                  label='PA'
                  name='pa'
                  value={pa}
                  onChange={(ev) => setPa(ev.target.value)}
                  className={classes.txt}
                />
                <TextField
                  fullWidth
                  type='number'
                  color='primary'
                  margin='normal'
                  variant='outlined'
                  label='#Orden interna'
                  name='ordenineterna'
                  value={ordenInt}
                  onChange={(ev) => setOrdenint(ev.target.value)}
                  className={classes.txt}
                />
                <InputLabel>Compañia a la que pertenece regional</InputLabel>
                <Select
                  fullWidth
                  displayEmpty
                  variant='outlined'
                  value={companiaRegi}
                  onClick={(ev) => setCompaniaRegi(ev.target.value)}
                >
                  <hr></hr>
                  {
                    arrayCompani.map((obj) => {
                      //console.log(obj.nombre);
                      if (obj.nombre != 'undefined') {
                        return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                      }
                    })
                  }
                </Select>
                <Button
                  variant='contained'
                  color='secondary'
                  className={classes.btn}
                  onClick={(ev) => regFirebas('Regionales', regional)}
                >
                  Registrar
                </Button>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        </form>
        <TimelineItem>
          <TimelineOppositeContent>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary">
              <img width='45px' src={IconResponsable}></img>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" color="inherit">
              Agregar responsable compañia
            </Typography>
            <Paper elevation={3} className={classes.paper}>
              <TextField
                fullWidth
                color='primary'
                margin='normal'
                variant='outlined'
                label='Nombre Completo'
                name='nombre'
                value={nombreR}
                onChange={(ev) => { setNombreR(ev.target.value) }}
                className={classes.txt}
              />
              <TextField
                fullWidth
                type='number'
                color='primary'
                margin='normal'
                variant='outlined'
                label='# Identificacion'
                name='identificacion'
                value={id}
                onChange={(ev) => { setId(ev.target.value) }}
                className={classes.txt}
              />
              <TextField
                fullWidth
                type='number'
                color='primary'
                margin='normal'
                variant='outlined'
                label='# Contacto'
                name='contacto'
                value={contacto}
                onChange={(ev) => { setContacto(ev.target.value) }}
                className={classes.txt}
              />
              <TextField
                fullWidth
                type='email'
                color='primary'
                margin='normal'
                variant='outlined'
                label='Correo Electronico'
                name='correo'
                value={correo}
                onChange={(ev) => { setCorreo(ev.target.value) }}
                className={classes.txt}
              />
              <InputLabel>Compañias a cargo</InputLabel>
              <Select
                fullWidth
                displayEmpty
                variant='outlined'
                value={compania}
                onClick={(ev) => setCompania(ev.target.value)}
              >
                <hr></hr>
                {
                  arrayCompani.map((obj) => {
                    //console.log(obj.nombre);
                    if (obj.nombre != 'undefined') {
                      return <MenuItem key={obj.id} onClick={(ev) => listSelectCompani(obj.nombre)} value={obj.nombre}>{obj.nombre}</MenuItem>
                    }
                  })
                }
              </Select>
              <hr></hr>
              <InputLabel>Lista Compañias a cargo</InputLabel>
              <table>
                {auxList.map((obj) => {
                  return <td><Stack direction="row" spacing={1}>
                    <Chip label={obj} variant="outlined" onDelete={(ev) => handleDelete(obj)} />
                  </Stack></td>
                })}
              </table>
              <Button
                variant='contained'
                color='secondary'
                className={classes.btn}
                onClick={(ev) => regFirebas('Responsables', responsable)}
              >
                Registrar
              </Button>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" variant="outlined">
              <img width='45px' src={IconContrato}></img>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6"
            >
              Agregar Contrato
            </Typography>
            <Paper elevation={3} className={classes.paper}>
              <TextField
                fullWidth
                type='number'
                color='primary'
                margin='normal'
                variant='outlined'
                label='# Contrato'
                name='contrato'
                onChange={(ev) => { setContrato(ev.target.value) }}
                className={classes.txt}
              />
              <div className={classes.divdate}>
                <div className={classes.boxdate}>
                <TextField
                  id="date"
                  label="Fecha inicio de contrato"
                  type="date"
                  defaultValue={new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(ev)=>{
                    fechainicio(ev.target.value);
                  }}
                />
                </div>
                <div className={classes.boxdate}>
                <TextField
                  id="date"
                  label="Fecha fin de contrato"
                  type="date"
                  defaultValue={new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(ev)=>{
                    fechafinal(ev.target.value);
                  }}
                />
                </div>
              </div>
              <Button
                variant='contained'
                color='secondary'
                className={classes.btn}
                onClick={(ev) => regFirebas('Contrato', contrato)}
              >
                Registrar
              </Button>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot>
              <img width='45px' src={IconAdicionales}></img>
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6"
            >
              Agregar Software
            </Typography>
            <Paper elevation={3} className={classes.paper}>
              <Grid container>
                <Grid item lg={12} xs={12} className={classes.grid}>
                  <Typography variant="h6">Agregar Central de Costo</Typography>
                  <TextField
                    fullWidth
                    type='number'
                    color='primary'
                    margin='normal'
                    variant='outlined'
                    label='N° Central de costo'
                    name='cCosto'
                    onChange={(ev) => setNumcosto(ev.target.value)}
                    value={numCosto}
                    //onChange={(ev) => { setContrato(ev.target.value) }}
                    className={classes.txt}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.btn}
                    onClick={(ev) => addcentralcosto()}
                  >
                    Registrar
                  </Button>
                  <hr></hr>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.grid}>
                  <Typography variant="h6">Agregar tipo de almacenamiento</Typography>
                  <TextField
                    fullWidth
                    type='text'
                    color='primary'
                    margin='normal'
                    variant='outlined'
                    label='Tipo Almacenamiento'
                    name='tipoA'
                    value={tipoAlmacen}
                    min="0"
                    onChange={(ev) => { setTipoalmacen(ev.target.value) }}
                    className={classes.txt}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.btn}
                    onClick={(ev) => addTalmacenamiento()}
                  >
                    Registrar
                  </Button>
                  <hr></hr>
                </Grid>
                <Grid item lg={12} xs={12} className={classes.grid}>
                  <Typography variant="h6">Agregar tipos de equipos</Typography>
                  <TextField
                    fullWidth
                    type='text'
                    color='primary'
                    margin='normal'
                    variant='outlined'
                    label='Nuevo tipo'
                    name='contrato'
                    min="0"
                    value={tipoEquipo}
                    onChange={(ev) => { setTipoequipo(ev.target.value) }}
                    className={classes.txt}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.btn}
                    onClick={(ev) => addTequipo()}
                  >
                    Registrar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot>
              <img width='45px' src={Iconsoftware}></img>
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6"
            >
              Agregar Software
            </Typography>
            <Paper elevation={3} className={classes.paper}>
              <Grid container>
                <Grid item lg={6} xs={6} className={classes.grid}>
                  <TextField
                    fullWidth
                    type='text'
                    color='primary'
                    margin='normal'
                    variant='outlined'
                    label='Nombre Software'
                    name='nomSoftware'
                    onChange={(ev) => setNomSoft(ev.target.value)}
                    value={nomSoft}
                    className={classes.txt}
                  />
                </Grid>
                <Grid item lg={5} xs={5} className={classes.grid}>
                  <TextField
                    fullWidth
                    type='text'
                    color='primary'
                    margin='normal'
                    variant='outlined'
                    label='Version'
                    name='versionSoft'
                    value={versionsoft}
                    min="0"
                    onChange={(ev) => { setversionSoft(ev.target.value) }}
                    className={classes.txt}
                  />
                </Grid>
                <Grid item lg={6} xs={6} className={classes.grid}>
                  <InputLabel align='left'>La compania tiene licencia?</InputLabel>
                  <Select
                    fullWidth
                    displayEmpty
                    variant='outlined'
                    value={licenciasoft}
                    onClick={(ev) => { setLicenciaSoft(ev.target.value) }}
                  >
                    <MenuItem value='SI'>SI</MenuItem>
                    <MenuItem value='NO'>NO</MenuItem>
                  </Select>
                </Grid>
                <Grid item lg={5} xs={5} className={classes.grid}>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.btn2}
                    onClick={(ev) => regFirebas('Software', software)}
                  >
                    Registrar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </form>
  );
}