import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, Tab, Tabs } from '@material-ui/core';
import { auth } from './firebase-config'
import cerraS from '../img/icons/salida.png'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  appbar: {
    width: `calc(100% - ${260}px)`,
    marginLeft: 260,

  },
  img: {
    width: '30px',
    margin: theme.spacing(0, 2, 0, 0),
  },
  divcerrar: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(0, 3, 0, 3),
  },
  barbusqueda: {
    width: '400px',
  },
  btnsalir: {
    backgroundColor: 'white',
    height: '17px',
    width: '100px',
  },
  null:{
    width:'100%'
  }
}));
const click = () => {
  auth.signOut();
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function SearchAppBar(props) {
  const history = useHistory();
  const [pAdmin,setPadmin] = useState(false);
  const buscarserial = ()=>{
    history.push("/searchSerial")
  }
  useEffect(()=>{
    const aux = JSON.parse(localStorage.getItem('admin'));
    setPadmin(aux);
  },[])
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar>
          {pAdmin?
          <Tabs
            indicatorColor="secondary"
            textColor="secundary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <NavLink to="/admindatos"
              style={{
                fontWeight: "bold",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
              activeStyle={{
                fontWeight: "bold",
                color: "#2EF7AB",
                textDecoration: "none",
              }}
            ><Tab label="Datos dispositivos" {...a11yProps(1)}></Tab>
            </NavLink>
            <NavLink to="/addUserComany"
              style={{
                color: "white",
                textDecoration: "none"
              }}
              activeStyle={{
                fontWeight: "bold",
                color: "#2EF7AB",
                textDecoration: "none",
              }}
            ><Tab label="Agregar Usuario o compañia" {...a11yProps(1)}></Tab>
            </NavLink>
            <Tab label="Item Three" {...a11yProps(2)} />
            <Tab label="Item Four" {...a11yProps(3)} />
            <Tab label="Item Five" {...a11yProps(4)} />
            <Tab label="Item Six" {...a11yProps(5)} />
            <Tab label="Item Seven" {...a11yProps(6)} />
          </Tabs>
          :<div className={classes.null}></div>}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              className={classes.barbusqueda}
              placeholder="Buscar equipo…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={()=>buscarserial()}
            />
          </div>
          <div className={classes.divcerrar} >
            <Button
              //color="secondary"
              className={classes.btnsalir}
              variant="outlined"
              alignItems="right"
              onClick={click}>
              <img  className={classes.img} src={cerraS}></img>
              <Typography variant="h7">SALIR</Typography>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}