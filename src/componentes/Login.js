import React, { useEffect, useState } from 'react';
import { Grid, Container, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import imagenN from '../img/imgNutresa.jpg'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { auth, db } from './firebase-config'
import { collection, query, where, getDocs } from "firebase/firestore";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#CBF5D0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',

  },
  container: {
    height: '60%',
    width: '100%',
    marginTop: theme.spacing(8),
    spacing: 0,
    marginLeft: theme.spacing(0),
    //backgroundPosition: 'center',
    //display: 'inline',
    //marginRight : '0',
    //marginLeft : theme.spacing(10),
    //Cunado pase a ser en telefonos va tomar el 100 de la panatalla el contenedor
    [theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
      marginTop: 0,
      width: '100%',
      height: '100%',
    },
  },
  container1: {
    height: '50%',
    marginTop: theme.spacing(15),
    marginRight: theme.spacing(0),
  },
  img: {
    height: '72%',
    margin: theme.spacing(8)
  },
  div: {
    height: '100%',
    textAlign: 'center',

  },
  divAva: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  boton: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Login() {
  //Estados
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  //funciones de autenticacion
  ///Redistro de user


  const submit = async(ev) => {
    try {
      const consulta = query(collection(db, "Usuarios"), where("correo", "==", usuario));
      const datosConsulta = getDocs(consulta);
      (await datosConsulta).forEach((obj) => {
        localStorage.setItem("admin",JSON.stringify(obj.data().admin));
        localStorage.setItem("cread",JSON.stringify(obj.data().cread));
        localStorage.setItem("read",JSON.stringify(obj.data().read));
        localStorage.setItem("update",JSON.stringify(obj.data().update));
        localStorage.setItem("delete",JSON.stringify(obj.data().delete));
        localStorage.setItem("compania",JSON.stringify(obj.data().compania));
      });
      console.log(JSON.parse(localStorage.getItem('admin')))
      await auth.signInWithEmailAndPassword(usuario, password);
    } catch (error) {
      alert('Credenciales invalidas o Error de conexion');
    }
  }
useEffect(()=>{
localStorage.removeItem('admin');
},[]);

  return (
    <Grid container component='main' className={classes.root} >
      <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container1}>
        <div className={classes.div}>
          <img className={classes.img} src={imagenN} />
        </div>
      </Container>
      <Container component={Paper} elevation={10} maxWidth='xs' className={classes.container} >
        <div className={classes.divAva}>
          <Avatar>
            <VpnKeyIcon />
          </Avatar>
          <Typography component='h1' variant='h5' >
            LOGIN
          </Typography>
          <form className={classes.form}>
            <TextField
              fullWidth
              autoFocus
              color='primary'
              margin='normal'
              variant='outlined'
              label='Usuario'
              name='usuario'
              onChange={(ev) => setUsuario(ev.target.value)}
            />
            <TextField
              fullWidth
              type='password'
              color='primary'
              margin='normal'
              variant='outlined'
              label='password'
              name='password'
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.boton}
              onClick={submit}
            >
              Ingresar
            </Button>
          </form>
        </div>
      </Container>
    </Grid>
  );
}

export default Login;