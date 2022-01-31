import React, { useEffect, useState } from 'react';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Button, FormGroup, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, TextField} from '@material-ui/core';
import iconadduser from '../img/icons/adduser.png';
import addcompania from '../img/icons/addcomania.png'
import userplanta from '../img/icons/userplanta.png'
import { db } from './firebase-config'
import { Switch } from '@material-ui/core';
import { auth } from './firebase-config'

///Constantes 

const useStyle = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  divmain: {
    display: 'flex',
    //alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  txt: {

  },
  btn: {
    margin: theme.spacing(1, 0, 1, 0),
    width: '30%',
    align: 'center'
  },
  divopc: {
    margin: theme.spacing(0, 2, 0, 2),
  }
}))


export default function CustomizedTimeline() {
  const [compania, setCompania] = useState('');
  const [listRegionales, setlistRegional] = useState([]);
  const [listCiudades, setlistCiudades] = useState([]);
  const [regional, setRegional] = useState('');
  const [ciudades, setCiudades] = useState('');
  //constantes de permisos
  const [padmin, setPadmin] = useState(false);
  const [pcrear, setPcrear] = useState(false);
  const [pleer, setPleer] = useState(false);
  const [pactualizar, setPactualizar] = useState(false);
  const [peliminar, setPeliminar] = useState(false);
  //Datos user planta
  const [nombreUser, setNombreUser] = useState('');
  const [idUserPlan, setUserPlan] = useState('');
  const [correoUser, setcorreoUser] = useState('');
  const [userADS, setUserADS] = useState('');
  const [contactoUser, setContactoUser] = useState('');
  const [cargo, setCargo] = useState('');
  const [extension, setExtension] = useState('');

  //Constantes add user
  const [nombre, setNombre] = useState('');
  const [iduser, setIduser] = useState('');
  const [correo, setcorreo] = useState('');
  const [contacto, setcontacto] = useState('');
  const [contrasena, setcontrasena] = useState('');

  const llenadolistR = async () => {
    try {
      db.collection('Regionales').onSnapshot((objReg) => {
        const arregloaux = [];
        objReg.forEach((obj) => {
          obj = {
            ...obj.data().id,
            nombre: obj.data().nombre,
            id: obj.data().id
          }
          arregloaux.push(obj);
        });
        setlistRegional(arregloaux);
        setRegional(arregloaux[0]?.nombre);
      })
    } catch (error) { setRegional('BD Vacio') }
  }
  const llenadoCiudades = async () => {
    try {
      db.collection('Ciudades').onSnapshot((objReg) => {
        const arregloaux = [];
        objReg.forEach((obj) => {
          obj = {
            ...obj.data().id,
            nombre: obj.data().nombre,
            id: obj.data().id
          }
          arregloaux.push(obj);
        });
        setlistCiudades(arregloaux);
        setCiudades(arregloaux[0]?.nombre);
      })
    } catch (error) { setRegional('BD Vacio') }
  }
  const nivelesadmin = () => {
    if (!padmin) {
      setPcrear(true);
      setPleer(true);
      setPactualizar(true);
      setPeliminar(true);
    }
    else {
      setPcrear(false);
      setPleer(false);
      setPactualizar(false);
      setPeliminar(false);
    }
  }
  const addConpania = () => {
    try {
      const obj = {
        nombre: compania,
        ciudad: ciudades
      }
      db.collection('Companias').doc().set(obj);
      alert('Se agrego satisfactoriamente ' + compania)
    } catch (error) {
      alert('Error de conexion con la base de datos')
    }
  }
  const addUserPlanta = async () => {
    try {
      const obj = {
        nombre: nombreUser,
        id: idUserPlan,
        correo: correoUser,
        ADS: userADS,
        contacto: contactoUser,
        cargo: cargo,
        regional: regional,
        extension: extension
      }
      await db.collection('UsuariosPlanta').doc().set(obj);
      alert('Se agrego satisfactoriamente al usuario ' + nombre)
    } catch (error) {
      alert('Error en las credenciales del usuario (correo,password (>= 6 caracteres))')
    }
  }
  const adduser = async () => {
    try {
      const obj = {
        nombre: nombre,
        id: iduser,
        correo: correo,
        contacto: contacto,
        regional: regional,
        cread: pcrear,
        read: pleer,
        update: pactualizar,
        delete: peliminar,
        admin: padmin,
        
      }
      await auth.createUserWithEmailAndPassword(correo, contrasena);
      await db.collection('Analistas').doc().set(obj);
      alert('Se agrego satisfactoriamente al usuario ' + nombre)
      setNombre('');setIduser('');setcorreo('');setcontacto('');setRegional('');setcontrasena('');
    } catch (error) {
      alert('Error en las credenciales del usuario (correo,password (>= 6 caracteres))')
    }
  }
  useEffect(() => {
    llenadolistR();
    llenadoCiudades();
  }, [])
  const classes = useStyle();
  return (
    <div className={classes.divmain}>
      <div className={classes.divopc}>
        <TimelineOppositeContent>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <img width='45px' src={iconadduser}></img>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <Paper elevation={24} className={classes.paper}>
          <Typography variant="h6" component="inherit">
            Agregar Analista
          </Typography>

          <TextField
            fullWidth
            autoFocus
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
            autoFocus
            color='primary'
            margin='normal'
            variant='outlined'
            label='Identificacion'
            name='id'
            type='number'
            value={iduser}
            onChange={(ev) => setIduser(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            autoFocus
            color='primary'
            margin='normal'
            variant='outlined'
            label='Correo'
            name='correo'
            type='email'
            value={correo}
            onChange={(ev) => setcorreo(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            autoFocus
            color='primary'
            margin='normal'
            variant='outlined'
            label='Contacto'
            name='contacto'
            type='number'
            value={contacto}
            onChange={(ev) => setcontacto(ev.target.value)}
            className={classes.txt}
          />
          <InputLabel align='left'>Seleccione Regional a apoyar</InputLabel>
          <Select
            fullWidth
            displayEmpty
            variant='outlined'
            value={regional}
            onClick={(ev) => { setRegional(ev.target.value) }}
          >
            {
              listRegionales.map((obj) => {
                if (obj.nombre != '') {
                  return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                }
              })
            }
          </Select>
          <TextField
            fullWidth
            autoFocus
            color='primary'
            margin='normal'
            variant='outlined'
            label='Contraseña'
            name='password'
            type='password'
            value={contrasena}
            onChange={(ev) => setcontrasena(ev.target.value)}
            className={classes.txt}
          />
          <Typography fullWidth variant="h6">Permisos a asignar</Typography>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              disabled={padmin}
              checked={pcrear}
              value="top"
              control={<Switch color="primary" />}
              label="Crear"
              labelPlacement="top"
              onChange={() => { if (pcrear == false) { setPcrear(true) } else { setPcrear(false) } }}
            />
            <FormControlLabel
              disabled={padmin}
              checked={pleer}
              value="top"
              control={<Switch color="primary" />}
              label="leer"
              labelPlacement="top"
              onChange={() => { if (pleer == false) { setPleer(true) } else { setPleer(false) } }} />
            <FormControlLabel
              disabled={padmin}
              checked={pactualizar}
              value="top"
              control={<Switch color="primary" />}
              label="Actualizar"
              labelPlacement="top"
              onChange={() => { if (pactualizar == false) { setPactualizar(true) } else { setPactualizar(false) } }} />
            <FormControlLabel
              disabled={padmin}
              checked={peliminar}
              value="top"
              control={<Switch color="primary" />}
              label="eliminar"
              labelPlacement="top"
              onChange={() => { if (peliminar == false) { setPeliminar(true) } else { setPeliminar(false) } }} />
            <FormControlLabel
              checked={padmin}
              value="top"
              control={<Switch color="secondary" />}
              label="Administrador"
              labelPlacement="top"
              onClick={() => { if (padmin == false) { setPadmin(true) } else { setPadmin(false) } }}
              onChange={() => nivelesadmin()} />
          </FormGroup>
          <Button
            variant='contained'
            color='secondary'
            className={classes.btn}
            onClick={(ev) => adduser()}
          >
            Registrar
          </Button>
        </Paper>

        <TimelineOppositeContent>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <img width='45px' src={addcompania}></img>
          </TimelineDot>
        </TimelineSeparator>
        <Paper elevation={24} className={classes.paper}>
        <Typography variant="h6" component="inherit">
          Agregar Compañia
        </Typography>
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Compañia'
            name='nomCompani'
            value={compania}
            onChange={(ev) => { setCompania(ev.target.value) }}
          />
          <InputLabel align='left'>Ciudad ubicacion</InputLabel>
          <Select
            fullWidth
            displayEmpty
            variant='outlined'
            value={ciudades}
            onClick={(ev) => { setCiudades(ev.target.value) }}
          >
            {
              listCiudades.map((obj) => {
                if (obj.nombre != '') {
                  return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                }
              })
            }
          </Select>
          <Button
            color='secondary'
            variant='contained'
            className={classes.btn}
            onClick={() => { addConpania() }}
          >Agregar</Button>
        </Paper>
      </div>

      <div className={classes.divopc}>
        <TimelineOppositeContent>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <img width='45px' src={userplanta}></img>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <Paper elevation={24} className={classes.paper}>
        <Typography variant="h6" component="inherit">
        Agregar Usuario planta
        </Typography>
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Nombre'
            name='nombre'
            value={nombreUser}
            onChange={(ev) => setNombreUser(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Identificacion'
            name='id'
            type='number'
            value={idUserPlan}
            onChange={(ev) => setUserPlan(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Correo'
            name='correo'
            type='email'
            value={correoUser}
            onChange={(ev) => setcorreoUser(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Usuario ADS'
            name='userads'
            type='text'
            value={userADS}
            onChange={(ev) => setUserADS(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Contacto'
            name='contacto'
            type='number'
            value={contactoUser}
            onChange={(ev) => setContactoUser(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Cargo'
            name='cargo'
            type='text'
            value={cargo}
            onChange={(ev) => setCargo(ev.target.value)}
            className={classes.txt}
          />
          <TextField
            fullWidth
            color='primary'
            margin='normal'
            variant='outlined'
            label='Extension'
            name='extension'
            type='text'
            value={extension}
            onChange={(ev) => setExtension(ev.target.value)}
            className={classes.txt}
          />
          <InputLabel align='left'>Regional donde labora</InputLabel>
          <Select
            fullWidth
            displayEmpty
            variant='outlined'
            value={regional}
            onClick={(ev) => { setRegional(ev.target.value) }}
          >
            {
              listRegionales.map((obj) => {
                if (obj.nombre != '') {
                  return <MenuItem key={obj.id} value={obj.nombre}>{obj.nombre}</MenuItem>
                }
              })
            }
          </Select>
          <Button
            variant='contained'
            color='secondary'
            className={classes.btn}
            onClick={(ev) => addUserPlanta()}
          >
            Registrar
          </Button>
        </Paper>
      </div>

    </div>
  );
}
